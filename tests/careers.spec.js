import { test, expect } from './testBase';

test.describe("Careers page", () => 
{
  test('Verify searching for job openings', async ({ page }) => 
  {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('nav[aria-label="Sub Menu"] a', { hasText: 'Careers' }).click();
    await page.getByRole('link', { name: 'Explore jobs' }).click();
    await expect(page.getByRole('heading', { name: 'Search results for' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Search by Keyword' }).fill('"software test" OR SDET OR QA OR "test automation"');
    await page.getByRole('textbox', { name: 'Search by Location' }).fill('united states');
    await page.getByRole('button', { name: 'Search Jobs' }).click();
  });

  test('Verify applying for job openings', async ({ page }) => 
  {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('nav[aria-label="Sub Menu"] a', { hasText: 'Careers' }).click();
    await page.getByRole('link', { name: 'Explore jobs' }).click();
    await expect(page.getByRole('heading', { name: 'Search results for' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Search by Keyword' }).fill('"software test" OR SDET OR QA OR "test automation"');
    await page.getByRole('textbox', { name: 'Search by Location' }).fill('united states');
    await page.getByRole('button', { name: 'Search Jobs' }).click();
    const firstOpening = await page.locator('table tr td:first-child a').first().textContent();
    await page.getByRole('link', { name: `${firstOpening}` }).click();
    await expect(page.getByRole('heading', { name: `${firstOpening}` })).toBeVisible();
    await page.getByRole('button', { name: 'Apply now'}).first().click();
    await page.getByRole('menuitem', { name: 'Apply now'}).click();
  });
});
