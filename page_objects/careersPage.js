import { expect } from '../tests/fixtures/testBase';
import { TIMEOUTS } from "../utils/timeOut";

export default class CareersPage 
{
    constructor(page) 
    {
        this.page = page;

        this.careersLink = page.locator('nav[aria-label="Sub Menu"] a',{ hasText: 'Careers' });

        this.exploreJobsLink = page.getByRole('link', { name: /explore jobs/i });

        this.keywordInput = page.getByRole('textbox', { name: /search by keyword/i });
        this.locationInput = page.getByRole('textbox', { name: /search by location/i });
        this.searchJobsButton = page.getByRole('button', { name: /search jobs/i });
        this.searchResultsForHeading = page.getByRole('heading', { name: /Search results for ""./i });
        this.firstJobLink = page.locator('a.jobTitle-link[href*="/job/"]');
        this.jobHeading = page.locator('h1 [data-careersite-propertyid="title"]');

        this.applyNowButton = page.getByRole('button', { name: /apply now/i }).first();
        this.applyNowMenuItem = page.getByRole('menuitem', { name: /apply now/i });
        this.signInHeading = page.getByRole('h1', { name: /Career Opportunities/i });

        this.careerOpportunitiesHeading = page.locator('h1, h2, [role="heading"]').filter({ hasText: /Career Opportunities:/i });
        this.searchErrorMessage = page.locator('#attention');
    }

  async navigateToJobSearch() 
  {
        await this.careersLink.click();
        await this.exploreJobsLink.click();
        await this.page.waitForLoadState('domcontentloaded');
  }

  async searchForJobs(keyword, location) 
  {
        await this.keywordInput.fill(keyword);
        await this.locationInput.fill(location);

        const searchResponse = this.page.waitForResponse(res => res.url().includes('/search') && res.status() === 200);

        await this.searchJobsButton.click();
        await searchResponse;

        await Promise.race
        ([
            expect(this.firstJobLink.first()).toBeVisible({ timeout: TIMEOUTS.UI_TRANSITION }),
            expect(this.searchErrorMessage).toBeVisible({ timeout: TIMEOUTS.UI_TRANSITION })
        ]);
  }

  async getFirstJobOpening() 
  {
        const firstJob = this.firstJobLink.first();
        await expect(firstJob).toBeVisible({ timeout: TIMEOUTS.DEFAULT_EXPECT });

        const title = (await firstJob.textContent())?.trim();
        if (!title) 
            throw new Error('Job title not found in search results');

        await Promise.all([this.page.waitForLoadState('domcontentloaded'),firstJob.click()]);

        await expect(this.jobHeading).toContainText(title);
        return title;
  }

  async applyForJob() 
  {
        await expect(this.applyNowButton).toBeVisible({ timeout: TIMEOUTS.DEFAULT_EXPECT });

        await this.applyNowButton.click();
        await this.applyNowMenuItem.click();

        await this.page.waitForLoadState('domcontentloaded');
        
        await this.waitForApplyFlowToLoad();
  }

  async waitForApplyFlowToLoad() 
  {
        const primaryHeading = this.page.locator('h1, h2, [role="heading"]').filter({ hasText: /Career Opportunities: /i });
        // Includes h2 because the site has marketing pages; using h2 increases match surface, false positives, 
        // debug time when something weird matches.
        const fallbackHeading = this.page.locator('h1:visible, h2:visible, [role="heading"]:visible')
                                .filter({ hasText: /Career\s+Opportunities\s*[:–-]\s*(Sign\s+in|Create\s+an\s+Account|.+)/i })
                                .first();
        // The regex ensures that the search mateches either one of the three- 
        // 1. "Career Opportunities: Some text" OR 
        // 2. "Career Opportunities: Sign in" OR 
        // 3. "Career Opportunities: Create an Account"
        // All the above 3 appear for different apply workflows, e.g., 
        // #1 appears for search without filter or for searching certain locations based roles like 'Israel' > click apply
        // #2 appears for 'United States' based roles 
        // #3 appears while creating an account

        try // Primary assertion (strict) 
        {
            await expect(primaryHeading).toBeVisible({ timeout: TIMEOUTS.UI_TRANSITION });
            return;
        } 
        catch // Soft fallback path
        {
            console.warn('Primary heading not found. Using fallback apply flow assertion.');
            await expect(fallbackHeading).toBeVisible({ timeout: TIMEOUTS.UI_TRANSITION });
        }

        // Extra safety: ensures navigation really happened
        await expect(this.page).toHaveURL(/apply|career|job/i, { timeout: TIMEOUTS.UI_TRANSITION });
  }

}
