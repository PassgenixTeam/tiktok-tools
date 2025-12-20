import { PartnerProfiles } from "./components/partner-profiles/partner-profiles";
import { StatisticActions } from "./components/statistic-actions/statistic-actions";

export function PartnerStatistics() {
    return (
        <div className="grow flex flex-col gap-4 m-4">
            <PartnerProfiles />

            <StatisticActions />
        </div>
    );
}
