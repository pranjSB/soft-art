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
        fs.mkdirSync(LOGS);

      fs.appendFileSync(path.join(LOGS, "failures.json"), JSON.stringify(failureRecord) + "\n");

      if (failure.type === FAILURE_TYPES.LOCATOR)
        await healingEngine.capture(page, failure);
    }
  }

  onEnd() 
  {
    execSync(`node ${path.join(INTELLIGENCE, "flakyAnalyzer.js")}`, { stdio: "inherit" });
  }
}