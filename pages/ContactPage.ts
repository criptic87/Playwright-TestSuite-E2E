import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';

/**
 * Page Object Model for the Contact Us page.
 */
export class ContactPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Get In Touch' });
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.fileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert.alert-success');
    this.homeButton = page.locator('#form-section a.btn');
  }

  async goto() {
    await this.page.goto('/contact_us');
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async submitForm() {
    // Handle the browser dialog that appears on submit
    this.page.on('dialog', dialog => dialog.accept());
    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
  }

  async clickHomeButton() {
    await this.homeButton.click();
    await this.page.waitForURL('**/');
  }
}
