import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { readFromCookies } from "../Libs/cookies";

const OutletWrapper = (): JSX.Element => {
	useEffect(() => {
		const token = readFromCookies("sessionToken");
		if (token) {
			window.location.href = "/dashboard";
		}
	});
	return (
		<>
			<Outlet />
		</>
	);
};

export default OutletWrapper;
