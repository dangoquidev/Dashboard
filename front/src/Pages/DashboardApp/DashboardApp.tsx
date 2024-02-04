import React, { useContext, useEffect, useState } from "react";
import { WidgetContext } from "./WidgetContext";
import {
	useDisclosure,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Switch,
	Image,
	RadioGroup,
	Radio,
} from "@nextui-org/react";
import axios from "axios";
import styles from "./DashboardApp.module.css";
import { readFromCookies } from "../../Libs/cookies";
import { FaCheck } from "react-icons/fa";
import { callWidget } from "../../Services/Data";
import { CardWidget } from "../../Components/Card/Card";
import { googleLogin, spotifyLogin } from "../../Utils/OauthLogin";
import { updateUserWidgetList, getUserWidgetList } from "../../Services/User";

interface Widget {
	id: number;
	title: string;
	url?: string | Array<string>;
	placeholder?: string;
	edit?: number;
}

export const widgetsList: any = [
	{
		id: 0,
		title: "Anime Search",
		url: "/anime/search",
		placeholder: "Enter anime title",
	},
	{
		id: 1,
		title: "Weather",
		url: "/weather/current",
		placeholder: "Enter city name",
	},
	{
		id: 2,
		title: "League Profile",
		url: ["/riot/getRankInfo", "/riot/getMatchHistory"],
		placeholder: "Enter riot tag",
	},
	{
		id: 3,
		title: "Youtube",
		url: "/google/searchYoutube",
		placeholder: "Enter channel name",
	},
	{
		id: 4,
		title: "Spotify",
		url: "/spotify/getPlaylist",
	},
];

