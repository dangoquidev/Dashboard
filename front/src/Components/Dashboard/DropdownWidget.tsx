import React, { useContext, useEffect, useState } from 'react';
import { WidgetContext } from '../../Pages/DashboardApp/WidgetContext';
import { getWidgetList } from '../../Services/Data';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Link
} from "@nextui-org/react";

interface Widget {
    id: number;
    title: string;
	url: string;
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

    const toggleHover = () => {
        setHover(!hover);
    };

	const handleSelect = (widget: Widget) => {
		setWidgetList(prevWidgets => [...prevWidgets, widget]);
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
                aria-label='Action event example'>
				{availableWidgets.map((widget: Widget) => (
					<DropdownItem key={widget.id} onPress={() => handleSelect(widget)}>{widget.title}</DropdownItem>
				))}
            </DropdownMenu>
        </Dropdown>
    );
};
