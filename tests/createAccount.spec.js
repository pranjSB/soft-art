import {test, expect} from "@playwright/test";
import CreateAccountPage from "../page_objects/createAccountPage";
import { generateUser } from '../utils/testData';

test.describe('CreateAccountPage', () =>
{
    test.beforeEach(async ({ page }) => 
    {
        await page.goto(process.env.CREATE_ACCOUNT_URL, { waitUntil: 'domcontentloaded' });
    });

    test('Verify a new user can create an account with valid credentials', async ({page}) =>
    {
        const newAccount = new CreateAccountPage(page);
        const user = generateUser();

        await newAccount.waitForReady();
        await newAccount.createAccount(user);

        // await expect(newAccount.wecomeMessage).toBeVisible(); // Dummy message
    });

    test('Verify error message is displayed when emails IDs do not match', async ({page}) =>
    {
        const newAccount = new CreateAccountPage(page);
        const user = generateUser();

        await newAccount.waitForReady();
        await newAccount.createAccount(user);

        await expect(newAccount.requiredFieldsError).toBeVisible();
        await expect(newAccount.requiredFieldsError).toContainText(/required/i);
    });
});