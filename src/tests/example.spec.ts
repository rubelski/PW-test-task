import { test, expect } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();

test('has title', async ({ page }) => {
  await page.goto("https://support.glitch.com/");
  await expect(page).toHaveTitle(/Glitch Community Forum/);
});
