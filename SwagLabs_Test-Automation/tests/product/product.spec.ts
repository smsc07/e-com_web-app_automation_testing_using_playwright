import { test } from '../../fixtures/testFixtures.ts';
import { expect } from '@playwright/test';
import { testData } from '../../test-data/testData';
import { takeScreenshot } from '../../helpers/screenshotHelper.ts';

test('TC-003', {tag: '@product',}, async ({ loginPage, productPage, page }) => {
    
    await loginPage.navigate();
    await loginPage.login(
                testData.validUser.username,
                testData.validUser.password
    );
    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-003 - ER1');

    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible;    
    await page.locator('[data-test="product-sort-container"]').click;
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible;
    await page.locator('[data-test="product-sort-container"]').hover;
    await takeScreenshot(page, 'TC-003 - STEP');
    await page.locator('[value="za"]').click;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);


});