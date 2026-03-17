import { test, expect } from '../../fixtures/pageFixtures';
import { users } from '../../test-data/testData';

/**
 * Authentication Test Suite
 * Covers: login form validation, invalid credentials,
 *         signup form visibility, and duplicate email handling.
 */

test.describe('Authentication', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should load login and signup forms @smoke', async ({ loginPage }) => {
    await loginPage.verifyPageLoaded();
  });

  test('should show error on invalid credentials @smoke', async ({ loginPage }) => {
    await loginPage.login(users.invalid.email, users.invalid.password);
    await loginPage.verifyLoginError();
  });

  test('should show error when logging in with empty email @regression', async ({ loginPage, page }) => {
    await loginPage.login('', users.invalid.password);
    // Browser native validation prevents submission
    const emailInput = page.locator('[data-qa="login-email"]');
    await expect(emailInput).toBeFocused();
  });

  test('should show error for already registered signup email @regression', async ({ loginPage }) => {
    await loginPage.signup(users.existingEmail.name, users.existingEmail.email);
    await loginPage.verifySignupEmailExistsError();
  });

  test('should redirect to home after successful login @smoke', async ({ loginPage, page }) => {
    await loginPage.login(users.valid.email, users.valid.password);
    // After valid login, user should NOT remain on /login
    await expect(page).not.toHaveURL(/login/);
  });

  test('login form should have visible email and password inputs @regression', async ({ loginPage }) => {
    await expect(loginPage.loginEmailInput).toBeVisible();
    await expect(loginPage.loginPasswordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('signup form should have visible name and email inputs @regression', async ({ loginPage }) => {
    await expect(loginPage.signupNameInput).toBeVisible();
    await expect(loginPage.signupEmailInput).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test('password field should mask input @regression', async ({ loginPage }) => {
    await expect(loginPage.loginPasswordInput).toHaveAttribute('type', 'password');
  });

});
