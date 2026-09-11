import { test, expect } from "@playwright/test";

/**
 * Text measurement is meaningless until the webfonts are in: Archivo and the
 * fallback stack have different metrics, so a line count taken too early is a
 * measurement of the wrong typeface.
 */
async function settled(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);

  // Wait out the hero's entrance. Only finite animations are awaited: an
  // infinite one never resolves its finished promise and would hang the run.
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => {
          const timing = a.effect?.getComputedTiming();
          return timing ? Number.isFinite(timing.endTime ?? Infinity) : false;
        })
        .map((a) => a.finished.catch(() => {})),
    ),
  );

  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
}

const LOCALES = ["en", "es", "de", "fr", "pt", "zh"];

/**
 * German and French expand 20-35% over English and Chinese contracts hard, so
 * a layout that survives English says nothing about the other five. Every
 * locale is checked on every device.
 */
for (const locale of LOCALES) {
  test(`${locale}: no horizontal overflow`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await settled(page);

    const overflow = await page.evaluate(() => {
      const vw = window.innerWidth;
      // A wide table inside its own horizontal-scroll container is the
      // intended behaviour, not a defect: the row scrolls, the page does not.
      // Only elements that are not contained by such a scroller count.
      const scrolls = (el: Element) => {
        for (let node: Element | null = el; node; node = node.parentElement) {
          const overflowX = getComputedStyle(node).overflowX;
          if (overflowX === "auto" || overflowX === "scroll") return true;
        }
        return false;
      };

      return [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width === 0) return false;
          if (r.right <= vw + 1 && r.left >= -1) return false;
          // Content inside an <svg> is clipped by its own viewport — a
          // preserveAspectRatio="slice" background crops on purpose and cannot
          // scroll the page. The element to judge is the <svg> itself.
          if (el.closest("svg")) return false;
          return !scrolls(el);
        })
        .slice(0, 5)
        .map((el) => {
          const name = el.getAttribute("class") ?? "";
          return `${el.tagName}.${name.slice(0, 40)}`;
        });
    });

    expect(overflow, `overflowing: ${overflow.join(" | ")}`).toEqual([]);

    const scrollable = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(scrollable).toBe(false);
  });

  test(`${locale}: the headline does not become a text wall`, async ({ page }, testInfo) => {
    await page.goto(`/${locale}`);
    await settled(page);

    const lines = await page.locator("h1").evaluate((el) => {
      const style = getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 0.95;
      return Math.round(el.getBoundingClientRect().height / lineHeight);
    });

    // The failure this guards against is a text wall. Three lines is the ideal
    // and English, French and Chinese hit it; Spanish, German and Portuguese
    // run longer and take a fourth. Shrinking the display type in all six
    // languages to force three everywhere costs more than it buys, so four is
    // the ceiling and five is a regression.
    expect(lines).toBeGreaterThan(0);
    expect(lines).toBeLessThanOrEqual(4);
  });
}

/**
 * The hero's entrance animates opacity from zero with fill-mode both, which
 * means anything that stops it from finishing leaves the most important line
 * on the page invisible. Worth one assertion of its own.
 */
test("the headline is actually visible once the page has loaded", async ({ page }) => {
  await page.goto("/en");
  await settled(page);

  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();

  // Polled, not sampled: the sequence takes about 0.72s to land, and a single
  // reading taken before that proves nothing either way.
  await expect(h1).toHaveCSS("opacity", "1");

  // And the lede and the buttons that follow it in the same sequence.
  await expect(page.locator("#top p").first()).toHaveCSS("opacity", "1");
  await expect(page.locator("#top a.btn").first()).toHaveCSS("opacity", "1");
});

test("every interactive control clears a 44px touch target", async ({ page }) => {
  await page.goto("/en");
  await settled(page);

  const small = await page.evaluate(() => {
    const selector = "a[href], button, select, textarea, input, summary, [role='tab']";
    return [...document.querySelectorAll(selector)]
      .filter((el) => {
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        // Links inside a paragraph are inline text, not controls.
        const inProse = el.closest("p, dd, li.t-body");
        if (inProse && el.tagName === "A") return false;
        // The skip link is 1px until focused; that is the point of it.
        if (el.classList.contains("sr-only")) return false;
        return r.height < 44 || r.width < 44;
      })
      .slice(0, 8)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return `${el.tagName} "${(el.textContent ?? "").trim().slice(0, 20)}" ${Math.round(r.width)}x${Math.round(r.height)}`;
      });
  });

  expect(small, `undersized: ${small.join(" | ")}`).toEqual([]);
});
