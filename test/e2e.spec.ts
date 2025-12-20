import path from "node:path";
import {
    type ElectronApplication,
    type Page,
    type JSHandle,
    _electron as electron,
} from "playwright";
import type { BrowserWindow } from "electron";
import { beforeAll, afterAll, describe, expect, test } from "vitest";

const root = path.join(__dirname, "..");
let electronApp: ElectronApplication;
let page: Page;

if (process.platform === "linux") {
    // pass ubuntu
    test(() => expect(true).true);
} else {
    beforeAll(async () => {
        electronApp = await electron.launch({
            args: [".", "--no-sandbox"],
            cwd: root,
            env: { ...process.env, NODE_ENV: "development" },
        });
        page = await electronApp.firstWindow();

        const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page);
        await mainWin.evaluate(async (win) => {
            win.webContents.executeJavaScript(
                'console.log("Execute JavaScript with e2e testing.")',
            );
        });
    });

    afterAll(async () => {
        await page.screenshot({ path: "test/screenshots/e2e.png" });
        await page.close();
        await electronApp.close();
    });

    describe("[tiktok-tools] e2e tests", async () => {
        test("startup", async () => {
            const title = await page.title();
            expect(title).eq("Tiktok Tools");
        });

        test("should show TikTok Tools sidebar", async () => {
            const sidebarTitle = await page.$("h2");
            const title = await sidebarTitle?.textContent();
            expect(title).eq("TikTok Tools");
        });

        test("should show profile manager", async () => {
            const profileHeader = await page.$("text=TikTok Profile");
            expect(profileHeader).toBeTruthy();
        });

        test("should show create new profile button", async () => {
            const createButton = await page.$("text=Create New Profile");
            expect(createButton).toBeTruthy();
        });

        test("should show function selection message when no function selected", async () => {
            const message = await page.$("text=Select a function from the sidebar to get started");
            expect(message).toBeTruthy();
        });
    });
}
