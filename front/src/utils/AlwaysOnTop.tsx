import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AlwaysOnTop = (): JSX.Element => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return <Fragment />;
};
