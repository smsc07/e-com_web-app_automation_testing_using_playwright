import { test, expect } from '../../fixtures/testFixtures';
import { testData } from '../../test-data/testData';
import { takeScreenshot, takeSnip } from '../../helpers/screenshotHelper';

test('TC-003 - TC-011', async ({ loginPage, productPage, cartPage, page }) => {

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
    await takeScreenshot(page, 'TC-003 - ER1');

    //TC-004
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-004 - ER1');

    //TC-005
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-005 - ER1');

    //TC-006
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-006 - ER1');

    //TC-007
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
    await expect(page.locator('[data-test="inventory-item"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_img"]')).toBeVisible;
    await expect(page.locator('[data-test="inventory-item_description"]')).toBeVisible;
    await takeScreenshot(page, 'TC-007 - ER1')

    //TC-008
    await productPage.navigateToProductsPage();
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveClass('btn btn_secondary btn_small btn_inventory ');
    await takeScreenshot(page, 'TC-008 - ER1');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await takeScreenshot(page, 'TC-008 - ER2');
    await cartPage.navigateToCartPage();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await takeScreenshot(page, 'TC-008 - ER3');

    //TC-009
    await productPage.navigateToProductsPage();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await takeScreenshot(page, 'TC-009 - ER1');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
    await takeScreenshot(page, 'TC-009 - ER2');
    await cartPage.navigateToCartPage();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeHidden();
    await takeScreenshot(page, 'TC-009 - ER3');

    //TC-010
    //Add Item 1
    await productPage.navigateToProductsPage();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveClass('btn btn_secondary btn_small btn_inventory ');
    //Add Item 2
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toHaveClass('btn btn_secondary btn_small btn_inventory ');
    await takeScreenshot(page, 'TC-010 - ER1');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
    await takeScreenshot(page, 'TC-010 - ER2');
    await cartPage.navigateToCartPage();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.locator('[data-test="item-2-title-link"]')).toBeVisible();
    await takeScreenshot(page, 'TC-010 - ER3');

    //TC-011
    await productPage.navigateToProductsPage();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toBeVisible();
    //Remove Items 1
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    //Remove Item 2
    await page.locator('[data-test="remove-sauce-labs-onesie"]').click();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-onesie"]')).toBeVisible();
    await takeScreenshot(page, 'TC-011 - ER1');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden();
    await takeScreenshot(page, 'TC-011 - ER2');
    await cartPage.navigateToCartPage();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeHidden();
    await expect(page.locator('[data-test="item-2-title-link"]')).toBeHidden();
    await takeScreenshot(page, 'TC-011 - ER3');

});