const DashboardApp = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { widgetList, setWidgetList } = useContext(WidgetContext);
	const [userWidgetList, setUserWidgetList] = useState<any>([]);
	const [data, setData] = useState<string[]>([]);
	const [gToken, setGoogleToken] = useState<string>("");
	const [sToken, setSpotifyToken] = useState<string>("");
	const [widgetSize, setSize] = useState("medium");

	const updateWidgetData = async (index: number) => {
		const widgetId = userWidgetList[index].id;
		const widget = widgetsList.find((w: any) => w.id === widgetId);
		if (widget) {
			let response: any;
			let response2: any;
			let newData: any;
			console.log(`Updating widget with id ${widgetId}`);
			switch (widget.id) {
				case 0:
					const title = userWidgetList[index].params[0];
					response = await callWidget(widget.url, { title });
					newData = response.anime;
					break;
				case 1:
					const city = userWidgetList[index].params[0];
					response = await callWidget(widget.url, { city });
					newData = response.weather;
					break;
				case 2:
					const IGN = userWidgetList[index].params[0];
					const region = userWidgetList[index].params[1];
					response = await callWidget(widget.url[0], { IGN, region });
					newData = [response.rank];
					response2 = await callWidget(widget.url[1], {
						IGN,
						region,
					});
					newData = [...newData, response2.matchHistoryInfo];
					break;
				case 3:
					const channelName = userWidgetList[index].params[0];
					const token = readFromCookies("googleToken");
					response = await callWidget(widget.url, {
						channelName,
						token,
					});
					newData = response.channelStats;
					break;
				case 4:
					const accessToken = readFromCookies("spotifyToken");
					response = await callWidget(widget.url, {
						accessToken,
					});
					newData = response.playlists;
					break;
				default:
					console.error(`No handler for widget with id ${widgetId}`);
					return;
			}
			console.log(newData);
			setUserWidgetList((prevWidgets: Array<any>) =>
				prevWidgets.map((w: any, i: number) =>
					i === index ? { ...w, data: newData } : w
				)
			);
		} else {
			console.error(`No widget found with id ${widgetId}`);
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			userWidgetList.forEach((_: any, index: number) => {
				updateWidgetData(index);
			});
		}, 5 * 60 * 1000);

		return () => clearInterval(intervalId);
	});

	const handleSizeChange = (value: any) => {
		setSize(value);
	};

	const doUserHaveToken = (type: "spotify" | "google") => {
		const token = readFromCookies(`${type}Token`);
		if (token) {
			return token;
		}
		return null;
	};

	useEffect(() => {
		setSpotifyToken(doUserHaveToken("spotify"));
		setGoogleToken(doUserHaveToken("google"));
	});

	useEffect(() => {
		if (widgetList.length > 0) {
			onOpen();
		}
	}, [widgetList]);

	useEffect(() => {
		if (userWidgetList.length > 0) {
			updateUserWidgetList([...userWidgetList]);
		} else {
			getUserWidgetList().then((data) => {
				setUserWidgetList(data.data.widgets);
			});
		}
	}, [userWidgetList]);

	const handleDelete = (index: number): void => {
		setUserWidgetList((prevWidgets: Array<any>) =>
			prevWidgets.filter((_: any, i: number) => i !== index)
		);
	};

	const handleEdit = (index: number): void => {
		const widgetId = userWidgetList[index].id;
		const widget = widgetsList.find((w: any) => w.id === widgetId);
		if (widget) {
			widget.edit = index;
			setWidgetList([widget]);
		} else {
			console.error(`No widget found with id ${widgetId}`);
		}
	};

	const Create = async () => {
		let city = "";
		let IGN = "";
		let region = "";
		let title = "";
		let leagueData: any = [];
		let channelName = "";
		let token = gToken;
		let accessToken = sToken;

		switch (widgetList[0].id) {
			case 0:
				title = data[0];
				callWidget(widgetList[0].url, { title }).then((response) => {
					const newWidget = {
						id: widgetList[0].id,
						params: [title],
						data: response.anime,
						size: widgetSize,
					};
					if (widgetList[0].edit !== undefined) {
						userWidgetList[widgetList[0].edit] = newWidget;
					} else {
						userWidgetList.push(newWidget);
					}
					setUserWidgetList([...userWidgetList]);
				});
				return;
			case 1:
				city = data[0];
				callWidget(widgetList[0].url, { city }).then((response) => {
					const newWidget = {
						id: widgetList[0].id,
						params: [city],
						data: response.weather,
						size: widgetSize,
					};
					if (widgetList[0].edit !== undefined) {
						userWidgetList[widgetList[0].edit] = newWidget;
					} else {
						userWidgetList.push(newWidget);
					}
					setUserWidgetList([...userWidgetList]);
				});
				return;
			case 2:
				IGN = data[0];
				region = data[1];
				callWidget(widgetList[0].url[0], { IGN, region }).then(
					(response) => {
						leagueData = [response.rank];
					}
				);
				callWidget(widgetList[0].url[1], { IGN, region }).then(
					(response) => {
						leagueData = [...leagueData, response.matchHistoryInfo];
						const newWidget = {
							id: widgetList[0].id,
							params: [IGN, region],
							data: leagueData,
							size: widgetSize,
						};
						if (widgetList[0].edit !== undefined) {
							userWidgetList[widgetList[0].edit] = newWidget;
						} else {
							userWidgetList.push(newWidget);
						}
						setUserWidgetList([...userWidgetList]);
					}
				);
				return;
			case 3:
				channelName = data[0];
				callWidget(widgetList[0].url, {
					channelName,
					token,
				}).then((response) => {
					const newWidget = {
						id: widgetList[0].id,
						params: [channelName],
						data: [
							response.channelStats,
							response.profilePicture,
							channelName,
						],
						size: widgetSize,
					};
					if (widgetList[0].edit !== undefined) {
						userWidgetList[widgetList[0].edit] = newWidget;
					} else {
						userWidgetList.push(newWidget);
					}
					setUserWidgetList([...userWidgetList]);
				});
				return;
			case 4:
				callWidget(widgetList[0].url, {
					accessToken,
				}).then((response) => {
					const newWidget = {
						id: widgetList[0].id,
						params: [],
						data: response.playlists,
						size: widgetSize,
					};
					if (widgetList[0].edit !== undefined) {
						userWidgetList[widgetList[0].edit] = newWidget;
					} else {
						userWidgetList.push(newWidget);
					}
					setUserWidgetList([...userWidgetList]);
				});
				return;
			default:
				return;
		}
	};

	return (
		<div>
			<div className={styles.grid}>
				{userWidgetList.map((widget: any, index: number) => (
					<CardWidget
						key={index}
						size={widget.size}
						id={widget.id}
						data={widget.data}
						onDelete={() => handleDelete(index)}
						onEdit={() => handleEdit(index)}
					/>
				))}
			</div>
			<div>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					placement='center'>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>{widgetList[0].title}</ModalHeader>
								<ModalBody>
									{widgetList[0].id === 2 ? (
										<>
											<Input
												placeholder={
													widgetList[0].placeholder
												}
												onChange={(e) =>
													setData([
														e.target.value,
														data[1],
													])
												}
											/>
											<Input
												placeholder='Région'
												onChange={(e) =>
													setData([
														data[0],
														e.target.value,
													])
												}
											/>
										</>
									) : widgetList[0].id === 3 ? (
										gToken ? (
											<div>
												<Input
													placeholder={
														widgetList[0]
															.placeholder
													}
													onChange={(e) =>
														setData([
															e.target.value,
														])
													}></Input>
												<Button
													color='success'
													endContent={<FaCheck />}>
													{" "}
													Logged in{" "}
												</Button>
											</div>
										) : (
											<Button
												onClick={() => {
													googleLogin();
												}}>
												{" "}
												Login with Google{" "}
											</Button>
										)
									) : widgetList[0].id === 4 ? (
										sToken ? (
											<div>
												<Button
													color='success'
													endContent={<FaCheck />}>
													{" "}
													Logged in{" "}
												</Button>
											</div>
										) : (
											<Button onPress={spotifyLogin}>
												{" "}
												Login with Spotify{" "}
											</Button>
										)
									) : (
										<Input
											placeholder={
												widgetList[0].placeholder
													? widgetList[0].placeholder
													: "Veuillez entrer votre texte"
											}
											onChange={(e) =>
												setData([e.target.value])
											}
										/>
									)}
									<RadioGroup
										label='Select widget size'
										orientation='horizontal'
										value={widgetSize}
										onValueChange={handleSizeChange}>
										<Radio value='small'>Small</Radio>
										<Radio value='medium'>Medium</Radio>
										<Radio value='large'>Large</Radio>
									</RadioGroup>
								</ModalBody>

								<ModalFooter>
									<Button
										color='danger'
										variant='light'
										onPress={onClose}>
										Close
									</Button>
									<Button color='primary' onPress={Create}>
										Action
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
};

export default DashboardApp;
