import { app, dialog, ipcMain } from "electron";
import path from "path";
import ExcelJS from "exceljs";

interface ProfileData {
    username: string;
    name: string;
    data: { date: string; content: string; like: number; comment: number }[];
}

export function setupReportHandlers(win: Electron.BrowserWindow) {
    ipcMain.handle("export-new-videos-report", async (event, profiles: ProfileData[]) => {
        const { canceled, filePath } = await dialog.showSaveDialog({
            title: "Save New Videos Report Excel File",
            defaultPath: path.join(app.getPath("documents"), "new_videos_report.xlsx"),
            filters: [{ name: "New Videos Report", extensions: ["xlsx"] }],
        });

        if (canceled || !filePath) {
            throw new Error("Vui lòng chọn đường dẫn để lưu file.");
        }

        try {
            const workbook = new ExcelJS.Workbook();

            // Create a sheet for each profile
            profiles.forEach((profile) => {
                const worksheet = workbook.addWorksheet(profile.username);

                // Row 1: Username (merged across columns)
                worksheet.mergeCells("A1:E1");
                const usernameCell = worksheet.getCell("A1");
                usernameCell.value = `Username: ${profile.username}`;
                usernameCell.font = { bold: true, size: 14 };
                usernameCell.alignment = { horizontal: "left", vertical: "middle" };
                worksheet.getRow(1).height = 25;

                // Row 2: Name (merged across columns)
                worksheet.mergeCells("A2:E2");
                const nameCell = worksheet.getCell("A2");
                nameCell.value = `Name: ${profile.name}`;
                nameCell.font = { bold: true, size: 12 };
                nameCell.alignment = { horizontal: "left", vertical: "middle" };
                worksheet.getRow(2).height = 22;

                // Row 4: Table Headers
                const headerRow = worksheet.addRow(["Date", "Content", "Likes", "Comments"]);
                headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } }; // White text
                headerRow.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FF4472C4" },
                }; // Blue background
                headerRow.alignment = { horizontal: "center", vertical: "middle" };

                // Add data rows
                profile.data.forEach((item) => {
                    worksheet.addRow([item.date, item.content, item.like, item.comment]);
                });

                // Column widths
                worksheet.columns = [
                    { width: 15 }, // Date
                    { width: 40 }, // Content
                    { width: 12 }, // Likes
                    { width: 12 }, // Comments
                ];

                // Center align numbers
                worksheet.getColumn(3).alignment = { horizontal: "center" };
                worksheet.getColumn(4).alignment = { horizontal: "center" };
            });

            // Write to file
            await workbook.xlsx.writeFile(filePath);

            return { success: true, filePath };
        } catch (error) {
            throw new Error(`Lỗi khi xuất báo cáo: ${(error as Error).message}`);
        }
    });
}
