import React from "react";
import { Button, Input } from "@nextui-org/react";
import Divider from "../Components/Divider/Divider";
import { FaGoogle } from "react-icons/fa";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Icons/Eyes";
import { isPasswordStrong } from "../utils/isPasswordStrong";
import { isEmailValid } from "../utils/isEmailValid";
import { Link } from "react-router-dom";

const Register = (): JSX.Element => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isVisible, setIsVisible] = React.useState(false);
	const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = React.useState(false);
	const [emailValid, setEmailValid] = React.useState(false);

	const isPasswordInvalid = React.useMemo(() => {
		return isPasswordStrong(password);
	}, [password]);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async () => {
		const test = await isEmailValid(email);
		console.log(test);
		setEmailValid(!test);
		if (password !== confirmPassword) {
			setIsConfirmPasswordInvalid(true);
		} else {
			setIsConfirmPasswordInvalid(false);
			console.log("email:", email, "password:", password);
		}
	};

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: "0 20px",
                boxSizing: "border-box",
            }}
        >
			<Link to="/login">
				<Button
					className="absolute top-4 right-4"
					variant="light"
					onClick={() => console.log("Switch to Login")}
				>
					Login
				</Button>
			</Link>
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
				<h1
					style={{
						textAlign: "center",
						fontWeight: "600",
						fontSize: "2rem",
					}}>
					S'inscrire
				</h1>
				<h2
					style={{
						textAlign: "center",
						fontSize: "1rem",
					}}>
					Entrez vos informations pour vous inscrire
				</h2>
				<Input
					variant='bordered'
					type='email'
					placeholder='nom@exemple.com'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setEmailValid(false);
					}}
					color={emailValid ? "danger" : "default"}
					errorMessage={emailValid && "Please enter a valid email"}
					isInvalid={emailValid}
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
					color={isPasswordInvalid.color}
					description={isPasswordInvalid.strength && `Your password is ${isPasswordInvalid.strength}` }
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Input
					variant='bordered'
					placeholder='Confirmez votre mot de passe'
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
					color={isConfirmPasswordInvalid ? "danger" : "default"}
					description={isConfirmPasswordInvalid ? "Passwords do not match" : ""}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<Button
					fullWidth={true}
					className='bg-white text-black '
					onClick={() => handleSubmit()}>
					S'inscrire
				</Button>
				<Divider> Ou s'inscrire avec </Divider>
				<Button fullWidth={true} variant='bordered'>
					<FaGoogle />
					Google
				</Button>
			</div>
		</div>
	);
};

export default Register;
