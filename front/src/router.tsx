import { Navigate, Route, Routes } from "react-router-dom";
import React, { ReactElement } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OutletWrapper from "./utils/OutletWrapper";

export const Router = (): ReactElement => {
	return (
		<Routes>
			<Route path='/' element={<OutletWrapper />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='' element={<Navigate to='/login' />} />
			</Route>
		</Routes>
	);
};
