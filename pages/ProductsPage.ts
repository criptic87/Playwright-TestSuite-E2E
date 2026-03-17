import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Products listing and detail pages.
 */
export class ProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResultsHeading: Locator;
  readonly productCards: Locator;
  readonly firstViewProductButton: Locator;
  readonly categoryWomen: Locator;
  readonly categoryMen: Locator;
  readonly categoryKids: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchResultsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productCards = page.locator('.features_items .product-image-wrapper');
    this.firstViewProductButton = page.locator('.choose a').first();
    this.categoryWomen = page.locator('a[href="#Women"]');
    this.categoryMen = page.locator('a[href="#Men"]');
    this.categoryKids = page.locator('a[href="#Kids"]');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async verifySearchResults(expectedTerm: string) {
    await expect(this.searchResultsHeading).toBeVisible();
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async viewFirstProduct() {
    await this.firstViewProductButton.click();
  }

  async addFirstProductToCart() {
    await this.productCards.first().locator('.add-to-cart').first().click();
  }

  async filterByCategory(category: 'Women' | 'Men' | 'Kids') {
    const locators = {
      Women: this.categoryWomen,
      Men: this.categoryMen,
      Kids: this.categoryKids,
    };
    await locators[category].click();
  }
}
