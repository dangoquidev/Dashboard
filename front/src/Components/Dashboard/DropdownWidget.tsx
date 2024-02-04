import React, { useContext, useEffect, useState } from "react";
import { WidgetContext } from "../../Pages/DashboardApp/WidgetContext";
import { getWidgetList } from "../../Services/Data";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";

interface Widget {
	id: number;
	title: string;
	url: string;
	placeholder?: string;
}

export const DropdownWidget = () => {
	const { setWidgetList } = useContext(WidgetContext);
	const [hover, setHover] = useState(false);
	const [availableWidgets, setAvailableWidgets] = useState([]);

	useEffect(() => {
		if (availableWidgets.length === 0) {
			getWidgetList().then((data) => {
				setAvailableWidgets(data.widgetList);
			});
		}
	}, [availableWidgets]);

	const handleSelect = (widget: Widget) => {
		setWidgetList([widget]);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant='light'>Ajouter un widget</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label='Action event example'>
				{availableWidgets.map((widget: Widget) => (
					<DropdownItem
						key={widget.id}
						onPress={() => handleSelect(widget)}>
						{widget.title}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
