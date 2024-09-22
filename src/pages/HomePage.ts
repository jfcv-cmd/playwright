import { Page, expect } from "@playwright/test"
import logger from "../utils/LoggerUtil";
import ContactPage from "./ContactPage";

export default class HomePage {
    private readonly homePageTitleSelector = 'Home';
    private readonly contactsLinkSelector = 'Contacts';

    constructor(private page: Page) {

    }

    async expectHomePageTitleToBeVisible() {
        await expect(this.page.getByTitle(this.homePageTitleSelector).first())
                    .toBeVisible({ timeout: 25000 })
                    .then(() => logger.info(`landed on the home page`))
                    .catch(error => {
                        logger.error(`Error landing on the home page: ${error}`);
                        throw error;
                    });
    }

    async navigateToContactsTab() {
        await expect(this.page.getByRole('link', { name: this.contactsLinkSelector })).toBeVisible();
        logger.info('Contacts Tab is visible');

        await this.page.getByRole('link', { name: this.contactsLinkSelector }).click();
        logger.info('Contacts Tab clicked');

        return new ContactPage(this.page);
    }
}