import { test } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";
import contacts from "../testdata/contacts.json";

type User = {
    firstName: string;
    lastName: string;
}

for (const contact of contacts as User[]) {
    test(`data driven [ DD ] contact creation for ${contact.firstName} ${contact.lastName}`, async ({ page }) => {
        logger.info("test for contact creation started...");

        const loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.userid as string));
        await loginPage.fillPassword(decrypt(process.env.password as string));

        const homePage = await loginPage.clickLoginButton();

        await homePage.expectHomePageTitleToBeVisible();

        const contactsPage = await homePage.navigateToContactsTab();

        await contactsPage.createNewContact(contact.firstName, contact.lastName);
        await contactsPage.expectContactLabelToContainName(contact.firstName, contact.lastName);

        logger.info("test for contact creation completed.");
    });
}

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
});