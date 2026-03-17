/**
 * Centralised test data.
 * Using static test data for reliability; in a real project
 * this could be driven from a CSV, database, or faker library.
 */

export const users = {
  valid: {
    email: 'test.qa.portfolio@gmail.com',
    password: 'Test@12345',
    name: 'QA Portfolio User',
  },
  invalid: {
    email: 'invalid.user@notexist.com',
    password: 'WrongPassword99',
    name: 'Invalid User',
  },
  existingEmail: {
    email: 'already.registered@test.com',
    name: 'Existing User',
  },
};

export const contactForm = {
  valid: {
    name: 'Andrei QA Tester',
    email: 'andrei.test@qaportfolio.com',
    subject: 'QA Portfolio Test Submission',
    message: 'This is an automated test message sent by the Playwright QA portfolio suite.',
  },
};

export const searchTerms = {
  valid: 'top',
  noResults: 'xyzxyzxyz123notaproduct',
};

export const subscription = {
  validEmail: 'subscriber.test@qaportfolio.com',
};
