import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import { DropdownWidget } from "./DropdownWidget";
import { SwitchTheme } from "../Switch/Switch";

const menuItems = [
    "Ajouter un widget",
    "Home",
    "Paramètres",
    "Se déconnecter",
];

export const DashboardNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            />
            <NavbarBrand >
                <p className="font-bold text-inherit">Dashboard</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <DropdownWidget />
                </NavbarItem>
                <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Home
                </Link>
                </NavbarItem>
                <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <SwitchTheme />
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat" isIconOnly radius="full">
                    <Avatar src="https://i.pravatar.cc/300" />
                </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                    <Link
                    color={
                        "foreground"
                    }
                    className="w-full"
                    href="#"
                    size="lg"
                    >
                    {item}
                    </Link>
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}