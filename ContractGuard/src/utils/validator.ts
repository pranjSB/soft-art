import Ajv from "ajv";
import { ErrorObject } from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

export const validateResponse = (schema: any, data: any) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    return { valid: true, errors: null };
  }

  return {
    valid: false,
    errors: validate.errors,
  };
};

export const classifyErrors = (errors: ErrorObject[] = []) => {  
  if (!errors) return [];
    return errors.map((err) => {
      if (err.keyword === "required") {
        return { type: "MISSING_FIELD", details: err };
      }
    if (err.keyword === "type") {
      return { type: "TYPE_MISMATCH", details: err };
    }
    return { type: "OTHER", details: err };
  });
};