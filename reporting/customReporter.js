import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { classifyFailure } from "../intelligence/failureClassifier";
import { LOGS, INTELLIGENCE } from "../projectPaths.js";

export default class CustomReporter 
{
  async onTestEnd(test, result) 
  {
    const historyRecord = 
    {
      testName: test.title,
      file: test.location.file,
      status: result.status,
      timestamp: new Date().toISOString()
    };

    if (!fs.existsSync(INTELLIGENCE))
      fs.mkdirSync(INTELLIGENCE, { recursive: true });

    fs.appendFileSync(path.join(INTELLIGENCE, "history.json"), JSON.stringify(historyRecord) + "\n");

    if (result.status === "failed") 
    {
      const error = result.error?.message || "No error message";
      const category = classifyFailure(error);

      const failureRecord = 
      {
        testName: test.title,
        file: test.location.file,
        category,
        error,
        timestamp: new Date().toISOString()
      };

      if (!fs.existsSync(LOGS))
        fs.mkdirSync(LOGS, { recursive: true });

      fs.appendFileSync(path.join(LOGS, "failures.json"), JSON.stringify(failureRecord) + "\n");
    }
  }

  onEnd() 
  {
    console.log(`=============================== INTELLIGENCE MODE: NON-BLOCKING Flaky & healing systems 
    ran in observation mode only.
    ===============================
    `);
  }
}