import { createHashRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Welcome } from "./pages/welcome";
import { PartnerStatisticsRoute } from "./pages/partner-statistics/partner-statistics.route";

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <div>Oops! Something went wrong.</div>,
        children: [
            {
                index: true,
                element: <Welcome />,
            },
            PartnerStatisticsRoute
        ],
    },
]);
