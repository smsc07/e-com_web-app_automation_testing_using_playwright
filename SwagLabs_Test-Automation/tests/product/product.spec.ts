import { test, expect } from '../../fixtures/testFixtures';
import { testData } from '../../test-data/testData';
import { takeScreenshot, takeSnip } from '../../helpers/screenshotHelper';
import { assert } from 'console';

test('TC-003 - TC-007', async ({ loginPage, page }) => {

    await loginPage.navigate();
    await loginPage.login(
                testData.validUser.username,
                testData.validUser.password,
    );

    //TC-003
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="item-1-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="item-2-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="item-3-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="item-5-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="item-6-img-link"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-003 - ER1')

    //TC-004
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-004 - ER1')

    //TC-005
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-005 - ER1')

    //TC-006
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-006 - ER1')

    //TC-007
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-007 - ER1')

});


//ADD THESE TCs ABOVE


test('TC-008 - TC-000', async ({ loginPage, productPage, page }) => {

    await loginPage.navigate();
    await loginPage.login(
                testData.validUser.username,
                testData.validUser.password,
    );

    await productPage.navigateToProductsPage();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible;
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack""]').click;
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible;
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveClass('btn btn_seconda btn_small btn_inventory');

    await takeSnip(page.locator('[data-test="remove-sauce-labs-backpack"]'), 'TC-008 - ER1');
});

