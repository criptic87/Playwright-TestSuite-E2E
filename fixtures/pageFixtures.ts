import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ContactPage } from '../pages/ContactPage';

/**
 * Custom fixture extending Playwright's base test.
 * Provides pre-instantiated Page Objects to all tests,
 * eliminating boilerplate and ensuring consistency.
 */
type PageObjects = {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  contactPage: ContactPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from '@playwright/test';
