import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Home page.
 * Encapsulates all selectors and interactions for the home page.
 */
export class HomePage {
  readonly page: Page;
  readonly navbar: Locator;
  readonly logo: Locator;
  readonly navHome: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;
  readonly navSignup: Locator;
  readonly navLogin: Locator;
  readonly navContactUs: Locator;
  readonly featuredItems: Locator;
  readonly subscribeEmailInput: Locator;
  readonly subscribeButton: Locator;
  readonly subscribeSuccessAlert: Locator;
  readonly slider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = page.locator('#header .navbar-nav');
    this.logo = page.locator('#header .logo img');
    this.navHome = page.getByRole('link', { name: 'Home' });
    this.navProducts = page.getByRole('link', { name: ' Products' });
    this.navCart = page.getByRole('link', { name: ' Cart' });
    this.navSignup = page.getByRole('link', { name: ' Signup / Login' });
    this.navLogin = page.getByRole('link', { name: ' Signup / Login' });
    this.navContactUs = page.getByRole('link', { name: ' Contact us' });
    this.featuredItems = page.locator('.features_items .product-image-wrapper');
    this.subscribeEmailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.subscribeSuccessAlert = page.locator('#success-subscribe');
    this.slider = page.locator('#slider');
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.logo).toBeVisible();
    await expect(this.navbar).toBeVisible();
  }

  async navigateToProducts() {
    await this.navProducts.click();
    await this.page.waitForURL('**/products**');
  }

  async navigateToCart() {
    await this.navCart.click();
    await this.page.waitForURL('**/view_cart**');
  }

  async navigateToLogin() {
    await this.navLogin.click();
    await this.page.waitForURL('**/login**');
  }

  async navigateToContactUs() {
    await this.navContactUs.click();
    await this.page.waitForURL('**/contact_us**');
  }

  async subscribeWithEmail(email: string) {
    await this.subscribeEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.subscribeSuccessAlert).toBeVisible();
    await expect(this.subscribeSuccessAlert).toContainText('You have been successfully subscribed!');
  }

  async getFeaturedItemCount(): Promise<number> {
    return this.featuredItems.count();
  }
}
