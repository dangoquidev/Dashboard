import { DashboardNavbar } from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
import { readFromCookies } from "../../Libs/cookies";
import { useEffect } from "react";

const DashboardLayout = (): JSX.Element => {
	useEffect(() => {
		const token = readFromCookies("sessionToken");
		if (!token) {
			window.location.href = "/login";
		}
	});
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100%",
			}}>
			<DashboardNavbar />
			<div
				style={{
					flex: 1,
					overflow: "auto",
					minHeight: "100%",
					padding: "20px",
				}}>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
