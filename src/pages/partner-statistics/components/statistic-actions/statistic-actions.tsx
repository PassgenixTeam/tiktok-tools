import { Container, ContainerProps } from "@/components/container/container";
import { Grid } from "@/components/grid/grid";
import { GridCell } from "@/components/grid/grid-cell";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToast, Button, cn } from "@heroui/react";
import { VideoIcon } from "lucide-react";
import { useBoolean } from "usehooks-ts";

export function StatisticActions({ className, ...props }: ContainerProps) {
    const dispatch = useAppDispatch();
    const { availableProfiles } = useAppSelector((state) => state.partnerProfiles);

    const { value: isExportingNewVideosReport, setValue: setIsExportingNewVideosReport } =
        useBoolean(false);
    async function handleAnalyzeNewVideos() {
        setIsExportingNewVideosReport(true);
        addToast({
            title: "Xuất báo cáo",
            description: "Đang xuất báo cáo phân tích các video mới...",
            color: "default",
            timeout: 3000,
        });

        try {
            const fakeData = availableProfiles.map((profile) => ({
                username: profile.username,
                name: profile.name || profile.username,
                data: [
                    { date: "3d ago", content: "Video 1", like: 100, comment: 10 },
                    { date: "2d ago", content: "Video 2", like: 150, comment: 20 },
                ],
            }));

            await window.ipcRenderer.invoke("export-new-videos-report", fakeData);

            addToast({
                title: "Thành công",
                description: "Báo cáo phân tích các video mới đã được xuất thành công.",
                color: "success",
                timeout: 3000,
            });
        } catch (error) {
            console.error("Failed to export new videos report:", error);
            addToast({
                title: "Lỗi",
                description: `Không thể xuất báo cáo: ${(error as Error).message}`,
                color: "danger",
                timeout: 5000,
            });
        } finally {
            setIsExportingNewVideosReport(false);
        }
    }

    return (
        <Container className={cn("flex-col items-stretch gap-4", className)} {...props}>
            <div className="grow flex flex-col">
                <h1 className="text-gray-900 font-semibold">Thao tác thống kê</h1>
                <span className="text-gray-500 text-xs">
                    Sử dụng các hành động bên dưới để tạo báo cáo thống kê từ cac đối tác của bạn.
                </span>
            </div>

            <Grid>
                <GridCell className="basis-1/3">
                    <Button
                        variant="flat"
                        color="primary"
                        startContent={<VideoIcon size="18" />}
                        onPress={handleAnalyzeNewVideos}
                        isLoading={isExportingNewVideosReport}
                    >
                        Phân tích các video mới
                    </Button>
                </GridCell>
                <GridCell className="basis-1/3">
                    <Button variant="flat" color="warning" startContent={<VideoIcon size="18" />}>
                        Phân tích chung
                    </Button>
                </GridCell>
            </Grid>
        </Container>
    );
}
