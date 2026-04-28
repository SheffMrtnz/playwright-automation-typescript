import { test, expect } from '@playwright/test';
import { ProductPage } from '../Pages/ProductPage';

test('Flujo E2E: Compra exitosa con validación de impuestos y totales', async ({ page }) => {
    const productPage = new ProductPage(page);

    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await productPage.addFirstProduct();
    await productPage.goToCart();

    
    await page.locator('[data-test="checkout"]').click();

    
    await page.locator('[data-test="firstName"]').fill('Franco');
    await page.locator('[data-test="lastName"]').fill('QA');
    await page.locator('[data-test="postalCode"]').fill('1234');
    await page.locator('[data-test="continue"]').click();

    
    const taxElement = page.locator('.summary_tax_label');
    await expect(taxElement).toContainText('Tax: $');
    
    const totalElement = page.locator('.summary_total_label');
    console.log(`Validando monto total: ${await totalElement.innerText()}`);

    
    await page.locator('[data-test="finish"]').click();

   
    const header = page.locator('.complete-header');
    await expect(header).toHaveText('Thank you for your order!');

    
    await page.waitForTimeout(6000); 
});
