import { test, expect } from "../fixtures/testBase";

test.describe('SignInPage', () =>
{
    test('Verify valid user can sign into the system', async ({signInPage, candidatePage, userData}) =>
    {
        await signInPage.performSignIn(userData.email, userData.password); 
        
        await expect(candidatePage.candidateProfileHeading).toBeVisible();
    });

    test('Verify valid user can sign out of the system', async ({signInPage, candidatePage, userData}) =>
    {
        await signInPage.performSignIn(userData.email, userData.password);
        
        await expect(candidatePage.candidateProfileHeading).toBeVisible();
        
        await candidatePage.performSignOut();

        await expect(signInPage.logOutMessage).toBeVisible();
    });

    test('Verify error message is displayed when user logs in with invalid credentials', async ({signInPage}) =>
    {
        await signInPage.performSignIn('invalid.email@fail.com', 'invalidPassword101!'); // Dummy credentials that do not exist
        
        await expect(signInPage.errorMessage).toBeVisible();
    });
});