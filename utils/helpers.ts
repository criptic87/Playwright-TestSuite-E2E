import { Page } from '@playwright/test';

/**
 * Shared helper utilities used across test suites.
 * Keeps tests DRY and centralises common interactions.
 */

/**
 * Waits for a network response matching a URL pattern.
 * Useful for ensuring async operations complete before assertions.
 */
export async function waitForResponse(page: Page, urlPattern: string | RegExp) {
  return page.waitForResponse(
    (response) =>
      (typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url())) && response.status() === 200
  );
}

/**
 * Scrolls to the bottom of the page.
 * Useful for triggering lazy-loaded content or reaching footer elements.
 */
export async function scrollToBottom(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
}

/**
 * Scrolls to the top of the page.
 */
export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

/**
 * Generates a unique email address using a timestamp.
 * Used to avoid conflicts when creating new accounts in tests.
 */
export function generateUniqueEmail(prefix = 'testuser'): string {
  return `${prefix}+${Date.now()}@qaportfolio.com`;
}

/**
 * Dismisses a browser alert/confirm dialog automatically.
 * Call before triggering actions that open dialogs.
 */
export async function acceptDialog(page: Page) {
  page.once('dialog', (dialog) => dialog.accept());
}

/**
 * Dismisses a browser alert/confirm dialog automatically.
 */
export async function dismissDialog(page: Page) {
  page.once('dialog', (dialog) => dialog.dismiss());
}

/**
 * Takes a named screenshot and saves it to the test-results folder.
 * Useful for visual debugging during test development.
 */
export async function takeDebugScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `test-results/debug-${name}-${Date.now()}.png`,
    fullPage: true,
  });
}

/**
 * Retries an async function up to `maxAttempts` times.
 * Useful for flaky interactions that may need a moment to settle.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 500
): Promise<T> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxAttempts) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  throw lastError;
}
