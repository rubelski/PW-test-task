import { chromium } from "@playwright/test";
import * as dotenv from 'dotenv';

async function globalSetup() {
    dotenv.config();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://support.glitch.com/");
    await page.locator("button[class*='btn-icon-text'] span").click();
    await page.click('button:has-text("Log in with GitHub")')
    await page.fill('input#login_field', process.env.GLITCH_USERNAME ||'');
    await page.fill('input#password', process.env.GLITCH_PASSWORD || '');
    await page.locator("input[type='submit']").click();
    //Button is not always displayed in headless mode so added condition for improvement of test stability
    const isButtonVisible = await page.isVisible('button:has-text("Authorize glitchdotcom")');
        await page.click('button:has-text("Authorize glitchdotcom")');
    await page.locator('#toggle-current-user img.avatar').waitFor({ state: 'visible', timeout: 20000 });
    await page.context().storageState({ path: "./src/auth_setup/auth_state.json" });
    await browser.close();
}

export default globalSetup;
