import { Page } from "@playwright/test"
import HomePage from "./homePage";
import logger from "../utils/LoggerUtil";

export default class LoginPage {
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page: Page) {

    }

    async navigateToLoginPage() {
        await this.page
            .goto("/lightning/page/home");

        logger.info("navigated to baseURL");
    }

    async fillUsername(username: string) {
        await this.page
            .locator(this.usernameInputSelector)
            .fill(username);

        logger.info("username filled");
    }

    async fillPassword(password: string) {
        await this.page
            .locator(this.passwordInputSelector)
            .fill(password);

        logger.info("password filled");
    }

    async clickLoginButton() {
        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .then(() => logger.info(`clicked the login button`))
            .catch(error => {
                logger.error(`Error clicking the login button: ${error}`);
                throw error;
            });

        return new HomePage(this.page); // page object chaining
    }
}