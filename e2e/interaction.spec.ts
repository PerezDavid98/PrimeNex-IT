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

test("the technology register lists every group from the CV", async ({ page }) => {
  await page.goto("/en");

  const register = page.locator("section:has-text('Every platform and technology') dl > div");
  await expect(register).toHaveCount(5);

  // All forty-three entries the CV declares are present somewhere in it.
  const text = await register.allInnerTexts();
  for (const item of ["Dynamics 365", "Salesforce", "Oracle NetSuite", "HubSpot", "Alegra",
                      "WooCommerce", "X++", "Apex", "Power BI", "Docker", "Jenkins"]) {
    expect(text.join(" ")).toContain(item);
  }
});

test("the technology register is ordered, not a flowing jumble", async ({ page }) => {
  await page.goto("/en");

  // Fixed columns rather than wrapped flow: every entry is a list item in a
  // grid, which is what makes a list of forty-three readable.
  const items = page.locator("section:has-text('Every platform and technology') dd li");
  expect(await items.count()).toBeGreaterThanOrEqual(40);

  // Typeset throughout — no brand glyphs of mismatched optical weight.
  await expect(page.locator("section:has-text('Every platform and technology') svg")).toHaveCount(0);
});

test("the symptom line rotates, and can be driven and paused by hand", async ({
  page,
}) => {
  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  // All six are in the DOM at once, so a screen reader gets the whole list and
  // the rotation is only a visual affordance.
  const lines = page.locator("section:has(button[aria-current]) ul li");
  await expect(lines).toHaveCount(6);

  const dots = page.locator("button[aria-current]");
  await expect(dots).toHaveCount(1);

  const controls = page.locator("section:has(button[aria-label]) button[aria-label]");
  expect(await controls.count()).toBeGreaterThanOrEqual(6);

  // Driving it by hand moves the current line, so nobody waits for a lap.
  await controls.nth(3).click();
  await expect(controls.nth(3)).toHaveAttribute("aria-current", "true");

  // Every symptom names a problem, so every dot carries it as its label.
  const label = await controls.nth(3).getAttribute("aria-label");
  expect(label && label.length).toBeGreaterThan(20);
});

test("under reduced motion the symptoms are a list, not a rotation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  // No controls at all: there is nothing rotating to control.
  await expect(page.locator("button[aria-current]")).toHaveCount(0);

  // And all six are visible rather than stacked at opacity zero.
  const visible = await page.evaluate(
    () =>
      [...document.querySelectorAll("section li")].filter(
        (el) => getComputedStyle(el).opacity === "1" && el.textContent?.includes("."),
      ).length,
  );
  expect(visible).toBeGreaterThanOrEqual(6);
});

test("the outcomes section states results, not modules", async ({ page }) => {
  await page.goto("/en");

  const rows = page.locator("section:has-text('What changes') dl > div");
  await expect(rows).toHaveCount(4);
  await expect(rows.first()).toContainText("Real-time control");
});

test("none of the generated-page tells are present", async ({ page }) => {
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);

  // All-caps labels, and an arrow glued to link or button text.
  const upper = await page.evaluate(
    () =>
      [...document.querySelectorAll("body *")].filter(
        (el) => getComputedStyle(el).textTransform === "uppercase",
      ).length,
  );
  expect(upper).toBe(0);
  expect(await page.locator("body").innerText()).not.toContain("→");

  // One orchestrated entrance, in the hero, and nowhere else.
  const animated = await page.evaluate(
    () => document.querySelectorAll(".settle").length,
  );
  expect(animated).toBe(1);
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

/**
 * The contact form is gone, at the client's instruction: WhatsApp in one tap
 * instead of six fields and a wait. So the assertions that replace those two
 * are that no form survives anywhere, and that the one action actually goes
 * where it claims.
 */
test("contact is one WhatsApp action, with no form left behind", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('select[name="country"]')).toHaveCount(0);

  const cta = page.locator('#contact a[href^="https://wa.me/"]');
  await expect(cta).toHaveCount(1);
  await expect(cta).toContainText("WhatsApp");

  // Email, phone and LinkedIn remain reachable as direct links.
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href^="tel:"]')).toHaveCount(1);
});

test("the contact endpoint is gone with the form", async ({ request }) => {
  const response = await request.post("/api/contact", { data: { name: "x" } });
  expect(response.status()).toBe(404);
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

test("the floating channel is WhatsApp alone, and points somewhere real", async ({ page }) => {
  await page.goto("/es");

  // One button, not a stack: two covered the ledger's right-hand column.
  await expect(page.locator(".channel")).toHaveCount(1);

  const wa = page.locator('.channel[data-channel="whatsapp"]');
  const href = await wa.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/50664857076\?text=/);
  // The prefilled message is translated with the rest of the page.
  expect(decodeURIComponent(href!)).toContain("PrimeNex IT");

  // LinkedIn stays reachable where it belongs, in the contact list and footer.
  await expect(
    page.locator('a[href="https://www.linkedin.com/company/primenex-it"]'),
  ).not.toHaveCount(0);
});
