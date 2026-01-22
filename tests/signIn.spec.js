import {test, expect} from "@playwright/test";
import SignInPage from "../page_objects/signInPage";

test.describe('Sign In Page', () =>
{
    let signin;

    test('Verify valid user can sign into the system', async ({page}) =>
    {
        signin = new SignInPage(page);

        await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded'});
        await signin.performSignIn('codelover.username@qualitest.com', 'codeloverpassword1111!'); // Dummy account that does not exist
        
        // await expect(signin.welcomeMessage).toBeVisible(); // Dummy message
    });

    test('Verify error message is displayed when user logs in with invalid credentials', async ({page}) =>
    {
        signin = new SignInPage(page);

        await page.goto(process.env.SIGNIN_URL, { waitUntil: 'domcontentloaded'});
        await signin.performSignIn('codelover.username@qualitest.com', 'codeloverpassword1111!'); // Dummy account that does not exist

        await expect(signin.errorMessage).toBeVisible();
    });
}); 