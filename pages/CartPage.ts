import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Shopping Cart page.
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartTable: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly cartProductNames: Locator;
  readonly cartProductPrices: Locator;
  readonly cartProductQuantities: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartTable = page.locator('#cart_info_table');
    this.proceedToCheckoutButton = page.locator('.check_out');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.cartProductNames = page.locator('.cart_description h4 a');
    this.cartProductPrices = page.locator('.cart_price p');
    this.cartProductQuantities = page.locator('.cart_quantity button');
    this.deleteButtons = page.locator('.cart_delete a');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async verifyCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async verifyCartHasItems() {
    await expect(this.cartTable).toBeVisible();
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async verifyProductInCart(productName: string) {
    const names = this.cartProductNames;
    const count = await names.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const text = await names.nth(i).textContent();
      if (text?.includes(productName)) {
        found = true;
        break;
      }
    }
    expect(found, `Product "${productName}" should be in cart`).toBe(true);
  }

  async removeFirstItem() {
    const initialCount = await this.getCartItemCount();
    await this.deleteButtons.first().click();
    await this.page.waitForTimeout(500);
    const newCount = await this.getCartItemCount();
    expect(newCount).toBe(initialCount - 1);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
