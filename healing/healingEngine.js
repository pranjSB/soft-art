import { findAlternatives } from './healingLocator.js';
import fs from 'fs';

export async function capture(page, failure) 
{
  const brokenSelector = failure.selector;
  const url = page.url();

  const candidates = await findAlternatives(page, brokenSelector);

  const record = 
  {
    timestamp: new Date().toISOString(),
    url,
    brokenSelector,
    candidates
  };

  const path = './logs/healCandidates.json';

  let existing = [];
  if (fs.existsSync(path))
    existing = JSON.parse(fs.readFileSync(path));

  existing.push(record);
  fs.writeFileSync(path, JSON.stringify(existing, null, 2));
}