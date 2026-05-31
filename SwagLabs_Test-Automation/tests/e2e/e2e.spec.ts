import { test, expect } from '../../fixtures/testFixtures';
import { testData } from '../../test-data/testData';
import { takeScreenshot, takeSnip } from '../../helpers/screenshotHelper';

test('E2E-001', async ({ loginPage, productPage, cartPage, page }) => {

    //onboarding
    await loginPage.navigate();
    await loginPage.login(
                testData.validUser.username,
                testData.validUser.password,
    );

    //assert product page
    await productPage.navigateToProductsPage();
    await expect(productPage.inventoryList).toBeVisible();
    await expect(productPage.inventoryItem).toHaveCount(6);
    await productPage.itemImagesVisibilityCheck();
    await productPage.itemDesCountAndVisibilityCheck();
    await takeScreenshot(page, 'E2E-001 - ER1');

    //add item 1
    await productPage.addItem('[data-test="add-to-cart-sauce-labs-backpack"]',
        '[data-test="remove-sauce-labs-backpack"]');
    //add item 2
    await productPage.addItem('[data-test="add-to-cart-sauce-labs-onesie"]',
        '[data-test="remove-sauce-labs-onesie"]');
    //add item 3
    await productPage.addItem('[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        '[data-test="remove-sauce-labs-fleece-jacket"]');
    await takeScreenshot(page, 'E2E-001 - ER2');


    await productPage.countShoppingCartItem();
    await takeScreenshot(page, 'E2E-001 - ER3');

    //ER-4-Work in Progress




    //After Testing
    await productPage.deleteItemsOnCart();
});