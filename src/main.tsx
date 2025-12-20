import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app-router";
import { ErrorBoundary } from "./components/error-boundary/error-boundary";
import { ReduxProvider, store } from "./redux/store";

import "./globals.css";

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <HeroUIProvider>
                <ToastProvider toastProps={{ variant: "flat" }} />
                <ErrorBoundary>
                    <RouterProvider router={router} />
                </ErrorBoundary>
            </HeroUIProvider>
        </ReduxProvider>
    </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");
