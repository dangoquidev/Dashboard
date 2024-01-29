import { DashboardNavbar } from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = (): JSX.Element => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100%"}}>
            <DashboardNavbar />
            <div style={{ flex: 1, overflow: "auto", minHeight: "100%", padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout;