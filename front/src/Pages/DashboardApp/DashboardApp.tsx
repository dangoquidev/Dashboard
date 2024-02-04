import React, { useContext, useEffect, useState } from 'react';
import { WidgetContext } from './WidgetContext';
import { useDisclosure, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from '@nextui-org/react';
import axios from 'axios';
import styles from './DashboardApp.module.css';
import { readFromCookies } from '../../Libs/cookies';
import { FaCheck } from "react-icons/fa";

export const AnimeSearchInput = () => (
    <Input placeholder="Titre de l'anime" />
);

export const WeatherInput = () => (
    <Input placeholder="Ville" />
);

export const LeagueProfileInput = () => (
    <>
        <Input placeholder="Pseudo" />
        <Dropdown>
            <DropdownTrigger>
                <Button>Choisir un serveur</Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem>Server 1</DropdownItem>
                <DropdownItem>Server 2</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </>
);

export const YoutubeInput = ({ isSelf }: { isSelf: boolean }) => (
    isSelf ? null : <Input placeholder="Pseudo de la personne" />
);

export const SpotifyInput = () => {
    const token = readFromCookies('spotifyToken');

    return (
        <>
            {token ? <Button color="success" endContent={<FaCheck />}>Connected to Spotify</Button> : <Button>Log in to Spotify</Button>}
        </>
    );
};

interface Widget {
    id: number;
    title: string;
	url?: string;
}

const DashboardApp = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { widgetList } = useContext(WidgetContext);
    const [lastWidget, setLastWidget] = useState<Widget>({} as Widget);

    useEffect(() => {
        if (widgetList.length > 0) {
            setLastWidget(widgetList[widgetList.length - 1]);
            onOpen();
        }
    }, [widgetList]);

    const handleAction = async () => {
        if (lastWidget && lastWidget.url) {
            const inputValues = {};
            try {
                const response = await axios.post(lastWidget.url, inputValues);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const InputComponent = () => {
        switch (lastWidget.id) {
            case 0:
                return <AnimeSearchInput />;
            case 1:
                return <WeatherInput />;
            case 2:
                return <LeagueProfileInput />;
            case 3:
                return <YoutubeInput isSelf={false} />;
            case 4:
                return <SpotifyInput />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className={styles.grid}>
                {widgetList.map((widget) => (
                    <Button key={widget.id}>{widget.title}</Button>
                ))}
            </div>
            <div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>{lastWidget ? lastWidget.title : 'Test'}</ModalHeader>
                                <ModalBody>
                                    <InputComponent />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={handleAction}>
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
}

export default DashboardApp;
