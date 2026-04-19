import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly primaryHeader;
    readonly backpackTitle;
    readonly inventoryList;
    readonly addBackpackToCart;
    readonly cartLink;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeader = page.locator('[data-test="primary-header"]');
        this.backpackTitle = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.addBackpackToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async verifyHeader() {
        await expect(this.primaryHeader).toContainText('Swag Labs');
    }

    async verifyBackpack() {
        await expect(this.backpackTitle).toContainText('Sauce Labs Backpack');
        await expect(this.inventoryList).toContainText('$29.99');
    }

    async addBackpackAndGoToCart() {
        await this.addBackpackToCart.click();
        await this.cartLink.click();
    }

}

