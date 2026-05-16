import { test } from '../../fixtures/testFixtures.ts';
import { expect } from '@playwright/test';
import { testData } from '../../test-data/testData';
import { takeScreenshot } from '../../helpers/screenshotHelper.ts';

test('TC-001', {tag: '@smoke',}, async ({ loginPage, page }) => {
  await loginPage.navigate();
  await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
  );
  //Expected Result:     
  await expect(page).toHaveURL(/inventory/);
  await takeScreenshot(page, 'TC-001 - ER1');
  //Add another expected result. -> 'Products' page is visible
});

test('TC-002', {tag: '@login',}, async ({ loginPage, page }) => {
  await loginPage.navigate();
  await loginPage.login(
            testData.lockedOutUser.username,
            testData.lockedOutUser.password
  );     
  //Expected Result:
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await takeScreenshot(page, 'TC-002 - ER1');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await takeScreenshot(page, 'TC-002 - ER2');
});