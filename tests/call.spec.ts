import { test, expect } from '@playwright/test';

test.describe('Call Room Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to appointments
    await page.goto('/appointments');
  });

  test('Join call and verify video & AI integration', async ({ page }) => {
    // 1. Find an upcoming booking and click "Join call"
    const joinCallButton = page.getByRole('link', { name: /Join call/i }).first();
    await joinCallButton.click();

    // 2. Verify redirect to /call/[callId]
    await expect(page).toHaveURL(/.*\/call\/.+/);

    // 3. Verify the video container renders
    // Stream Video UI typically renders specific containers
    await expect(page.locator('.str-video')).toBeVisible({ timeout: 15000 });
    
    // Check if camera/mic toggles are present
    await expect(page.getByRole('button', { name: /Toggle camera/i })).toBeVisible();

    // 4. Verify AI Question Generator widget is interactive
    const aiWidgetButton = page.getByRole('button', { name: /Generate Questions/i });
    await expect(aiWidgetButton).toBeVisible();
    
    await aiWidgetButton.click();
    
    // Wait for AI to stream/generate a question
    await expect(page.getByText(/Question:/i)).toBeVisible({ timeout: 10000 });
  });
});
