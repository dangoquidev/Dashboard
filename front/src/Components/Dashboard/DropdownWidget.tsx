import { useState } from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Link,
} from "@nextui-org/react";

const RandomWidgetList = [
	"Météo",
	"OPGG",
	"GMAIL",
	"GITHUB",
	"BOURSE",
	"INSTAGRAM",
];

export const DropdownWidget = () => {
	const [hover, setHover] = useState(false);

	const toggleHover = () => {
		setHover(!hover);
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Link
					onMouseEnter={toggleHover}
					onMouseLeave={toggleHover}
					color='foreground'>
					Ajouter un widget
				</Link>
			</DropdownTrigger>
			<DropdownMenu
				aria-label='Action event example'
				onAction={(key) => alert(key)}>
				{RandomWidgetList.map((widget) => (
					<DropdownItem key={widget}>{widget}</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
