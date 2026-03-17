import { test, expect } from '@playwright/test';

/**
 * API Test Suite — Automation Exercise API
 * Covers: product list endpoint, brands list, search API,
 *         POST/PUT/DELETE method restrictions (405 handling).
 *
 * Demonstrates API testing skills alongside UI automation.
 * Docs: https://automationexercise.com/api_list
 */

const BASE_URL = 'https://automationexercise.com';

test.describe('Products API', () => {

  test('GET /api/productsList should return 200 with product data @smoke', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/productsList`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('products');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('GET /api/productsList each product should have required fields @regression', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/productsList`);
    const body = await response.json();

    for (const product of body.products.slice(0, 5)) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    }
  });

  test('POST /api/productsList should return 405 Method Not Allowed @regression', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/productsList`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('not supported');
  });

  test('GET /api/brandsList should return 200 with brands @smoke', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/brandsList`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);
  });

  test('GET /api/brandsList each brand should have id and brand name @regression', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/brandsList`);
    const body = await response.json();

    for (const brand of body.brands.slice(0, 5)) {
      expect(brand).toHaveProperty('id');
      expect(brand).toHaveProperty('brand');
    }
  });

  test('PUT /api/brandsList should return 405 Method Not Allowed @regression', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/api/brandsList`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
  });

});

test.describe('Search API', () => {

  test('POST /api/searchProduct with valid term should return results @smoke', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/searchProduct`, {
      form: { search_product: 'top' },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body).toHaveProperty('products');
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST /api/searchProduct without search_product param should return 400 @regression', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/searchProduct`, {
      form: {},
    });
    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('Bad request');
  });

  test('GET /api/searchProduct should return 405 @regression', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/searchProduct`);
    const body = await response.json();
    expect(body.responseCode).toBe(405);
  });

  test('POST /api/searchProduct results should contain searched term @regression', async ({ request }) => {
    const searchTerm = 'jeans';
    const response = await request.post(`${BASE_URL}/api/searchProduct`, {
      form: { search_product: searchTerm },
    });
    const body = await response.json();

    if (body.products && body.products.length > 0) {
      const allMatch = body.products.every((p: { name: string }) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(allMatch).toBe(true);
    }
  });

});
