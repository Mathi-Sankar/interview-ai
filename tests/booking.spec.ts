import { test, expect } from '@playwright/test';

test.describe('Explore & Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to explore as an Interviewee
    await page.goto('/explore');
  });

  test('Search, Filter and Book a session', async ({ page }) => {
    // 1. Verify a list of interviewers is visible
    const interviewerCards = page.locator('.interviewer-card'); // Assumed class or data-testid
    // Fallback: check if standard text is visible
    await expect(page.getByText('View profile').first()).toBeVisible();

    // 2. Test Category Filters (Frontend)
    await page.getByRole('button', { name: 'Frontend' }).click();
    
    // 3. Search for an interviewer by name
    await page.getByPlaceholder(/Search/i).fill('Test Interviewer');
    await page.waitForTimeout(500); // Wait for debounce or network

    // 4. Click "View profile ->"
    await page.getByRole('link', { name: /View profile/i }).first().click();

    // 5. Verify redirection to /interviewers/[id]
    await expect(page).toHaveURL(/.*\/interviewers\/.+/);

    // 6. Slot selection and Booking
    // Select an available date/time slot from the SlotPicker
    // Assume slots are buttons with times on them
    const slotButton = page.locator('button').filter({ hasText: 'AM' }).first();
    await slotButton.click();

    // Click "Book Session"
    await page.getByRole('button', { name: /Book Session/i }).click();

    // Confirm booking in modal if exists
    const confirmButton = page.getByRole('button', { name: /Confirm/i });
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }

    // Verify redirection to /appointments or success state
    await expect(page).toHaveURL(/.*\/appointments/);
    await expect(page.getByText(/Session booked successfully/i)).toBeVisible();
  });
});
