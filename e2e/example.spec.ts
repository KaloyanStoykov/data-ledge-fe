import { test, expect, Page } from '@playwright/test';

test('DataLedge Homepage Initialized', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle("DataLedge");
  await expect(page.getByText(/^Unify/)).toBeVisible();
});


test.describe('Authentication Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('cta-dashboard').click();
    await expect(page).toHaveURL(/.*login/);
  });

  async function fillLoginForm(page: Page, email: string, password: string) {
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByTestId('login-button').click();
  }

  test('Successful Login', async ({ page }) => {
    await fillLoginForm(page, 'email@email.com', 'test123');

    await expect(page).toHaveURL(/.*dashboard/);
    const welcomeHeading = page.getByTestId('dashboard-welcome-heading');
    await expect(welcomeHeading).toHaveText(/^ Welcome, Kaloyan/);
  });

  test('Failed Login shows Toast', async ({ page }) => {
    await fillLoginForm(page, 'email@email.com', 'wrongpass123');

    const toast = page.getByText('Invalid email or password');
    await expect(toast).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });
});

test.describe('Register Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('cta-dashboard').click();
    await expect(page).toHaveURL(/.*login/);
    await page.getByTestId('cta-signup').click();
    await expect(page).toHaveURL(/.*signup/);

  });

  async function fillSignUpForm(page: Page, name:string, email: string, password: string) {
    await page.getByPlaceholder('Name').fill(name);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByTestId('signup-button').click();
  }

  test('Successful Signup', async ({ page }) => {
    const randomEmail = `test-${Math.random()}@dataledge.com`;
    await fillSignUpForm(page, 'Boo', randomEmail, 'test123');

    await expect(page).toHaveURL(/.*login/);
  });

  // This test is safe because it uses an email that SHOULD already be in your seed data
  test('Unhappy flow Sign Up.', async ({ page }) => {
    await fillSignUpForm(page, 'Kal', 'email@email.com', 'wrongpass123');
    await expect(page.getByText('Email already exists!')).toBeVisible();
  });
})
