import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput;
    readonly passwordInput;
    readonly loginButton;
    readonly error;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.error = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');

    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async loginError(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
    }



    async checkErrorBlockedUsername() {
        await expect(this.error).toContainText('Epic sadface: Sorry, this user has been locked out.');
    }

    async checkErrorUsernameOrPassword() {
        await expect(this.error).toContainText('Epic sadface: Username and password do not match any user in this service');
    }

    async checkErrorEmpty() {
        await expect(this.error).toContainText('Epic sadface: Username is required');
    }
}