import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Router } from "./router";
import { AlwaysOnTop } from "./Utils/AlwaysOnTop";
import "./main.css";
const App = (): JSX.Element => {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute='class' defaultTheme='dark'>
				<AlwaysOnTop />
				<Router />
			</NextThemesProvider>
		</NextUIProvider>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<HelmetProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</HelmetProvider>
);
