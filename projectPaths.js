import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = __dirname;
export const LOGS = path.join(ROOT, 'logs');
export const INTELLIGENCE = path.join(ROOT, 'intelligence');
export const HEALING = path.join(ROOT, 'healing');
export const REPORTING = path.join(ROOT, 'reporting');