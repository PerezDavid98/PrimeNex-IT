import { test, expect } from "@playwright/test";

/**
 * The service tabs are gone: all four practices are laid out in full, so there
 * is no tablist to operate and no panel to keep from re-animating. What
 * replaces those two tests is the assertion that every practice and every one
 * of its items is actually present in the document.
 */
test("all four practices are on the page, not hidden behind a control", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator('[role="tab"]')).toHaveCount(0);

  const practices = page.locator("#services article");
  await expect(practices).toHaveCount(4);

  // Three items under each, twelve services stated outright.
  await expect(page.locator("#services article dt")).toHaveCount(12);

  for (const tab of ["Dynamics 365", "Salesforce", "ERP & supply chain", "Data & integrations"]) {
    await expect(page.locator(`#services h3:has-text("${tab}")`)).toHaveCount(1);
  }
});

test("the technology board lists every group from the CV", async ({ page }) => {
  await page.goto("/en");

  // Every technology the CV declares, grouped.
  expect(await page.locator(".mark").count()).toBeGreaterThanOrEqual(40);
  await expect(page.locator(".t-mono.text-ink-mid")).toHaveCount(5);
  // Exact, because the section label also contains the word "Platforms".
  await expect(page.getByText("Platforms", { exact: true })).toHaveCount(1);
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
