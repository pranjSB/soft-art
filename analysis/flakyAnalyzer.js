import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyPath = path.join(__dirname, "history.json");
const reportPath = path.join(__dirname, "flaky-report.txt");
const htmlPath = path.join(__dirname, "flaky.html");

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

let output = "Flaky tests:\n";
let html = `<html><body><h1>Flaky Tests</h1><ul>`;

for (const test in stats) 
{
  const rate = (stats[test].failed / stats[test].total) * 100;
  if (rate > 20) 
  {
    output += `${test} → ${rate.toFixed(2)}%\n`;
    html += `<li>${test}: ${rate.toFixed(2)}%</li>`;
  }
}

html += `</ul></body></html>`;
fs.writeFileSync(reportPath, output);
fs.writeFileSync(htmlPath, html);

console.log(output);

  