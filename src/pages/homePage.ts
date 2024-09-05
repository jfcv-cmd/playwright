import { Page, expect } from "@playwright/test"

export default class HomePage {
    private readonly homePageTitleSelector = 'Home';

    constructor(private page: Page) {

    }

    async expectHomePageTitleToBeVisible() {
        await expect(this.page
                    .getByRole('tab', { name: this.homePageTitleSelector }))
                    .toBeVisible({ timeout: 15000 });
    }
}