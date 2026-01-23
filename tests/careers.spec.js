import { test, expect } from './testBase';
import CareersPage from '../page_objects/careersPage';
import inputData from '../data/inputData.json';

test.describe("Careers page", () => 
{
  let careers;

  test('Verify searching for job openings', async ({ page }) => 
  {
      careers = new CareersPage(page);
      
      await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
      await careers.navigateToJobSearch();
      await expect(careers.searchResultsForHeading1).toBeVisible();
      await careers.searchForJobs(inputData.keywordSearch, inputData.location);
      await expect(careers.firstJobLink.first()).toBeVisible();
  });

  test('Verify applying for job openings', async ({ page }) => 
  {
      careers = new CareersPage(page);

      await page.goto(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });
      await careers.navigateToJobSearch();
      await expect(careers.searchResultsForHeading1).toBeVisible();
      await careers.searchForJobs(inputData.keywordSearch, inputData.location);
      await expect(careers.firstJobLink.first()).toBeVisible();

      const currentJobTitle = await careers.getFirstJobOpening();
      expect(currentJobTitle).toBeTruthy();
      await expect(careers.jobHeading).toContainText(currentJobTitle);
      await careers.applyForJob();
      await expect(careers.signInHeading).toBeVisible({ timeout: 10000 });
  });
});
