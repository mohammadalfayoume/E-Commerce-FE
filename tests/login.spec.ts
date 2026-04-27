import { test, expect } from '@playwright/test';

const API_URL = 'https://localhost:44302/api';
const TEST_EMAIL = 'e2e-login@test.com';
const TEST_PASSWORD = 'Test1234!';

test.describe('Login page', () => {
  test.beforeAll(async ({ request }) => {
    // Register once; ignore 4xx if the account already exists from a prior run.
    // ignoreHTTPSErrors must be specified per-call for the request fixture;
    // the global config option only covers browser navigation.
    await request.post(`${API_URL}/auth/register`, {
      ignoreHTTPSErrors: true,
      data: { email: TEST_EMAIL, password: TEST_PASSWORD },
      failOnStatusCode: false,
    });
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  // ── Client-side validation ──────────────────────────────────────────────

  test('shows required errors when form is submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.locator('.error-hint').first()).toContainText('Email is required.');
    await expect(page.locator('.error-hint').last()).toContainText('Password is required.');
  });

  test('shows invalid email error for bad email format', async ({ page }) => {
    await page.locator('#email').fill('notanemail');
    await page.locator('#password').fill('somepassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.locator('.error-hint')).toContainText('Enter a valid email address.');
  });

  test('shows minlength error for password shorter than 6 characters', async ({ page }) => {
    await page.locator('#email').fill('user@example.com');
    await page.locator('#password').fill('abc');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.locator('.error-hint')).toContainText('Minimum 6 characters.');
  });

  test('does not show errors before the user touches a field', async ({ page }) => {
    await expect(page.locator('.error-hint')).not.toBeVisible();
  });

  // ── Invalid credentials (server error) ─────────────────────────────────

  test('shows API error for wrong credentials', async ({ page }) => {
    await page.locator('#email').fill('wrong@example.com');
    await page.locator('#password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.locator('.alert-error')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('.alert-error')).toContainText('Invalid email or password.');
  });

  // ── Valid credentials ───────────────────────────────────────────────────

  test('redirects to home on successful login', async ({ page }) => {
    await page.locator('#email').fill(TEST_EMAIL);
    await page.locator('#password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).not.toHaveURL('/auth/login', { timeout: 10000 });
    await expect(page).toHaveURL('/');
  });
});
