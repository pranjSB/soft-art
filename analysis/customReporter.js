import fs from "fs";
import { classifyFailure } from "./failureClassifier.js";
import { execSync } from "child_process";

export default class CustomReporter 
{
  onTestEnd(test, result) // logs history/failures
  {
    const historyRecord =
    {
      testName: test.title,
      file: test.location.file,
      status: result.status,
      timestamp: new Date().toISOString()
    };

    fs.appendFileSync("analysis/history.json", JSON.stringify(historyRecord) + "\n");

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

      fs.appendFileSync("analysis/failures.json", JSON.stringify(failureRecord) + "\n");
    }
  }

  onEnd() //runs flakyAnalyzer
  {
    execSync("node analysis/flakyAnalyzer.js", { stdio: "inherit" });
  }
}