import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/Cart';
import { ShippingData } from '../pages/ShippingData';
import { CheckoutOverview } from '../pages/CheckoutOverview';
import { OrderPlaced } from '../pages/OrderPlaced';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyHeader();
    
});


test('checkout completo de un producto con verificacion de precios', async ({ page }) => {

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // Products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyBackpack();
    await inventoryPage.addBackpackAndGoToCart();

});

test('verificacion de la correcta funcionalidad de cart', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyBackpack();
    await inventoryPage.addBackpackAndGoToCart();

    // Cart
    const cartPage = new CartPage(page);
    await cartPage.verifyPage();
    await cartPage.verifyProduct();

});

test('verificacion shipping data', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyBackpack();
    await inventoryPage.addBackpackAndGoToCart();

    // Cart
    const cartPage = new CartPage(page);
    await cartPage.verifyPage();
    await cartPage.verifyProduct();


    //Fill shipping data

    const shippingData = new ShippingData(page);
    await shippingData.fillShippingData();

});


test('verificacion checkout overview', async ({ page }) => {

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyBackpack();
    await inventoryPage.addBackpackAndGoToCart();

    // Cart
    const cartPage = new CartPage(page);
    await cartPage.verifyPage();
    await cartPage.verifyProduct();


    //Fill shipping data

    const shippingData = new ShippingData(page);
    await shippingData.fillShippingData();


    const checkoutOverviewCheck = new CheckoutOverview(page);
    await checkoutOverviewCheck.checkoutOverviewCheck();

    // Order placed
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
});


test('verificacion oreder placed', async ({ page }) => {

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Products
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyBackpack();
    await inventoryPage.addBackpackAndGoToCart();

    // Cart
    const cartPage = new CartPage(page);
    await cartPage.verifyPage();
    await cartPage.verifyProduct();


    //Fill shipping data

    const shippingData = new ShippingData(page);
    await shippingData.fillShippingData();


    const checkoutOverviewCheck = new CheckoutOverview(page);
    await checkoutOverviewCheck.checkoutOverviewCheck();


    const orderPlaced = new OrderPlaced(page);
    await orderPlaced.orderPlaced();

});