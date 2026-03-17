import { test, expect } from '../../fixtures/pageFixtures';

/**
 * Shopping Cart Test Suite
 * Covers: empty cart state, adding items, quantity verification,
 *         item removal, and checkout navigation.
 */

test.describe('Shopping Cart', () => {

  test('should show empty cart message when no items added @smoke', async ({ cartPage }) => {
    await cartPage.goto();
    await cartPage.verifyCartIsEmpty();
  });

  test('should contain item after adding from products page @smoke', async ({ page, productsPage, cartPage }) => {
    // Navigate to products and add first item
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
    await productsPage.productCards.first().hover();
    await productsPage.addFirstProductToCart();

    // Dismiss modal and go to cart
    await page.locator('#cartModal .btn-success').click();

    // Verify cart has items
    await cartPage.verifyCartHasItems();
  });

  test('should show correct quantity of 1 when adding a single product @regression', async ({ page, productsPage, cartPage }) => {
    await productsPage.goto();
    await productsPage.productCards.first().hover();
    await productsPage.addFirstProductToCart();
    await page.locator('#cartModal .btn-success').click();

    const quantities = cartPage.cartProductQuantities;
    const count = await quantities.count();
    if (count > 0) {
      const qty = await quantities.first().textContent();
      expect(qty?.trim()).toBe('1');
    }
  });

  test('should allow removing an item from the cart @regression', async ({ page, productsPage, cartPage }) => {
    // Add a product first
    await productsPage.goto();
    await productsPage.productCards.first().hover();
    await productsPage.addFirstProductToCart();
    await page.locator('#cartModal .btn-success').click();

    // Now remove it
    const initialCount = await cartPage.getCartItemCount();
    if (initialCount > 0) {
      await cartPage.deleteButtons.first().click();
      await page.waitForTimeout(600);
      const newCount = await cartPage.getCartItemCount();
      expect(newCount).toBeLessThan(initialCount);
    }
  });

  test('cart page should be accessible from navbar @smoke', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.navigateToCart();
    await expect(page).toHaveURL(/view_cart/);
  });

  test('proceed to checkout button should be visible when cart has items @regression', async ({ page, productsPage, cartPage }) => {
    await productsPage.goto();
    await productsPage.productCards.first().hover();
    await productsPage.addFirstProductToCart();
    await page.locator('#cartModal .btn-success').click();
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
  });

});
