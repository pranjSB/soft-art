export async function findAlternatives(page, brokenSelector) 
{
  const elements = await page.$$('*');

  const results = [];

  for (const el of elements) 
  {
    const text = await el.textContent();
    const id = await el.getAttribute('id');
    const name = await el.getAttribute('name');
    const aria = await el.getAttribute('aria-label');

    let score = 0;

    if (text && brokenSelector.includes(text.trim())) 
        score += 3;
    if (id && brokenSelector.includes(id)) 
        score += 5;
    if (aria && brokenSelector.includes(aria)) 
        score += 4;

    if (score > 0) 
      results.push({text, id, name, aria, score});
  }

  return results.sort((a,b) => b.score - a.score).slice(0, 5);
}