import fs from "fs";
import path from "path";
import { LOGS, INTELLIGENCE } from "../projectPaths.js";

export default class CustomReporter 
{
  constructor() 
  {
    this.startTime = Date.now();

    this.historyFile = path.join(INTELLIGENCE, "history.json"); // lstores ong-term history
    this.runFile = path.join(INTELLIGENCE, "current-run.json"); // stores current run only
    this.summaryFile = path.join(INTELLIGENCE, "summary.json");
    this.dashboardFile = path.join(LOGS, "dashboard.html");

    this.ensureDirs();

    fs.writeFileSync(this.runFile, ""); // resets current run file every execution
  }

  ensureDirs() 
  {
    fs.mkdirSync(LOGS, { recursive: true });
    fs.mkdirSync(INTELLIGENCE, { recursive: true });
  }

  resolveBrowser(test, result) 
  {
    try 
    {
      if (test?.parent?.project()?.name) // PRIMARY: official playwright source
        return test.parent.project().name;

      if (test?.project?.name) // fallback: legacy structure
        return test.project.name;

      if (result?.workerIndex !== undefined) // fallback: result metadata
        return `worker-${result.workerIndex}`;

      return "unknown";
    }
    catch 
    {
      return "unknown";
    }
  }

  onTestEnd(test, result) 
  {
    try 
    {
      const record = 
      {
        testName: test.title,
        file: test.location.file,
        browser: this.resolveBrowser(test, result),
        status: result.status,
        duration: result.duration,
        timestamp: new Date().toISOString(),
        error: result.error?.message || null
      };

      // saves to long-term history
      fs.appendFileSync(this.historyFile, JSON.stringify(record) + "\n");

      // saves to current run file
      fs.appendFileSync(this.runFile, JSON.stringify(record) + "\n");

      // saves failures separately
      if (record.status === "failed") 
      {
        fs.appendFileSync(path.join(LOGS, "failures.json"), JSON.stringify(record) + "\n");
      }
    }
    catch (err) 
    {
      console.log("Reporter safely handled:", err.message);
    }
  }

  onEnd() 
  {
    try 
    {
      const records = this.readCurrentRun();

      const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);

      const total = records.length;

      const passed = records.filter(r => r.status === "passed").length;

      const failed = records.filter(r => r.status === "failed").length;

      const summary = 
      {
        total,
        passed,
        failed,
        duration
      };

      fs.writeFileSync(
        this.summaryFile,
        JSON.stringify(summary, null, 2)
      );

      const html = this.generateHTML(records, summary);

      fs.writeFileSync(this.dashboardFile, html);

      console.log("INTELLIGENCE DASHBOARD GENERATED");
      console.log(`Total: ${total}`);
      console.log(`Passed: ${passed}`);
      console.log(`Failed: ${failed}`);
      console.log(`Duration: ${duration}s`);
      console.log(`Location: ${this.dashboardFile}`);
    }

    catch (err) 
    {
      console.log("Reporter safely handled:", err.message);
    }
  }

  readCurrentRun() 
  {
    if (!fs.existsSync(this.runFile))
      return [];

    return fs.readFileSync(this.runFile, "utf8").split("\n").filter(Boolean).map(JSON.parse);
  }

  generateHTML(records, summary) 
  {
    const browserStats = {};

    records.forEach(r => 
    {
      if (!browserStats[r.browser])
        browserStats[r.browser] = { total: 0, failed: 0 };

      browserStats[r.browser].total++;

      if (r.status === "failed")
        browserStats[r.browser].failed++;
    });

    const browserRows = Object.entries(browserStats).map(([browser, stats]) => 
    {
        const rate = ((stats.failed / stats.total) * 100 || 0).toFixed(2);

        return `
        <tr>
          <td>${browser}</td>
          <td>${stats.total}</td>
          <td>${stats.failed}</td>
          <td>${rate}%</td>
        </tr>
        `;
      }).join("");

    const rows = records.map(r => `
        <tr>
          <td>${r.testName}</td>
          <td>${r.browser}</td>
          <td class="${r.status === "passed" ? "pass" : "fail"}">
            ${r.status}
          </td>
          <td>${r.duration} ms</td>
          <td>${r.timestamp}</td>
        </tr>
      `).join("");

    return `

      <!DOCTYPE html>
      <html>
      <head>
      <title>Test Intelligence Dashboard</title>
      <style>

      body 
      {
        font-family: Arial;
        background: #0d1117;
        color: #c9d1d9;
        padding: 20px;
      }

      .card 
      {
        background: #161b22;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
      }

      table 
      {
        width: 100%;
        border-collapse: collapse;
      }

      td, th 
      {
        padding: 10px;
        border-bottom: 1px solid #30363d;
      }

      th 
      {
        text-align: left;
      }

      td 
      {
        text-align: left;
      }

      td:nth-child(2),
      td:nth-child(3),
      td:nth-child(4),
      th:nth-child(2),
      th:nth-child(3),
      th:nth-child(4) 
      {
        text-align: center;
      }
      .pass { color: #3fb950; }
      .fail { color: #f85149; }

      </style>
      </head>

      <body>
      <h1>Test Intelligence Dashboard</h1>
      <div class="card">

      Total: ${summary.total}<br>
      Passed: <span class="pass">${summary.passed}</span><br>
      Failed: <span class="fail">${summary.failed}</span><br>
      Duration: ${summary.duration}s

      </div>

      <div class="card">
      <h2>Browser Stability</h2>
      <table>
      <tr>
      <th>Browser</th>
      <th>Total</th>
      <th>Failed</th>
      <th>Failure Rate</th>
      </tr>

      ${browserRows}

      </table>
      </div>

      <div class="card">
      <h2>Test Results</h2>
      <table>
      <tr>
      <th>Test</th>
      <th>Browser</th>
      <th>Status</th>
      <th>Duration</th>
      <th>Time</th>
      </tr>

      ${rows}

      </table>
      </div>
      </body>
      </html>`;
  }
}