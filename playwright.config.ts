import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Real engines, not emulation. Chromium covers Chrome, Edge and Android
 * WebView; WebKit is the engine every browser on iOS is required to use, so it
 * is the only way to find out what an iPhone actually does with this CSS.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: { baseURL, trace: "retain-on-failure" },

  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "desktop-safari", use: { ...devices["Desktop Safari"] } },
    { name: "iphone-se", use: { ...devices["iPhone SE"] } },
    { name: "iphone-15", use: { ...devices["iPhone 15"] } },
    { name: "ipad", use: { ...devices["iPad (gen 7)"] } },
    { name: "android", use: { ...devices["Pixel 7"] } },
  ],

  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npm run build && npx next start -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
      },
});
