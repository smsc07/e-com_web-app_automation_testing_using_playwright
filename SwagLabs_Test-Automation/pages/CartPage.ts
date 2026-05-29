import { Page } from '@playwright/test';
import { testData } from '../test-data/testData';

export class CartPage{

    private page: Page;
    private btnLocator = "";

    constructor(page:Page){
        this.page = page;
    }

    async navigateToCartPage() {
        return await this.page.goto(testData.base_url + '/cart.html')
    }


}