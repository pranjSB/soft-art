import { FAILURE_TYPES } from "./failureTypes.js";

export function classifyFailure(errorMessage) 
{
  if (!errorMessage) return FAILURE_TYPES.UNKNOWN;

  const msg = errorMessage.toLowerCase();

  if (msg.includes("timeout")) 
    return FAILURE_TYPES.TIMEOUT;

  if (msg.includes("not found") || msg.includes("locator") || msg.includes("element"))
    return FAILURE_TYPES.LOCATOR;

  if (msg.includes("500") || msg.includes("404") || msg.includes("api"))
    return FAILURE_TYPES.BACKEND;

  if (msg.includes("undefined") || msg.includes("null") || msg.includes("cannot read"))
    return FAILURE_TYPES.DATA;

  if (msg.includes("browser closed") || msg.includes("target closed"))
    return FAILURE_TYPES.INFRA;

  return FAILURE_TYPES.UNKNOWN;
}