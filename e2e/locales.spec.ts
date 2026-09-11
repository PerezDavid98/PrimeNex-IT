import { test, expect } from "@playwright/test";

const LOCALES = [
  { code: "en", htmlLang: "en", headlineIncludes: "engineer" },
  { code: "es", htmlLang: "es", headlineIncludes: "sistemas" },
  { code: "de", htmlLang: "de", headlineIncludes: "Systeme" },
  { code: "fr", htmlLang: "fr", headlineIncludes: "concevons" },
  { code: "pt", htmlLang: "pt-BR", headlineIncludes: "sistemas" },
  { code: "zh", htmlLang: "zh-Hans", headlineIncludes: "系统" },
];

const ENDONYMS = ["English", "Español", "Deutsch", "Français", "Português", "中文"];

for (const locale of LOCALES) {
  test(`${locale.code}: renders, declares its language, exposes all six`, async ({ page }) => {
    await page.goto(`/${locale.code}`);

    await expect(page.locator("html")).toHaveAttribute("lang", locale.htmlLang);

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText(locale.headlineIncludes);

    // Every locale offers every locale, named in its own language, as a real link.
    for (const endonym of ENDONYMS) {
      await expect(page.locator(`.lang__option:has-text("${endonym}")`)).toHaveCount(1);
    }
    await expect(page.locator(`.lang__option[aria-current="true"]`)).toHaveCount(1);

    // Reciprocal hreflang, or Google discards the cluster.
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(7);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
  });
}

test("the switcher navigates and the choice sticks", async ({ page, context }) => {
  await page.goto("/en");
  await page.locator(".lang__trigger").click();
  await page.locator('.lang__option[href="/de"]').click();

  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");

  const cookie = (await context.cookies()).find((c) => c.name === "pnx_locale");
  expect(cookie?.value).toBe("de");
});

test("the switcher closes on Escape and returns focus", async ({ page }) => {
  await page.goto("/en");
  const trigger = page.locator(".lang__trigger");
  await trigger.click();
  await expect(page.locator(".lang__list")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.locator(".lang__list")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("an unknown locale is a 404, not a render", async ({ page }) => {
  const response = await page.goto("/xx");
  expect(response?.status()).toBe(404);
});
