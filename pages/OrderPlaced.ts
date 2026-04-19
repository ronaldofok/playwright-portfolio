import { Page, expect } from '@playwright/test';

export class OrderPlaced {
    readonly page: Page;
    readonly completeHeader;
    readonly completeText;
    readonly buttonBackToProducts;
    readonly title;


    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.buttonBackToProducts = page.locator('[data-test="back-to-products"]');
        this.title = page.locator('[data-test="title"]');


    }

    async orderPlaced() {

        await expect(this.completeHeader).toContainText('Thank you for your order!');
        await expect(this.completeText).toBeVisible();
        await this.buttonBackToProducts.click();
        await expect(this.title).toContainText('Products');
    }
}