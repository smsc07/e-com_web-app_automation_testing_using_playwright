import { test, expect } from '../../fixtures/testFixtures';
import { testData } from '../../test-data/testData';
import { takeScreenshot, takeSnip } from '../../helpers/screenshotHelper';

test('TC-001', {tag: '@smoke'}, async ({ loginPage, page }) => {
  await loginPage.navigate();
  await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
  );
  //Expected Result:     
  await expect(page).toHaveURL(/inventory/);
  await takeScreenshot(page, 'TC-001 - ER1');
  await takeSnip(page.locator('[data-test="title"]'), 'TC-001 - ER2');
});

test('TC-002', {tag: '@login'}, async ({ loginPage, page }) => {
  await loginPage.navigate();
  await loginPage.login(
            testData.lockedOutUser.username,
            testData.lockedOutUser.password
  );     
  //Expected Result:    
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await takeScreenshot(page, 'TC-002 - ER1');
  await takeSnip(page.locator('[data-test="error"]'), 'TC-002 - ER2');
});