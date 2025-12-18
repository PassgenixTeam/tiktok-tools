import { Button, cn } from "@heroui/react";
import { ArrowBigRight, BookIcon, Globe2Icon } from "lucide-react";
import { Outlet } from "react-router-dom";
import { AppNavBar } from "./components/layout/app-navbar";
import { AppSideBar, AppSideBarItem } from "./components/layout/app-sidebar";
import { AppMain } from "./components/layout/app-main";

// The "App" comes from the context bridge in preload/index.ts
// const { App } = window;

export function Layout() {
  return (
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
            // onPress={() => App.launchBrowser()}
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
