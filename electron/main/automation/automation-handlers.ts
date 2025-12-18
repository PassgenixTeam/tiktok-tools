import { app, ipcMain, ipcRenderer } from "electron";
import { checkBrowsersInstalled, installBrowsers, launchAutomationBrowser } from "./automation-browser";

export function setupAutomationHandlers(win: Electron.BrowserWindow) {
    const hasBrowser = checkBrowsersInstalled();
    if (!hasBrowser) {
        win.webContents.send("installing-browsers");
        installBrowsers()
            .then(() => {
                console.log("Playwright browsers installed successfully. Reloading app...");
                app.relaunch();
            })
            .catch((error) => {
                console.error("Failed to install Playwright browsers:", error);
            });
    }

    ipcMain.handle("launch-browser", async (event, profileName: string) => {
        const browser = await launchAutomationBrowser(profileName);
        const page = browser.pages()[0];
        page.goto("https://www.tiktok.com");
    });
}
