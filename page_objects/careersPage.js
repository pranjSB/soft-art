export default class careersPage
{   
    
    constructor(page)
    {
        this.page = page;

        this.careersButton = page.locator('nav[aria-label="Sub Menu"] a', { hasText: 'Careers' });
        this.exploreJobsButton = page.getByRole('link', { name: 'Explore jobs' });
        this.searchResultsForHeading = page.getByRole('heading', { name: 'Search results for' });
        this.searchByKeywordTextbox = page.getByRole('textbox', { name: 'Search by Keyword' });
        this.searchByLocationTextbox = page.getByRole('textbox', { name: 'Search by Location' });
        this.searchJobsButton = page.getByRole('button', { name: 'Search Jobs' });
        this.paginationLocator = page.locator('span.paginationLabel[aria-label^="Results "]').first();

        this.firstJobCell = page.locator('table tr td:first-child a').first();
        //this.firstJobLink = page.locator('a.jobTitle-link[href*="/job/"]').first();
        this.jobHeading = page.getByRole('heading', { level: 1 }).locator('span[itemprop="title"]');
        this.applyNowButton = page.getByRole('button', { name: 'Apply now'}).first();
        this.applyNowLink = page.getByRole('menuitem', { name: 'Apply now'});

        this.signInHeading = page.getByRole('heading', { name: 'Career Opportunities: Sign In' });

    }
    
    async navigateToJobSearch()
    {
        await this.careersButton.click();
        await this.exploreJobsButton.click();
    }

    async searchForJobs(keyword, location)
    {
        await this.searchByKeywordTextbox.fill(keyword);
        await this.searchByLocationTextbox.fill(location);
        await this.searchJobsButton.click();
    }

    async getFirstJobOpening()
    {
        this.jobTitle = await this.firstJobCell.textContent();
        if (!this.jobTitle)
            throw new Error('First job title not found');

        await this.firstJobCell.click();
        this.currentJobTitle = this.jobTitle.trim();

    }

    async applyForJob()
    {
        await this.applyNowButton.click();
        await this.applyNowLink.click();
    }

}