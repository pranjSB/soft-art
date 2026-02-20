import fs from "fs";
import path from "path";
import { LOGS } from "../projectPaths.js";

const summaryPath = process.env.GITHUB_STEP_SUMMARY;

if (!summaryPath) 
{
  console.log("Not running in GitHub Actions.");
  process.exit(0);
}

const flakyReport = path.join(LOGS, "flaky-report.txt");

if (!fs.existsSync(flakyReport)) 
{
  fs.appendFileSync(summaryPath, "## Test Intelligence\nNo flaky report found.\n");
  process.exit(0);
}

const content = fs.readFileSync(flakyReport, "utf8");

const dashboard = `## Test Intelligence Dashboard 
### Stability Summary
\`\`\`
${content}
\`\`\`

### Artifacts
- flaky-report.txt
- flaky.html
- failures.json
- console-errors.json

Generated automatically by intelligence pipeline.`;

fs.appendFileSync(summaryPath, dashboard);
console.log("CI Summary written.");