import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login con usuario bloqueado', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginError('locked_out_user', 'secret_sauce');
    await loginPage.checkErrorBlockedUsername();


});

test('login contraseña incorrecta', async ({ page }) => {

   const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginError('standard_user ', 'wrong_password');
    await loginPage.checkErrorUsernameOrPassword();


});

test('login campos vacios', async ({ page }) => {
    const loginPage = new LoginPage(page);

   await loginPage.goto();
    await loginPage.loginError('', ' ');
    await loginPage.checkErrorEmpty();
});

