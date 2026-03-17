import { test, expect } from '../../fixtures/pageFixtures';
import { contactForm } from '../../test-data/testData';

/**
 * Contact Us Test Suite
 * Covers: form visibility, successful submission, required field validation,
 *         and post-submission navigation.
 */

test.describe('Contact Us', () => {

  test.beforeEach(async ({ contactPage }) => {
    await contactPage.goto();
    await contactPage.verifyPageLoaded();
  });

  test('should load contact page with all form fields @smoke', async ({ contactPage }) => {
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.subjectInput).toBeVisible();
    await expect(contactPage.messageInput).toBeVisible();
    await expect(contactPage.submitButton).toBeVisible();
  });

  test('should submit contact form successfully @smoke', async ({ contactPage }) => {
    await contactPage.fillContactForm(contactForm.valid);
    await contactPage.submitForm();
    await contactPage.verifySuccessMessage();
  });

  test('should return to home page after clicking Home button @regression', async ({ contactPage, page }) => {
    await contactPage.fillContactForm(contactForm.valid);
    await contactPage.submitForm();
    await contactPage.verifySuccessMessage();
    await contactPage.clickHomeButton();
    await expect(page).toHaveURL(/\//);
  });

  test('email field should only accept valid email format @regression', async ({ contactPage }) => {
    await contactPage.emailInput.fill('not-an-email');
    await contactPage.submitButton.click();
    // Browser native email validation kicks in
    const emailValidity = await contactPage.emailInput.evaluate(
      (el: HTMLInputElement) => el.validity.valid
    );
    expect(emailValidity).toBe(false);
  });

  test('all form fields should be editable @regression', async ({ contactPage }) => {
    await contactPage.nameInput.fill('Test Name');
    await contactPage.emailInput.fill('test@example.com');
    await contactPage.subjectInput.fill('Test Subject');
    await contactPage.messageInput.fill('Test message body');

    await expect(contactPage.nameInput).toHaveValue('Test Name');
    await expect(contactPage.emailInput).toHaveValue('test@example.com');
    await expect(contactPage.subjectInput).toHaveValue('Test Subject');
    await expect(contactPage.messageInput).toHaveValue('Test message body');
  });

  test('file upload input should be present on the form @regression', async ({ contactPage }) => {
    await expect(contactPage.fileInput).toBeVisible();
  });

});
