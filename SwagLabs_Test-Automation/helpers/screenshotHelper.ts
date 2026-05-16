import { Page } from '@playwright/test';
import { testData } from '../test-data/testData';
import path from 'path';
import { getFormattedDateTime } from '../utils/dateTime';

export async function takeScreenshot(page: Page, name: string){
    const dir = testData.screenshot_path ?? 'screenshots'; //Secure path from env
    const filePath = path.join(dir, `${name}_`+getFormattedDateTime()+`.png`);

    await page.screenshot({ path:filePath, fullPage:true});
}