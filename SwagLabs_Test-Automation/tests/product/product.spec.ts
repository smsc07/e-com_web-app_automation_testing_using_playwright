import { test } from '../../fixtures/testFixtures.ts';
import { expect } from '@playwright/test';
import { testData } from '../../test-data/testData';


test('Count all the product', {tag: '@product',}, async ({ loginPage, productPage, page }) => {
    
    await loginPage.navigate();
    await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
    );
    await expect(page).toHaveURL(/inventory/); // Assertion

    console.log(await productPage.getProductCount());

});
