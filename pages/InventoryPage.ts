import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly primaryHeader;
    readonly backpackTitle;
    readonly inventoryList;
    readonly addBackpackToCart;
    readonly cartLink;
    readonly selector;
    readonly firstProductTitle;
    readonly firstProductPrice;

    constructor(page: Page) {
        this.page = page;
        this.primaryHeader = page.locator('[data-test="primary-header"]');
        this.backpackTitle = page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.addBackpackToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.selector = page.locator('[data-test="product-sort-container"]');
        this.firstProductTitle = page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-name"]');
        this.firstProductPrice = page.locator('[data-test="inventory-item"]').first().locator('[data-test="inventory-item-price"]');
    }

    async verifyHeader() {
        await expect(this.primaryHeader).toContainText('Swag Labs');
    }

    async verifyProductOrder() {
        await expect(this.selector).toBeVisible();
        await this.selector.selectOption('hilo');
        await expect(this.firstProductTitle).toContainText('Sauce Labs Fleece Jacket');
        await expect(this.firstProductTitle).toContainText('Sauce Labs Fleece Jacket');
        await expect(this.firstProductPrice).toContainText('$49.99');
    }

    async openFirstProductNewTab() {
        const [newPage] = await Promise.all([this.page.context().waitForEvent('page'), this.page.evaluate('window.open("/inventory-item.html?id=4")')]);
        await newPage.waitForLoadState('domcontentloaded');
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

