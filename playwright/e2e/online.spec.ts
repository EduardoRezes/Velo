import { test, expect } from '@playwright/test';

test('Should check if the landing page is loaded', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle('Velô by Papito');
});