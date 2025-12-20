import { app, ipcMain, ipcRenderer } from "electron";
import {
    checkBrowsersInstalled,
    installBrowsers,
    launchAutomationBrowser,
} from "./automation-browser";

export function setupAutomationHandlers(win: Electron.BrowserWindow) {
    const hasBrowser = checkBrowsersInstalled();
    if (!hasBrowser) {
        win.webContents.send(
            "show-blocking-message",
            "Đang cài đặt trình duyệt... Vui lòng chờ trong giây lát.",
        );
        installBrowsers()
            .then(() => {
                win.webContents.send(
                    "show-blocking-message",
                    "✅ Trình duyệt đã được cài đặt. Ứng dụng sẽ khởi động lại...",
                );
                app.relaunch();
            })
            .catch((error) => {
                throw new Error(`Lỗi khi cài đặt trình duyệt: ${(error as Error).message}`);
            });
    }

    ipcMain.handle("launch-browser", async (event, profileName: string) => {
        const browser = await launchAutomationBrowser(profileName);
        const page = browser.pages()[0];
        page.goto("https://www.tiktok.com");
    });
}
