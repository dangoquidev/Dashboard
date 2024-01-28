import { Outlet } from "react-router-dom";

const OutletWrapper = (): JSX.Element => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default OutletWrapper;
