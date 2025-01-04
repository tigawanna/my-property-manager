import { pb } from "@/lib/pb/client";
import { test, expect, Page } from "@playwright/test";
async function testToolbar(page: Page) {
  await expect(page).toHaveTitle("My property manager");
  await expect(
    page.getByRole("link", { name: "My property manager" }),
  ).toBeVisible();
  await expect(
    page.locator('[data-test="theme-toggle"]').getByRole("button"),
  ).toBeVisible();
}
// Test group for navigation and auth flows
test.describe("Unauthenticated Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage without auth", async ({ page }) => {
    await testToolbar(page);
    await expect(
      page.locator('[data-test="homepage-section-welcome"]'),
    ).toHaveText("welcome");
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  });

  test("login flow - stranger 1", async ({ page }) => {
    await page.goto("/auth?returnTo=%2Fdashboard");
    const loginButton = page.getByRole("button", {
      name: "Login as stranger 1",
    });
    await loginButton.click();
    await expect(loginButton).toBeDisabled();
    await expect(page).toHaveURL("/dashboard");
  });

  test("protected routes redirect to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/auth?returnTo=%2Fdashboard");
  });
});

test.describe("Authenticated Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth?returnTo=%2F/");
    const loginButton = page.getByRole("button", {
      name: "Login as stranger 1",
    });
    await loginButton.click();
    await page.waitForSelector('[data-test="homepage"]');
  });
  test("homepage witha user logged in", async ({ page }) => {
    async function testToolbar(page: Page) {
      await expect(page).toHaveTitle("My property manager");
      await expect(
        page.getByRole("link", { name: "My property manager" }),
      ).toBeVisible();
      await expect(
        page.locator('[data-test="theme-toggle"]').getByRole("button"),
      ).toBeVisible();
    }
    await expect(page).toHaveTitle("My property manager");
    const homepageSectionWelcome = await page.locator(
      '[data-test="homepage-section-welcome"]',
    );
    await expect(homepageSectionWelcome).toBeVisible;
    await expect(homepageSectionWelcome).toHaveText("welcome stranger_one");

    //  proceed to dashboard link
    const homepageSectionLinks = await page.locator(
      '[data-test="homepage-section--dashboard-link"]',
    );
    await expect(homepageSectionLinks).toBeVisible;
    await expect(homepageSectionLinks).toHaveAttribute("href");
    await expect(homepageSectionLinks).toHaveText("Proceed to Dashboard");

    // go to user profile link
    const stranger1profileLink = await page.locator(
      '[data-test="homepage-section--profile-link"]',
    );
    await expect(stranger1profileLink).toBeVisible;
    await expect(stranger1profileLink).toHaveAttribute("href");
    await expect(stranger1profileLink).toHaveText("stranger_one");
  });

  // Your tests here
});
