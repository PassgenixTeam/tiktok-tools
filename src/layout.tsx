import { addToast, Button, cn } from "@heroui/react";
import { ArrowBigRight, BookIcon, Globe2Icon } from "lucide-react";
import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/layout/app-navbar";
import { AppSideBar, AppSideBarItem } from "./components/layout/app-sidebar";
import { AppMain } from "./components/layout/app-main";
import { useAppSelector } from "./redux/store";
import { useCallback, useEffect, useState } from "react";

export function Layout() {
    const { currentProfile } = useAppSelector((state) => state.tiktokProfiles);

    async function handleLaunchBrowser() {
        if (!currentProfile) {
            addToast({
                title: "Không thể khởi chạy trình duyệt",
                description: "Vui lòng chọn profile trước khi khởi chạy trình duyệt.",
                color: "danger",
                timeout: 3000,
            });
            return;
        }

        try {
            console.log("Launching browser for profile:", currentProfile.name);
            const result = await window.ipcRenderer.invoke("launch-browser", currentProfile.name);
            console.log(result);
        } catch (error) {
            addToast({
                title: "Lỗi khi khởi chạy trình duyệt",
                description: (error as Error).message,
                color: "danger",
                timeout: 3000,
            });
        }
    }

    const [isInstallingBrowsers, setIsInstallingBrowsers] = useState<boolean>(false);
    const handleInstallingBrowsers = useCallback(
        (_event: Electron.IpcRendererEvent, ...args: any[]) => {
            setIsInstallingBrowsers(true);
        },
        [],
    );

    useEffect(() => {
        window.ipcRenderer.on("installing-browsers", handleInstallingBrowsers);
        return () => {
            window.ipcRenderer.off("installing-browsers", handleInstallingBrowsers);
        };
    }, []);

    return isInstallingBrowsers ? (
        <main className="flex flex-col h-screen">
            <h1>Đang cài đặt trình duyệt... Vui lòng chờ trong giây lát.</h1>
        </main>
    ) : (
        <main className="flex flex-col h-screen">
            <AppNavBar />
            <div className="grow flex">
                <AppSideBar className="shrink-0 mt-2 z-0 shadow-md">
                    <AppSideBarItem icon={<ArrowBigRight />} to="/tools/partner-statistics">
                        Thống kê đối tác
                    </AppSideBarItem>

                    <Button
                        color="primary"
                        className={cn("relative flex flex-col gap-2 py-10 m-2")}
                        variant="flat"
                        onPress={handleLaunchBrowser}
                    >
                        <div className="shrink-0">
                            <Globe2Icon />
                        </div>
                        <span className="font-semibold">Trình duyệt</span>
                    </Button>
                </AppSideBar>

                <AppMain>
                    <Outlet />
                </AppMain>
            </div>
        </main>
    );
}
