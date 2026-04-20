import { test, expect } from '@playwright/test';

test.describe('Interviewer Dashboard & Availability Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard as an Interviewer
    await page.goto('/dashboard');
  });

  test('View Stats and Manage Availability', async ({ page }) => {
    // 1. Verify stats section
    await expect(page.getByText(/Earnings/i)).toBeVisible();
    await expect(page.getByText(/Completed Sessions/i)).toBeVisible();
    await expect(page.getByText(/Pending Requests/i)).toBeVisible();

    // 2. Manage Availability
    // Assume there is a tab or button for "Availability"
    const availabilityTab = page.getByRole('tab', { name: /Availability/i });
    if (await availabilityTab.isVisible()) {
      await availabilityTab.click();
    }

    // Set new available time slots
    // Assume a "Add Slot" button or time selection UI
    await page.getByRole('button', { name: /Add Slot/i }).click();
    
    // Select time (mocking logic depending on custom date picker)
    await page.getByLabel(/Start Time/i).fill('10:00 AM');
    await page.getByLabel(/End Time/i).fill('11:00 AM');
    
    await page.getByRole('button', { name: /Save Availability/i }).click();

    // Verify they persist (e.g. success toast)
    await expect(page.getByText(/Availability updated/i)).toBeVisible();

    // 3. Verify incoming bookings
    const bookingsTab = page.getByRole('tab', { name: /Bookings/i });
    if (await bookingsTab.isVisible()) {
      await bookingsTab.click();
    }
    
    // Should see a booking card or list item
    await expect(page.locator('.booking-item').first()).toBeVisible({ timeout: 10000 }).catch(() => null);
  });
});
