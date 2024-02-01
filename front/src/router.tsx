import { Navigate, Route, Routes } from "react-router-dom";
import { ReactElement } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import OutletWrapper from "./Utils/OutletWrapper";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import DashboardApp from "./Pages/DashboardApp/DashboardApp";

export const Router = (): ReactElement => {
	return (
		<Routes>
			<Route path='/' element={<OutletWrapper />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='' element={<Navigate to='/login' />} />
			</Route>
			<Route path='/dashboard' element={<DashboardLayout />}>
				<Route
					path=''
					element={<Navigate to='/dashboard/app' replace />}
				/>
				<Route path='app' element={<DashboardApp />} />
			</Route>
		</Routes>
	);
};
