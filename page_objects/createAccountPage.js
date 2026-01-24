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
        this.captchaCheckbox = page.locator('#recaptcha-anchor');
        this.termsofUseLink = page.getByRole('button', {name: /read and accept the data privacy statement/i});
        this.acceptTermsButton = page.getByRole('button', {name: 'Accept'});    
        this.createAccountButton = page.locator('#fbclc_createAccountButton');

        this.welcomeMessage = page.locator('#welcome-message'); // dummy locator
        this.requiredFieldsError = page.locator('[role="alert"]');
    }

    async waitForReady() 
    {
        await this.emailInput.waitFor({ state: 'visible' });
    }

    async fillForm(user)
    {
        await this.emailInput.fill(user.email);
        await this.retypeEmailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.retypePasswordInput.fill(user.password);
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.countryCodeDropdown.selectOption(user.country);        
        await this.phoneInput.fill(user.phone);
        await this.residenceCountryDropdown.selectOption(user.residenceCountry);
        await this.notification1Checkbox.setChecked(true);
        await this.notification2Checkbox.setChecked(true)   ;
        //await this.captchaCheckbox.setChecked(true);
        await this.termsofUseLink.click();
        await this.acceptTermsButton.click();

        await Promise.all
        ([
            this.page.waitForLoadState('domcontentloaded'),
            this.createAccountButton.click()
    
        ]);    
    }

    async createAccount(user)
    {
        await this.waitForReady();
        await this.fillForm(user);
    }
}