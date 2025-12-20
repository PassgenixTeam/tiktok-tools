import { RouteObject } from "react-router-dom";
import { PartnerStatistics } from "./partner-statistics";

export const PartnerStatisticsRoute: RouteObject = {
    path: "tools/partner-statistics",
    element: <PartnerStatistics />,
}