import { test } from "@playwright/test"
import LoginPage from "../pages/loginPage"

test("login", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("user@qa.com");
    await loginPage.fillPassword("playwright005");

    const homePage = await loginPage.clicLoginButton();

    await homePage.expectHomePageTitleToBeVisible();
});