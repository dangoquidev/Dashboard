import { Link as RouterLink, Outlet } from "react-router-dom";
import React from "react";

const OutletWrapper = (): JSX.Element => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default OutletWrapper;
