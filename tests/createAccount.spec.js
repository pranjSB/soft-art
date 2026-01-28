import { test, expect } from './testBase';
import { generateUser } from '../utils/testData';

test.describe('CreateAccountPage', () =>
{
    test('Verify a new user can create an account with valid credentials', async ({createAccountPage}) =>
    {
        const user = generateUser();

        await createAccountPage.createAccount(user);
        // await expect(createAccountPage.wecomeMessage).toBeVisible(); // Dummy message
    });

    test('Verify error message is displayed when emails IDs do not match', async ({createAccountPage}) =>
    {
        const user = generateUser();

        await createAccountPage.createAccount(user, {retypeEmail: 'wrong.email@domain.com'});

        await expect(createAccountPage.requiredFieldsError).toBeVisible();
        await expect(createAccountPage.requiredFieldsError).toContainText(/not a robot/i);

    });
});