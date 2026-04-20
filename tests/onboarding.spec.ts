import { test, expect } from '@playwright/test';

// Note: Clerk provides `@clerk/testing` to mock authentication states, or you can set
// cookies/tokens directly if testing against a staging environment.
// For these tests, we assume a setup fixture that logs in a user.

test.describe('Onboarding Flow', () => {
  // Use a beforeEach hook or a custom fixture to authenticate as a new UNASSIGNED user.
  test.beforeEach(async ({ page }) => {
    // Navigate to the onboarding page
    await page.goto('/onboarding');
  });

  test('Interviewer path', async ({ page }) => {
    // 1. Select the "I want to interview" option
    await page.getByRole('button', { name: /I want to interview/i }).click();

    // 2. Fill in the profile creation form
    await page.getByLabel(/Title/i).fill('Senior Software Engineer');
    await page.getByLabel(/Company/i).fill('Google');
    
    // Select Experience
    await page.locator('button').filter({ hasText: 'Experience' }).click();
    await page.getByRole('option', { name: '5-10 years' }).click();

    // Select Categories (Assuming these are toggle buttons or checkboxes)
    await page.getByRole('button', { name: 'Frontend' }).click();
    await page.getByRole('button', { name: 'Backend' }).click();
    await page.getByRole('button', { name: 'System Design' }).click();

    // Fill Bio
    await page.getByLabel(/Bio/i).fill('Passionate about system architecture and front-end performance.');

    // 3. Submit the form
    await page.getByRole('button', { name: /Complete Setup/i }).click();

    // 4. Verify redirect to the Dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
  });

  test('Interviewee path', async ({ page }) => {
    // 1. Select "I want to practice"
    await page.getByRole('button', { name: /I want to practice/i }).click();

    // 2. Click the submit button
    await page.getByRole('button', { name: /Go to dashboard/i }).click();

    // 3. Verify redirect to the Explore page
    await expect(page).toHaveURL(/.*\/explore/);
    await expect(page.getByRole('heading', { name: /Explore Interviewers/i })).toBeVisible();
  });
});
