import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = path.resolve(__dirname);

export const LOGS = path.resolve(ROOT, "logs");

export const INTELLIGENCE = path.resolve(ROOT, "intelligence");

export const HEALING = path.resolve(ROOT, "healing");

export const REPORTING = path.resolve(ROOT, "reporting");