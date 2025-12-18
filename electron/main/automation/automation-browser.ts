import { fork } from "node:child_process";
import { createRequire } from "node:module";
import path from "path";
import fs from "fs";
import { BrowserContext, chromium } from "playwright";

export function checkBrowsersInstalled(): boolean {
    const browserPath = chromium.executablePath();
    console.log(`Expected Browser Path: ${browserPath}`);

    if (fs.existsSync(browserPath)) {
        console.log("✅ Chromium is installed and ready.");
        return true;
    } else {
        console.error("❌ Chromium is NOT installed.");
        return false;
    }
}

export async function installBrowsers() {
    return new Promise((resolve, reject) => {
        // Locate the cli.js inside node_modules
        const require = createRequire(import.meta.url);
        const playwrightCorePackagePath = require.resolve("playwright-core");
        const cliPath = path.join(path.dirname(playwrightCorePackagePath), "cli.js");

        // Spawn the install command
        const child = fork(cliPath, ["install", "chromium"], {
            stdio: "inherit",
        });

        child.on("close", (code) => {
            if (code === 0) resolve(void 0);
            else reject(new Error(`Failed to install browsers: code ${code}`));
        });
    });
}

export async function launchAutomationBrowser(profileName: string): Promise<BrowserContext> {
    const userDataDirBase = path.join(process.env.APP_ROOT, "user-browser-data");
    const userDataDir = path.join(userDataDirBase, profileName);

    const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
        viewport: {
            width: 1400,
            height: 800,
        },
        locale: "vi-VN",
        timezoneId: "Asia/Ho_Chi_Minh",
        userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });

    function handleAllPagesClose() {
        if (browser.pages().length === 0) {
            console.log("All pages are closed. Closing browser context.");
            browser.close();
        }
    }

    browser.on("page", (page) => {
        page.on("close", handleAllPagesClose);
    });

    await browser.newPage();
    await browser.pages()[0].close();

    return browser;
}

export async function runInAutomationBrowser(
    profileName: string,
    task: (browser: BrowserContext) => Promise<any>,
) {
    const browser = await launchAutomationBrowser(profileName);

    try {
        // Execute the task in the automation browser
        const result = await task(browser);
        return result;
    } finally {
        await browser.close();
    }
}
