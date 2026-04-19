import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly title;
    readonly inventoryItemName;
    readonly itemPrice;
    readonly checkoutButton;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

    }
    
    async verifyPage(){
        await expect(this.title).toContainText('Your Cart');
    }
    
    async verifyProduct() {
        await expect(this.inventoryItemName).toContainText('Sauce Labs Backpack');
        await expect(this.itemPrice).toContainText('$29.99');
        await this.checkoutButton.click();
    }
}