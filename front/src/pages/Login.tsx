import { Button, Input, Image } from "@nextui-org/react";
import Divider from "../utils/Divider/Divider";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Icons/Eyes";
import { isEmailValid } from "../utils/isEmailValid";

const Login = (): JSX.Element => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isVisible, setIsVisible] = React.useState(false);
	const [emptyFields, setEmptyFields] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);
	
	const isEmailInvalid = React.useMemo(() => {
		return !isEmailValid(email);
	}, [email]);

	const handleSubmit = () => {
		console.log(emptyFields);
		if (!email || !password) {
			setEmptyFields(true);
			return;
		}
		console.log("email:", email, "password:", password);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<div
				style={{
					width: "30%",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}>
				<h1
					style={{
						textAlign: "center",
						fontWeight: "600",
						fontSize: "2rem",
					}}>
					Se connecter
				</h1>
				<h2
					style={{
						textAlign: "center",
						fontSize: "1rem",
					}}>
					Entrez vos identifiants pour vous connecter
				</h2>
				<Input
					variant='bordered'
					type='email'
					placeholder='nom@exemple.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					color={isEmailInvalid ? "danger" : "default"}
					errorMessage={isEmailInvalid && "Please enter a valid email"}
					isInvalid={isEmailInvalid}
				/>
				<Input
					variant='bordered'
					placeholder='Mot de passe'
					endContent={
						<button
							className='focus:outline-none'
							type='button'
							onClick={toggleVisibility}>
							{isVisible ? (
								<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
							) : (
								<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
							)}
						</button>
					}
					type={isVisible ? "text" : "password"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					fullWidth={true}
					className='bg-white text-black '
					onClick={() => handleSubmit()}>
					Se connecter
				</Button>
				<Divider> Ou se connecter avec </Divider>
				<Button fullWidth={true} variant='bordered'>
					<FaGoogle />
					Google
				</Button>
			</div>
		</div>
	);
};

export default Login;
