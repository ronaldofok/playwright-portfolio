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
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        await expect(this.page).toHaveURL('/inventory.html');
    }

    async loginError(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
    }



    async checkError(expectedMessage: string) {
        await expect(this.error).toContainText(expectedMessage);
    }

}