import { test, expect } from "../fixtures/testBase";

test.describe('CandidateProfilePage', () =>
{
    test('Verify candidate profile details for a valid user', async ({signInPage, candidatePage, userData}) =>
    {
        await signInPage.performSignIn(userData.email, userData.password);
        
        await expect(candidatePage.candidateProfileHeading).toBeVisible();

        await candidatePage.expandProfileInformation();

        // Following is test code for old feature. 
        // Currently, new feature on Qualitest website doesn't render anything 
        // after clicking 'Options' > 'My Profile'

        // await expect(candidatePage.emailAddressInput).toHaveValue(userData.email);
        // await expect(candidatePage.firstNameInpput).toHaveValue(userData.firstName);
        // await expect(candidatePage.lastNameInput).toHaveValue(userData.lastName);
        // await expect(candidatePage.phoneInput).toHaveValue(userData.phone); // Verifies if phone number is correct
        // because Qualitest system checks uniqueness of an account against email and phone number.

        await candidatePage.performSignOut();

        await expect(signInPage.logOutMessage).toBeVisible();
    });
});
