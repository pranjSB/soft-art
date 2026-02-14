import fs from "fs";
import path from "path";
import { LOGS, INTELLIGENCE } from "../projectPaths.js";

const historyPath = path.join(INTELLIGENCE, "history.json");
const reportPath = path.join(LOGS, "flaky-report.txt");
const htmlPath = path.join(LOGS, "flaky.html");

if (!fs.existsSync(LOGS)) fs.mkdirSync(LOGS);

if (!fs.existsSync(historyPath)) 
{
  console.log("No history file found.");
  process.exit(0);
}

const raw = fs.readFileSync(historyPath, "utf8").trim();
if (!raw) 
{
  console.log("History file empty.");
  process.exit(0);
}

const lines = raw.split("\n");
const records = lines.map(line => JSON.parse(line));

const stats = {};

records.forEach(record => 
{
  if (!stats[record.testName])
    stats[record.testName] = { total: 0, failed: 0 };
  stats[record.testName].total++;

  if (record.status === "failed")
    stats[record.testName].failed++;
});

let output = `=== Category 1: New Unstable (first run; flake rate = 100%) ===\n`;

let html = `<html><body><h1>Test Stability Report</h1><h2>Category 1: New Unstable (first run; flake rate = 100%)</h2><ul>`;

let flakySection = `=== Category 2: Flaky ===\n`;

let stableSection = `=== Category 3: Stable ===\n`;

for (const test in stats) 
{
  const total = stats[test].total;
  const failed = stats[test].failed;
  const rate = (failed / total) * 100;

  const isNewUnstable = total === 1 && failed === 1;
  const isFlaky = total >= 2 && rate > 5;
  const isStable = rate <= 5;

  if (isNewUnstable) 
  {
    output += `${test} → ${rate.toFixed(2)}%\n`;
    html += `<li>${test}: ${rate.toFixed(2)}%</li>`;
  }

  if (isFlaky) 
    flakySection += `${test} → ${rate.toFixed(2)}%\n`;

  if (isStable)
    stableSection += `${test} → ${rate.toFixed(2)}%\n`;
}

html += `</ul>
<h2>Category 2: Flaky (flake rate > 5%)</h2>
<pre>${flakySection}</pre>
<h2>Category 3: Stable (flake rate < 5%)</h2>
<pre>${stableSection}</pre>
</body></html>`;

const finalOutput = output + "\n" + flakySection;

fs.writeFileSync(reportPath, finalOutput);
fs.writeFileSync(htmlPath, html);

console.log(finalOutput);