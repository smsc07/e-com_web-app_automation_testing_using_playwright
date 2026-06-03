import { test, expect } from '../../fixtures/testFixtures';
import { testData } from '../../test-data/testData';
import { takeScreenshot, takeSnip } from '../../helpers/screenshotHelper';

test('E2E-001', async ({ loginPage, productPage, cartPage, checkoutPage, page }) => {

    //onboarding
    await loginPage.navigate();
    await loginPage.login(
                testData.validUser.username,
                testData.validUser.password,
    );


    await productPage.navigateToProductsPage();
    await expect(productPage.inventoryList).toBeVisible();
    await expect(productPage.inventoryItem).toHaveCount(6);
    await productPage.itemImagesVisibilityCheck();
    await productPage.itemDesCountAndVisibilityCheck();
    await takeScreenshot(page, 'E2E-001 - ER1');


    await productPage.addItem('Sauce Labs Backpack','[data-test="add-to-cart-sauce-labs-backpack"]',
        '[data-test="remove-sauce-labs-backpack"]');
    await productPage.addItem('Sauce Labs Onesie','[data-test="add-to-cart-sauce-labs-onesie"]',
        '[data-test="remove-sauce-labs-onesie"]');
    await productPage.addItem('Sauce Labs Fleece Jacket','[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        '[data-test="remove-sauce-labs-fleece-jacket"]');
    await productPage.countShoppingCartItem();
    await takeScreenshot(page, 'E2E-001 - ER2');


    await productPage.navigateToYourCartPage();
    await cartPage.checkItemsAddedToCart(productPage.addedItems);
    await takeScreenshot(page, 'E2E-001 - ER3');


    await cartPage.navigateToCheckoutPage();
    await checkoutPage.fillOutInformationForm();
    await takeScreenshot(page, 'E2E-001 - ER4');

    //E2E-001 - ER5 Work In Progress
    await checkoutPage.navigateToCheckoutOverviewPage();
    await checkoutPage.checkItemsListedOnCheckoutOverview(productPage.addedItems);
    await checkoutPage.verifyCheckOutInformation();
    await checkoutPage.verifyComputedItemTotal();
    // await checkoutPage.verifyTax();
    // await checkoutPage.verifyTotal();
    await takeScreenshot(page, 'E2E-001 - ER5');

    //After Testing
    await productPage.deleteItemsOnCart();
});