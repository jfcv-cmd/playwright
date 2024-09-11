import { test } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";

test('contact creation', async ({ page }) => {
    logger.info("test for contact creation started...");

    const firstName = 'Ahzrim';
    const lastName = 'Yusul';

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid as string));
    await loginPage.fillPassword(decrypt(process.env.password as string));

    const homePage = await loginPage.clickLoginButton();

    await homePage.expectHomePageTitleToBeVisible();

    const contactsPage = await homePage.navigateToContactsTab();

    await contactsPage.createNewContact(firstName, lastName);
    await contactsPage.expectContactLabelToContainName(firstName, lastName);

    logger.info("test for contact creation completed.");
})