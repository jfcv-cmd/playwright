import { Page, expect } from "@playwright/test"
import logger from "../utils/LoggerUtil";

export default class ContactPage {
    private readonly newButtonSelector = 'New';
    private readonly firstNameSelector = 'First Name';
    private readonly lastNameSelector = 'Last Name';
    private readonly saveButtonSelector = 'Save';
    private readonly contactNameLabelSelector = '[name="primaryField"]';
    private readonly contactsLinkSelector = 'Contacts';

    constructor(private page: Page) {}

    async createNewContact(firstName: string, lastName: string) {
        await this.page.getByRole('button', { name: this.newButtonSelector }).click();
        logger.info('New button clicked');

        await this.page.getByPlaceholder(this.firstNameSelector).click();
        await this.page.getByPlaceholder(this.firstNameSelector).fill(firstName);
        logger.info(`first name Textbox filled as ${firstName}`);

        await this.page.getByPlaceholder(this.firstNameSelector).press('Tab');
        await this.page.getByPlaceholder(this.lastNameSelector).fill(lastName);
        logger.info(`first name Textbox filled as ${lastName}`);

        await this.page.getByRole('button', { name: this.saveButtonSelector, exact: true }).click()
            .then(() => logger.info('Save button clicked'))
            .catch((err) => {
                logger.error(`Error clicking Save button: ${err}`);
                throw err;
            });
    }

    async expectContactLabelToContainName(firstName: string, lastName: string) {
        await expect(this.page.locator(this.contactNameLabelSelector).last()).toContainText(`${firstName} ${lastName}`);
        logger.info(`new contact created successfully. ${firstName} ${lastName} is visible`);

        await this.page.getByRole('link', { name: this.contactsLinkSelector }).click();
    }
}