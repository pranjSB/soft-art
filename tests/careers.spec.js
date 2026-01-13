import { test, expect } from './testBase';
import careersPage from '../page_objects/careersPage';

test.describe("Careers page", () => 
{
  let careers;

  test('Verify searching for job openings', async ({ page }) => 
  {
      careers = new careersPage(page);
      const keywordSearch = '"software test" OR SDET OR QA OR "test automation"';
      const location = 'united states';
      
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await careers.navigateToJobSearch();
      await expect(careers.searchResultsForHeading).toBeVisible();
      await careers.searchForJobs(keywordSearch, location);
      await expect(careers.paginationLocator).toBeVisible();
  });

  test('Verify applying for job openings', async ({ page }) => 
  {
      careers = new careersPage(page);
      const keywordSearch = '"software test" OR SDET OR QA OR "test automation"';
      const location = 'united states';

      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await careers.navigateToJobSearch();
      await expect(careers.searchResultsForHeading).toBeVisible();
      await careers.searchForJobs(keywordSearch, location);
      await expect(careers.paginationLocator).toBeVisible();

      await careers.getFirstJobOpening();
      await expect(careers.jobHeading).toContainText(careers.currentJobTitle);
      await careers.applyForJob();
      await expect(careers.signInHeading).toBeVisible({ timeout: 10000 });
  });
});
