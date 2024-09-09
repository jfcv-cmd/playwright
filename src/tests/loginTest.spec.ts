import { test } from "@playwright/test"
import LoginPage from "../pages/loginPage"
import { encryptEnvFile} from "../utils/EncryptEnvFile";
import { decrypt } from "../utils/CryptojsUtil";

test("login", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid as string));
    await loginPage.fillPassword(decrypt(process.env.password as string));

    const homePage = await loginPage.clicLoginButton();

    await homePage.expectHomePageTitleToBeVisible();
});

test.skip("encryption test", async ({ page }) => {
    encryptEnvFile();
});