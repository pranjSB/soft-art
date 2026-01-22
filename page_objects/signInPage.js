export default class SignInPage
{
    constructor(page)
    {
        this.page = page;

        this.usernameTextbox = page.locator('#username');
        this.passwordTextbox = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });

        this.welcomeMessage = page.getByText('#welcome-message'); // dummy locator
        this.errorMessage = page.locator('#errorMsg_1');
    }

    async performSignIn(username, password)
    {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.signInButton.click();
    }
}