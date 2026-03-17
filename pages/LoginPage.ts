import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Login / Signup page.
 */
export class LoginPage {
  readonly page: Page;

  // Login form
  readonly loginHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  // Signup form
  readonly signupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('p:has-text("Your email or password is incorrect!")');

    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('p:has-text("Email Address already exist!")');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async verifyPageLoaded() {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.signupHeading).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyLoginError() {
    await expect(this.loginErrorMessage).toBeVisible();
  }

  async verifySignupEmailExistsError() {
    await expect(this.signupErrorMessage).toBeVisible();
  }
}
