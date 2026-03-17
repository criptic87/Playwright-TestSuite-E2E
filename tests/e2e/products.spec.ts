import { test, expect } from '../../fixtures/pageFixtures';
import { searchTerms } from '../../test-data/testData';

/**
 * Products Test Suite
 * Covers: product listing, search functionality, product detail view,
 *         category filtering, and add-to-cart flows.
 */

test.describe('Products', () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test('should display all products on listing page @smoke', async ({ productsPage }) => {
    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should return results for a valid search term @smoke', async ({ productsPage }) => {
    await productsPage.searchProduct(searchTerms.valid);
    await productsPage.verifySearchResults(searchTerms.valid);
  });

  test('should show no results for an invalid search term @regression', async ({ productsPage, page }) => {
    await productsPage.searchProduct(searchTerms.noResults);
    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    const count = await productsPage.getProductCount();
    expect(count).toBe(0);
  });

  test('should navigate to product detail page @regression', async ({ productsPage, page }) => {
    await productsPage.viewFirstProduct();
    await expect(page).toHaveURL(/product_details/);
  });

  test('product detail page should show name, price and description @regression', async ({ productsPage, page }) => {
    await productsPage.viewFirstProduct();
    await expect(page.locator('.product-information h2')).toBeVisible();
    await expect(page.locator('.product-information span span')).toBeVisible();
    await expect(page.locator('.product-information p').first()).toBeVisible();
  });

  test('should show Women category products @regression', async ({ productsPage, page }) => {
    await productsPage.filterByCategory('Women');
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('should show Men category products @regression', async ({ productsPage, page }) => {
    await productsPage.filterByCategory('Men');
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('search input should be visible and interactive @smoke', async ({ productsPage }) => {
    await expect(productsPage.searchInput).toBeVisible();
    await expect(productsPage.searchButton).toBeVisible();
    await productsPage.searchInput.fill('test');
    await expect(productsPage.searchInput).toHaveValue('test');
  });

  test('should add a product to cart from listing @regression', async ({ productsPage, page }) => {
    // Hover over first product to reveal Add to Cart button
    await productsPage.productCards.first().hover();
    await productsPage.addFirstProductToCart();
    // Modal should appear confirming the item was added
    const modal = page.locator('#cartModal');
    await expect(modal).toBeVisible();
  });

});
