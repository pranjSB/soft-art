export async function findAlternatives(page, brokenSelector) 
{
  const elements = await page.$$('*'); // $$('*') = querySelectorAll(all elements); brute force- observe everything

  const results = [];

  for (const element of elements) // O(n) expensive but acceptable for intelligence gathering; trading performance for observability.
  {
    const text = await element.textContent();
    const id = await element.getAttribute('id');
    const name = await element.getAttribute('name');
    const aria = await element.getAttribute('aria-label');

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