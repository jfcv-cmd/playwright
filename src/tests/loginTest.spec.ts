import { test } from "@playwright/test"
import LoginPage from "../pages/loginPage"

test("login", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.userid as string);
    await loginPage.fillPassword(process.env.password as string);

    const homePage = await loginPage.clicLoginButton();

    await homePage.expectHomePageTitleToBeVisible();
});