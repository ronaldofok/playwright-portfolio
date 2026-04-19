import { Page, expect } from '@playwright/test';

export class ShippingData {
    readonly page: Page;
    readonly shippingTitle;
    readonly firstName;
    readonly lastName;
    readonly postalCode;
    readonly continueButton;

    constructor(page: Page) {
        this.page = page;
        this.shippingTitle = page.locator('[data-test="title"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');

    }

    async fillShippingData() {

        await expect(this.shippingTitle).toContainText('Checkout: Your Information');
        await this.firstName.fill('Ronaldo');
        await this.lastName.fill('Test');
        await this.postalCode.fill('GIR 0AA');
        await this.continueButton.click();
    }
}