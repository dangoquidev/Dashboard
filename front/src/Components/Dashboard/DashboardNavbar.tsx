import React, { useEffect } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	Avatar,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { DropdownWidget } from "./DropdownWidget";
import { SwitchTheme } from "../Switch/Switch";
import { getUserPfp } from "../../Services/User";
import { CiLogout } from "react-icons/ci";
import { removeCookies } from "../../Libs/cookies";

const menuItems = ["Ajouter un widget", "Home", "Paramètres", "Se déconnecter"];

export const DashboardNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [userPfp, setUserPfp] = React.useState("");

	const logout = () => {
		removeCookies("sessionToken");
		window.location.href = "/login";
	};

	const pfp = async () => {
		const pfp = await getUserPfp();
		if (pfp.success) {
			setUserPfp(pfp.data.profilePicture);
		} else {
			setUserPfp("https://i.pravatar.cc/300");
		}
	};

	useEffect(() => {
		pfp();
	}, []);

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarMenuToggle
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				className='sm:hidden'
			/>
			<NavbarBrand>
				<p className='font-bold text-inherit'>Dashboard</p>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem>
					<DropdownWidget />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>
					<SwitchTheme />
				</NavbarItem>
				<NavbarItem>
					<Button
						as={Link}
						color='primary'
						href='#'
						variant='flat'
						isIconOnly
						radius='full'>
						<Avatar src={userPfp} />
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Button isIconOnly onClick={() => logout()}>
						<CiLogout />
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={"foreground"}
							className='w-full'
							href='#'
							size='lg'>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};
