export default class CandidatePage
{
    constructor(page)
    {
        this.page = page;

        this.candidateProfileHeading = page.getByRole('heading', { name: /candidate profile/i });
        this.optionsLink = page.getByTitle('Options');
        this.myProfileOption = page.getByTitle('My Profile');

        this.profileInformationButton = page.getByRole('button', { name: /profile information/i });
        this.emailAddressInput = page.locator('input[name="contactEmail"]');
        this.firstNameInpput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.phoneInput = page.locator('input[name="cellPhone"]');

        this.signOutLink = page.locator('#_signout');
    }

    async expandProfileInformation()
    {
        //await this.profileInformationButton.click();
        await this.optionsLink.click();
        await this.myProfileOption.click();
    }

    async performSignOut()
    {
        await this.signOutLink.click();
    }
}