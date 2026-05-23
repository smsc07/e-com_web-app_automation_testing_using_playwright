import { Page } from '@playwright/test';
//import { test } from '../fixtures/testFixtures.ts';
import { testData } from '../test-data/testData';

export class ProductPage{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    // Locators
    productItems = '[data-test="inventory-item"]';

    async getProductCount(): Promise<number> {
        return await this.page.locator(this.productItems).count();
    }

    async navigateToProductsPage() {
        return await this.page.goto(testData.base_url + '/inventory.html')
    }

}
