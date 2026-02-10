import fs from "fs";
import { classifyFailure } from "./failureClassifier.js";

export default class CustomReporter 
{
  onTestEnd(test, result) // in-built Plawright; calls the reporter API 'onTestEnd' after each test finishes
  {
    if (result.status === "failed") 
    {
      const error = result.error ?.message || "No error message";
      const category = classifyFailure(error);

      const record = 
      {
        testName: test.title,
        file: test.location.file,
        category,
        error,
        timestamp: new Date().toISOString()
      };

      fs.appendFileSync("analysis/failures.json", JSON.stringify(record) + "\n");
    }
  }
}