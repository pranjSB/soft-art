import { test, expect } from './testBase';
import inputData from '../data/inputData.json';

test.describe('CareersPage', () => 
{

  test('Verify searching for job openings', async ({ careersPage }) => 
  {
    await careersPage.navigateToJobSearch();
    await expect(careersPage.searchResultsForHeading).toBeVisible();
    await careersPage.searchForJobs(inputData.keywordSearch, inputData.location);
    await expect(careersPage.firstJobLink.first()).toBeVisible();
  });

  test('Verify applying for job openings @flaky', async ({ careersPage }) => 
  {
    test.info().annotations.push
    ({
        type: 'flaky',
        description: 'SPA navigation + Multiple valid region-based auth entry points'
    });
    
    await careersPage.navigateToJobSearch();
    await expect(careersPage.searchResultsForHeading).toBeVisible();
    await careersPage.searchForJobs(inputData.keywordSearch, inputData.location);

    const currentJobTitle = await careersPage.getFirstJobOpening();
    expect(currentJobTitle).toBeTruthy();

    await careersPage.applyForJob();
  });

  test('Verify error message for invalid search', async ({ careersPage }) => 
  {
    await careersPage.navigateToJobSearch();
    await careersPage.searchForJobs('iNvAlId', '1^v@|!0');
    await expect(careersPage.searchErrorMessage).toBeVisible();
    await expect(careersPage.searchErrorMessage).toHaveText(/invalid|no jobs|no open positions/i);
  });

});
