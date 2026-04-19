import { Page, expect } from '@playwright/test';

export class CheckoutOverview {
    readonly page: Page;
    readonly checkoutTitle;
    readonly checkoutSubTitle;
    readonly checkoutTaxLabel;
    readonly checkoutTotalLabel;
    readonly finishButton;

    constructor(page: Page) {
        this.page = page;
        this.checkoutTitle = page.locator('[data-test="title"]');
        this.checkoutSubTitle = page.locator('[data-test=subtotal-label]');
        this.checkoutTaxLabel = page.locator('[data-test="tax-label"]');
        this.checkoutTotalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async checkoutOverviewCheck() {
        await expect(this.checkoutTitle).toContainText('Checkout: Overview');
        await expect(this.checkoutSubTitle).toContainText('Item total: $29.99');
        await expect(this.checkoutTaxLabel).toContainText('Tax: $2.40');
        await expect(this.checkoutTotalLabel).toContainText('Total: $32.39');
        await this.finishButton.click();
    }
}