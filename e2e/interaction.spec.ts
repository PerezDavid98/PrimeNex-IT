import { test, expect } from "@playwright/test";

test("service tabs are operable by keyboard, not just by mouse", async ({
  page,
}, testInfo) => {
  // Arrow-key roving is a physical-keyboard behaviour. It is verified on the
  // desktop engines and on iPad; asserting it against an emulated phone with
  // no keyboard tests the emulator, not the site.
  test.skip(
    Boolean(testInfo.project.use.isMobile),
    "no physical keyboard on a touch-only device",
  );

  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  const tabs = page.locator('[role="tab"]');
  await expect(tabs).toHaveCount(4);

  // The markup arrives server-rendered, so the tabs exist before the keyboard
  // handlers do. Prove hydration by exercising a click first, otherwise the
  // first key press races the JavaScript under parallel load.
  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await tabs.first().click();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

  await tabs.first().focus();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

  // Roving tabindex: the group is one Tab stop and arrows move within it.
  await page.keyboard.press("ArrowDown");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("End");
  await expect(tabs.nth(3)).toBeFocused();

  await page.keyboard.press("Home");
  await expect(tabs.nth(0)).toBeFocused();

  // Wrapping, so the set has no dead end.
  await page.keyboard.press("ArrowUp");
  await expect(tabs.nth(3)).toBeFocused();

  const panel = page.locator('[role="tabpanel"]');
  await expect(panel).toHaveAttribute("aria-labelledby", "tab-3");
});

test("switching a tab does not replay an entrance animation", async ({ page }) => {
  await page.goto("/en");
  const panel = page.locator('[role="tabpanel"]');

  await page.locator('[role="tab"]').nth(2).click();

  // A repeated action must be instant: no animation may be running on the panel.
  const animating = await panel.evaluate(
    (el) => el.getAnimations({ subtree: true }).filter((a) => a.playState === "running").length,
  );
  expect(animating).toBe(0);
});

test("the objectives disclosure reports its state", async ({ page }) => {
  await page.goto("/en");

  const buttons = page.locator("#about button[aria-expanded]");
  await expect(buttons.first()).toHaveAttribute("aria-expanded", "true");

  await buttons.nth(2).click();
  await expect(buttons.nth(2)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.first()).toHaveAttribute("aria-expanded", "false");

  const id = await buttons.nth(2).getAttribute("aria-controls");
  await expect(page.locator(`#${id}`)).toHaveAttribute("data-open", "true");
});

test("the form reports each problem beside the field that caused it", async ({ page }) => {
  await page.goto("/en");
  await page.locator('form button[type="submit"]').click();

  // Six required fields, six messages, each wired to its own control.
  for (const name of ["name", "email", "organization", "role", "country", "message"]) {
    const field = page.locator(`[name="${name}"]`);
    await expect(field).toHaveAttribute("aria-invalid", "true");
    await expect(field).toHaveAttribute("aria-describedby", `e-${name}`);
    await expect(page.locator(`#e-${name}`)).toBeVisible();
  }

  // Focus lands on the first problem rather than leaving the user to hunt.
  await expect(page.locator('[name="name"]')).toBeFocused();

  // A malformed address is caught rather than posted.
  await page.locator('[name="email"]').fill("not-an-email");
  await page.locator('form button[type="submit"]').click();
  await expect(page.locator("#e-email")).toBeVisible();

  // And the message clears the moment the visitor starts fixing it.
  await page.locator('[name="name"]').fill("Ada Lovelace");
  await expect(page.locator("#e-name")).toHaveCount(0);
});

test("the country list is localised and sorted for the active language", async ({ page }) => {
  await page.goto("/es");
  const options = page.locator('select[name="country"] option');
  expect(await options.count()).toBeGreaterThan(200);

  // Stored as an ISO code so the inbox gets one unambiguous value whatever
  // language the visitor filled the form in.
  await expect(page.locator('select[name="country"] option[value="CR"]')).toHaveText("Costa Rica");

  await page.goto("/zh");
  await expect(page.locator('select[name="country"] option[value="CR"]')).toHaveText("哥斯达黎加");
});

test("the mobile drawer traps nothing and hides from the tab order when shut", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name.startsWith("desktop"), "drawer is mobile-only");

  await page.goto("/en");
  const drawer = page.locator("#mobile-nav");
  await expect(drawer).toHaveAttribute("aria-hidden", "true");

  const toggle = page.locator('button[aria-controls="mobile-nav"]');
  await toggle.click();
  await expect(drawer).toHaveAttribute("data-open", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await toggle.click();
  await expect(drawer).toHaveAttribute("aria-hidden", "true");
  // Links inside a closed drawer must not be reachable by Tab.
  expect(await drawer.locator("a").first().getAttribute("tabindex")).toBe("-1");
});

test("WhatsApp and LinkedIn point somewhere real", async ({ page }) => {
  await page.goto("/es");

  const wa = page.locator('.channel[data-channel="whatsapp"]');
  const href = await wa.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/50664857076\?text=/);
  // The prefilled message is translated with the rest of the page.
  expect(decodeURIComponent(href!)).toContain("PrimeNex IT");

  await expect(page.locator('.channel[data-channel="linkedin"]')).toHaveAttribute(
    "href",
    "https://www.linkedin.com/company/primenex-it",
  );
});
