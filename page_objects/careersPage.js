import {expect} from "../tests/testBase";

export default class CareersPage
{   
    
    constructor(page)
    {
        this.page = page;
        this.careersLink = page.locator('nav[aria-label="Sub Menu"] a', { hasText: 'Careers' });
        this.exploreJobsLink = page.getByRole('link', { name: /explore jobs/i });
        this.searchResultsForHeading1 = page.getByRole('heading', { name: /Search results for ""./i });
        this.keywordInput = page.getByRole('textbox', { name: /search by keyword/i });
        this.locationInput = page.getByRole('textbox', { name: /search by location/i });
        this.searchJobsButton = page.getByRole('button', { name: /search jobs/i });

        this.firstJobLink = page.locator('a.jobTitle-link[href*="/job/"]');
        this.jobHeading = page.locator('h1 [data-careersite-propertyid="title"]');

        this.applyNowButton = page.getByRole('button', { name: /apply now/i }).first();
        this.applyNowMenuItem = page.getByRole('menuitem', { name: /apply now/i });

        this.signInHeading = page.getByRole('heading', { name: /Career Opportunities/i });

    }
    
    async navigateToJobSearch()
    {
        await this.careersLink.click();
        await this.exploreJobsLink.click()
    }

    async searchForJobs(keyword, location)
    {
        const before = await this.firstJobLink.first().textContent().catch(() => null);
        
        await this.keywordInput.fill(keyword);
        await this.locationInput.fill(location);
        const searchResponse = this.page.waitForResponse(res => 
            res.url().includes('/search') && res.status() === 200);

        await this.searchJobsButton.click();
        await searchResponse;

        await this.page.waitForFunction((oldText) => 
        {
            const el = document.querySelector('a.jobTitle-link');
            return el && el.textContent !== oldText;
        },
        before);
    }

    async getFirstJobOpening() 
    {
        const firstJob = this.firstJobLink.first();
        await expect(firstJob).toBeVisible();

        const title = (await firstJob.textContent())?.trim();
        if (!title)
             throw new Error('Job title not found in search results');

        await Promise.all
        ([
            this.page.waitForResponse(res =>
            res.url().includes('/search') && res.status() === 200),firstJob.click()
        ]);     

        await expect(this.jobHeading).toContainText(title);
        return title;
    }

    async applyForJob()
    {
        await expect(this.applyNowButton).toBeVisible();
        await this.applyNowButton.click();
        await this.applyNowMenuItem.click();
        await expect(this.signInHeading).toBeVisible();
    }

}