import { DashboardNavbar } from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = (): JSX.Element => {
    return (
        <div style={{ display: "flex", minHeight: "100%", overflow: "hidden"}}>
            <DashboardNavbar />
            <div style={{ flex: 1, overflow: "auto", minHeight: "100%"}}>
                <Outlet />
            </div>
        </div>
    );
}

export default DashboardLayout