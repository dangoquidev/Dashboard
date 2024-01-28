import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar} from "@nextui-org/react";
import { DropdownWidget } from "./DropdownWidget";
import { SwitchTheme } from "../Switch/Switch";

export const DashboardNavbar = () => {
    return (
        <Navbar>
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
        </Navbar>
    );
}