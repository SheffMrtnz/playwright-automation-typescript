import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    
    async addFirstProduct() {
        await this.page.locator('button:has-text("Add to cart")').first().click();
    }

    
    async goToCart() {
        await this.cartIcon.click();
    }

    
    async resetAppState() {
        await this.page.locator('#react-burger-menu-btn').click();
        await this.page.locator('#reset_sidebar_link').click();
        await this.page.locator('#react-burger-cross-btn').click();
    }
}
