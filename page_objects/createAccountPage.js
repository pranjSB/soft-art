export default class CreateAccountPage
{
    constructor(page)
    {
        this.page = page;

        this.emailInput = page.locator('#fbclc_userName');
        this.retypeEmailInput = page.locator('#fbclc_emailConf');
        this.passwordInput = page.locator('#fbclc_pwd');
        this.retypePasswordInput = page.locator('#fbclc_pwdConf');
        this.firstNameInput = page.locator('#fbclc_fName');
        this.lastNameInput = page.locator('#fbclc_lName');
        this.countryCodeDropdown = page.locator('#fbclc_ituCode');
        this.phoneInput = page.locator('#fbclc_phoneNumber');
        this.residenceCountryDropdown = page.locator('#fbclc_country');
        this.notification1Checkbox = page.locator('#fbclc_emailEnabled');
        this.notification2Checkbox = page.locator('#fbclc_campaignEmailEnabled');
        this.captchaCheckbox = page.locator('#recaptcha-anchor'); // Cannot be automated

        this.termsofUseLink = page.locator('#dataPrivacyId');
        this.acceptTermsButton = page.getByRole('button', {name: 'Accept'});    
        this.createAccountButton = page.locator('#fbclc_createAccountButton');

        this.requiredFieldsError = page.locator('[role="alert"] .important-focus-msg');
    }

    async waitForReady() 
    {
        await this.emailInput.waitFor({ state: 'visible' });
    }

    async createAccount(user, overrides = {}) 
    {
        const data = { ...user, ...overrides };

        await this.waitForReady();

        await this.emailInput.fill(data.email);
        await this.retypeEmailInput.fill(data.retypeEmail ?? data.email);

        await this.passwordInput.fill(data.password);
        await this.retypePasswordInput.fill(data.password);

        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);

        await this.countryCodeDropdown.selectOption(data.country);
        await this.phoneInput.fill(data.phone);
        await this.residenceCountryDropdown.selectOption(data.residenceCountry);

        await this.notification1Checkbox.setChecked(true);
        await this.notification2Checkbox.setChecked(true);

        await this.acceptTerms();

        await Promise.all
        ([
            this.page.waitForSelector('[role="alert"], #welcome-message', { state: 'attached' }),
            this.createAccountButton.click()
        ]);
    }

    async acceptTerms() 
    {
        await this.termsofUseLink.click();

        const dialog = this.page.getByRole('dialog');
        await dialog.waitFor({ state: 'visible' });

        await this.acceptTermsButton.click();
        await dialog.waitFor({ state: 'hidden' });
    }
}