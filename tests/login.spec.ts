import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from './data/users.json';

test.describe('Login Tests', () => {
    users.forEach(({ name, expected, password }) => {
    test(`testing with ${name}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginError(name, password);
        await loginPage.checkError(expected);
    });
});
});