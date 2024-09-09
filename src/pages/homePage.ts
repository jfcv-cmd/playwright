import { Page, expect } from "@playwright/test"
import logger from "../utils/LoggerUtil";

export default class HomePage {
    private readonly homePageTitleSelector = 'Home';

    constructor(private page: Page) {

    }

    async expectHomePageTitleToBeVisible() {
        await expect(this.page.getByRole('tab', { name: this.homePageTitleSelector }))
                    .toBeVisible({ timeout: 15000 })
                    .then(() => logger.info(`landed on the home page`))
                    .catch(error => {
                        logger.error(`Error landing on the home page: ${error}`);
                        throw error;
                    });
    }
}