# 🎭 Playwright QA Portfolio

A professional end-to-end and API test automation suite built with [Playwright](https://playwright.dev/) and TypeScript.

**Target application:** [Automation Exercise](https://automationexercise.com) — a purpose-built e-commerce demo site for QA practice.

> Built by **Andrei Ciorogar** — Senior QA Engineer with 12+ years in game development and software quality assurance.
> [LinkedIn](https://www.linkedin.com/in/andrei-ciorogar/) • [GitHub](https://github.com/criptic87)

---

## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & API testing |
| TypeScript | Type-safe test code |
| GitHub Actions | CI/CD pipeline (cross-browser, scheduled) |
| Page Object Model | Maintainable test architecture |
| Custom Fixtures | Reusable page object injection |

---

## 📁 Project Structure

```
playwright-qa-portfolio/
│
├── tests/
│   ├── e2e/                    # End-to-end UI tests
│   │   ├── home.spec.ts        # Home page & navigation
│   │   ├── auth.spec.ts        # Login & signup flows
│   │   ├── products.spec.ts    # Product listing & search
│   │   ├── cart.spec.ts        # Shopping cart behaviour
│   │   └── contact.spec.ts     # Contact form submission
│   │
│   └── api/
│       └── api.spec.ts         # REST API tests
│
├── pages/                      # Page Object Models (POM)
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── ContactPage.ts
│
├── fixtures/
│   └── pageFixtures.ts         # Custom Playwright fixtures
│
├── utils/
│   └── helpers.ts              # Shared test utilities
│
├── test-data/
│   └── testData.ts             # Centralised test data
│
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI pipeline
│
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## ✅ Test Coverage

### E2E Tests (~35 tests)

| Suite | Coverage |
|---|---|
| **Home** | Page load, navbar navigation, hero slider, newsletter subscription |
| **Auth** | Login validation, invalid credentials, signup, password masking |
| **Products** | Listing, search (valid/invalid), product detail, category filter, add to cart |
| **Cart** | Empty state, add item, quantity verification, item removal, checkout navigation |
| **Contact** | Form visibility, successful submission, email validation, post-submit navigation |

### API Tests (~12 tests)

| Endpoint | Method | Coverage |
|---|---|---|
| `/api/productsList` | GET | 200 response, data schema, field validation |
| `/api/productsList` | POST | 405 Method Not Allowed |
| `/api/brandsList` | GET | 200 response, brand schema |
| `/api/brandsList` | PUT | 405 Method Not Allowed |
| `/api/searchProduct` | POST | Valid search, empty param (400), results match term |
| `/api/searchProduct` | GET | 405 Method Not Allowed |

### Test Tags

Tests are tagged for selective execution:

- `@smoke` — Critical path tests; fast subset for quick confidence
- `@regression` — Full regression suite for thorough validation

---

## 🏃 Running the Tests

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/criptic87/playwright-qa-portfolio.git
cd playwright-qa-portfolio
npm install
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Specific Suites

```bash
# E2E only
npm run test:e2e

# API only
npm run test:api

# Smoke tests only (fast)
npm run test:smoke

# Full regression
npm run test:regression
```

### Run in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run with UI (Interactive Mode)

```bash
npm run test:ui
```

### View HTML Report

```bash
npm run report
```

---

## 🌐 Cross-Browser Coverage

The CI pipeline runs all tests across **5 configurations**:

| Project | Browser/Device |
|---|---|
| chromium | Desktop Chrome |
| firefox | Desktop Firefox |
| webkit | Desktop Safari |
| mobile-chrome | Pixel 5 (Android) |
| mobile-safari | iPhone 13 (iOS) |

---

## 🔄 CI/CD Pipeline

Tests run automatically on:
- Every **push** to `main` or `develop`
- Every **pull request** to `main`
- **Daily at 07:00 UTC** (scheduled regression)
- **Manual trigger** via GitHub Actions UI with optional tag filter

HTML reports and JSON results are uploaded as artifacts and retained for 14 days.

---

## 🏗️ Design Decisions

**Page Object Model (POM)**
All page interactions are encapsulated in dedicated Page classes. Tests never contain raw selectors — they only call meaningful methods like `loginPage.login(email, password)`. This means selector changes require updates in exactly one place.

**Custom Fixtures**
Page Objects are injected via Playwright's fixture system, eliminating repetitive setup code in every test file and making tests read like plain English.

**Centralised Test Data**
All test data lives in `test-data/testData.ts`. No magic strings scattered across test files — easy to update, easy to review.

**Tagged Tests**
`@smoke` and `@regression` tags allow the CI pipeline (or a developer) to run just the critical path quickly, or the full suite when needed. This mirrors real-world QA risk-based testing strategy.

**API + UI**
The suite deliberately covers both UI and API layers. Many QA suites only cover one — combining both demonstrates end-to-end quality thinking.

---

## 📬 Contact

**Andrei Ciorogar**
Senior QA Engineer | 12+ Years in Software & Game Quality Assurance

- 📧 andrei.ciorogar@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/andrei-ciorogar/)
- 🐙 [GitHub](https://github.com/criptic87)
