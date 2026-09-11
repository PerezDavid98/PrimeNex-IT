import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const LOCALES = ["en", "es", "de", "fr", "pt", "zh"];

/**
 * axe-core over every locale. Contrast is the reason this runs per language
 * rather than once: a colour pair that passes is not the thing that varies,
 * but the elements that exist and the text that fills them are.
 */
for (const locale of LOCALES) {
  test(`${locale}: no WCAG 2 A/AA violations`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await page.waitForLoadState("networkidle");
    // Entrance reveals animate opacity, and axe samples the blended colour
    // mid-fade. Let them settle so contrast is measured on the real thing.
    await page.evaluate(() =>
      Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))),
    );

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}) × ${v.nodes.length}: ${v.help}`,
    );
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("the open language menu is clean too", async ({ page }) => {
  await page.goto("/en");
  await page.locator(".lang__trigger").click();
  await expect(page.locator(".lang__list")).toBeVisible();
  // The menu fades in over 180ms; axe samples the blended colour mid-fade.
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((a) => a.finished.catch(() => {}))),
  );

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const summary = results.violations.map((v) => `${v.id}: ${v.help}`);
  expect(summary, summary.join("\n")).toEqual([]);
});

test("reduced motion is honoured, not merely declared", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  const moving = await page.evaluate(
    () =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .length,
  );
  expect(moving).toBe(0);
});
