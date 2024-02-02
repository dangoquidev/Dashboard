import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { saveCookies } from "../Libs/cookies";
import { Spinner } from "@nextui-org/react";

const Loading: React.FC = () => {
	const [hasRequested, setHasRequested] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const provider = urlParams.get("provider");

		const redirect_uri = `${window.location.origin}/loading?provider=${provider}`;

		if (code && !hasRequested) {
			setHasRequested(true);
			console.log(code);
			const sendCodeToBackend = async () => {
				try {
					const response = await axios.post(
						`${API_URL}/${provider}/connect`,
						{ code, redirect_uri }
					);
					const { sessionToken, apiToken } = response.data;

					saveCookies("sessionToken", sessionToken);
					saveCookies(`${provider}Token`, apiToken);

					const prevUrl = localStorage.getItem("prevUrl");
					if (prevUrl && !prevUrl.includes("/login")) {
						window.location.href = prevUrl;
					} else {
						window.location.href = "/dashboard";
					}
				} catch (error) {
					console.error(error);
				}
			};

			sendCodeToBackend();
		}
	}, [hasRequested]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<Spinner size='lg' label='Authentification en cours...' />
		</div>
	);
};

export default Loading;
