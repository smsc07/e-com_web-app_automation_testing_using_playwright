import {test as base, expect } from '@playwright/test'; //Renaming test to base because of new test u will create
import { LoginPage } from '../pages/LoginPage'; //Bringing in your Page Objects (How to interact)
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';



//My test will have a Fixture called loginPage and its type is LoginPage
type MyFixtures = {
    
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
    
};

//PW already has a default 'test' but only knows page and browser so we will inherit and add to it. 'export' is needed because other files need access to this. 
export const test = base.extend<MyFixtures>({ 

    loginPage: async ({ page }, use) => { // "page" is a built-in fixture - "use" is telling this is the value I want to pass to PW's test
        const loginPage = new LoginPage(page); //Creating page as an object and passing "page".
        await use(loginPage);
    },

    productPage: async ({ page }, use) =>{
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    cartPage: async ({ page }, use) =>{
        const cartPage = new CartPage(page);
        await use(cartPage);
    }

});

export { expect } from '@playwright/test';



