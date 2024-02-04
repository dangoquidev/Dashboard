import { DashboardNavbar } from "./DashboardNavbar";
import { Outlet } from "react-router-dom";
import { readFromCookies } from "../../Libs/cookies";
import { useEffect, useState } from "react";
import { WidgetContext } from "../../Pages/DashboardApp/WidgetContext";

interface Widget {
	id: number;
	title: string;
	data?: any;
}

const DashboardLayout = (): JSX.Element => {
	const [widgetList, setWidgetList] = useState<any[]>([]);

	useEffect(() => {
		const token = readFromCookies("sessionToken");
		if (!token) {
			window.location.href = "/login";
		}
	});

	return (
		<WidgetContext.Provider value={{ widgetList, setWidgetList }}>
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
		</WidgetContext.Provider>
	);
};

export default DashboardLayout;
