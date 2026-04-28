import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly primaryHeader;
    readonly backpackTitle;
    readonly inventoryList;
    readonly addBackpackToCart;
    readonly cartLink;
    readonly selector;
    readonly firstProduct;
    readonly firstProductTitle;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeader = page.locator('[data-test="primary-header"]');
        this.backpackTitle = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.addBackpackToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.selector = page.locator('[data-test="product-sort-container"]');
        this.firstProduct = page.locator('[data-test="inventory-item"]').first();
        this.firstProductTitle = page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-name"]');
    }

    async verifyHeader() {
        await expect(this.primaryHeader).toContainText('Swag Labs');
    }

    async verifyProductOrder() {
        await expect(this.selector).toBeVisible();
        await this.selector.selectOption('hilo');
        await expect(this.firstProduct).toContainText('Sauce Labs Fleece Jacket');
    }




    async openFirstProductNewTab() {
        const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), this.page.evaluate('window.open("/inventory-item.html?id=4")')]);
        await expect(newPage).toHaveURL('/inventory-item.html?id=4');
        await expect(newPage.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
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

