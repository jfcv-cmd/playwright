import { test } from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import { encryptEnvFile} from "../utils/EncryptEnvFile";
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";

test("login", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid as string));
    await loginPage.fillPassword(decrypt(process.env.password as string));

    const homePage = await loginPage.clickLoginButton();

    await homePage.expectHomePageTitleToBeVisible();

    logger.info("test for login completed.");
});

test.skip("encryption test", async ({ page }) => {
    encryptEnvFile();
});