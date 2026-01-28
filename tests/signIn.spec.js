import { test, expect } from './testBase';
import inputData from '../data/inputData.json';

test.describe('SignInPage', () =>
{
    test('Verify valid user can sign into the system', async ({signInPage}) =>
    {
        await signInPage.performSignIn(inputData.signInEmail, inputData.signInPassword); // Dummy account that does not exist
    });

    test('Verify error message is displayed when user logs in with invalid credentials', async ({signInPage}) =>
    {
        await signInPage.performSignIn(inputData.signInEmail, inputData.signInPassword); // Dummy account that does not exist
        await expect(signInPage.errorMessage).toBeVisible();
    });
}); 