import { chromium, type FullConfig } from '@playwright/test';
import dotenv from 'dotenv'; 
dotenv.config();

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(baseURL!);
    await page.fill('[data-test="username"]', process.env.SAUCE_USERNAME!);
    await page.fill('[data-test="password"]', process.env.SAUCE_PASSWORD!);
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;