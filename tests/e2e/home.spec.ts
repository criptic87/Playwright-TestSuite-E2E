import { test, expect } from '../../fixtures/pageFixtures';
import { subscription } from '../../test-data/testData';

/**
 * Home Page Test Suite
 * Covers: page load, navigation, hero slider visibility, newsletter subscription.
 * Tags: @smoke for critical path, @regression for full suite.
 */

test.describe('Home Page', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should load with correct title and visible navbar @smoke', async ({ homePage }) => {
    await homePage.verifyPageLoaded();
  });

  test('should display featured products on home page @smoke', async ({ homePage }) => {
    const count = await homePage.getFeaturedItemCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to Products page from navbar @smoke', async ({ homePage, page }) => {
    await homePage.navigateToProducts();
    await expect(page).toHaveURL(/products/);
  });

  test('should navigate to Cart page from navbar @regression', async ({ homePage, page }) => {
    await homePage.navigateToCart();
    await expect(page).toHaveURL(/view_cart/);
  });

  test('should navigate to Login page from navbar @regression', async ({ homePage, page }) => {
    await homePage.navigateToLogin();
    await expect(page).toHaveURL(/login/);
  });

  test('should navigate to Contact Us page from navbar @regression', async ({ homePage, page }) => {
    await homePage.navigateToContactUs();
    await expect(page).toHaveURL(/contact_us/);
  });

  test('should successfully subscribe with a valid email @regression', async ({ homePage }) => {
    await homePage.subscribeWithEmail(subscription.validEmail);
    await homePage.verifySubscriptionSuccess();
  });

  test('should have a visible hero slider @regression', async ({ homePage }) => {
    await expect(homePage.slider).toBeVisible();
  });

});
