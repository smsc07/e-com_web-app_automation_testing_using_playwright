import { test } from '../../fixtures/testFixtures.ts';
import { expect } from '@playwright/test';
import { testData } from '../../test-data/testData';
import { takeScreenshot } from '../../helpers/screenshotHelper.ts';

test('Valid Login', {tag: '@smoke',}, async ({ loginPage, page }) => {
    
  await loginPage.navigate();
  await takeScreenshot(page, 'TS_Valid Login_Page Navigation');

  await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
  );     
  await expect(page).toHaveURL(/inventory/); // Assertion
  await takeScreenshot(page, 'TS_Valid Login_After Login');
});