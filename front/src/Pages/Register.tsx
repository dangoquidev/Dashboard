import React from "react";
import { Button, Input } from "@nextui-org/react";
import Divider from "../Components/Divider/Divider";
import { FaGoogle, FaSpotify } from "react-icons/fa";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Icons/Eyes";
import { isPasswordStrong } from "../Utils/isPasswordStrong";
import { isEmailValid } from "../Utils/isEmailValid";
import { Link } from "react-router-dom";
import { AuthRegister } from "../Services/Auth";
import { useNavigate } from "react-router-dom";
import { googleLogin, spotifyLogin } from "../Utils/OauthLogin";

const Register = (): JSX.Element => {
	const [username, setUsername] = React.useState("");
	const [isUsernameValid, setIsUsernameValid] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isVisible, setIsVisible] = React.useState(false);
	const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = React.useState(false);
	const [emailValid, setEmailValid] = React.useState(false);
	const [emptyFields, setEmptyFields] = React.useState(false);
	const [userAlreadyExists, setUserAlreadyExists] = React.useState(false);
	const navigate = useNavigate();

	const isPasswordInvalid = React.useMemo(() => {
		return isPasswordStrong(password);
	}, [password]);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async () => {
		if (!username || !password || !email) {
			setEmptyFields(true);
			return;
		}
		const isValid = await isEmailValid(email);
		if (!isValid) {
			setEmailValid(!isValid);
			return;
		}
		if (password !== confirmPassword) {
			setIsConfirmPasswordInvalid(true);
			return;
		} else {
			setIsConfirmPasswordInvalid(false);
		}
		if (isPasswordInvalid.strength !== "strong") {
			return;
		}
		const res = await AuthRegister({username, email, password});
		console.log(res);
		if (res.success) {
			navigate('/login');
		} else {
			setUserAlreadyExists(true);
			return;
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
				<h2
					style={{
						textAlign: "center",
						fontSize: "1rem",
						color: "red",
						display: (userAlreadyExists || emptyFields) ? "block" : "none",
					}}>
					{userAlreadyExists && "Cette adresse email est déjà utilisée"}
					{emptyFields && "Veuillez remplir tous les champs"}
				</h2>
				<Input
					variant='bordered'
					type='username'
					placeholder='John Doe'
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
						setIsUsernameValid(false);
						setEmptyFields(false);
					}}
					color={isUsernameValid ? "danger" : "default"}
				/>
				<Input
					variant='bordered'
					type='email'
					placeholder='nom@exemple.com'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setEmailValid(false);
						setUserAlreadyExists(false);
						setEmptyFields(false);
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
					onChange={(e) => {
						setPassword(e.target.value)
						setEmptyFields(false);
					}}
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
					errorMessage={isConfirmPasswordInvalid ? "Passwords do not match" : ""}
					value={confirmPassword}
					onChange={(e) => {
						setConfirmPassword(e.target.value);
						setIsConfirmPasswordInvalid(false);
						setEmptyFields(false);
					}}
				/>
				<Button
					fullWidth={true}
					className='bg-white text-black '
					onClick={() => handleSubmit()}>
					S'inscrire
				</Button>
				<Divider> Ou s'inscrire avec </Divider>
				<div style={{ display: 'flex', gap: '10px' }}>
					<Button fullWidth={true} variant='bordered' onClick={() => googleLogin()}>
						<FaGoogle />
						Google
					</Button>
					<Button variant='bordered' isIconOnly onClick={() => spotifyLogin()}>
						<FaSpotify size={24} />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Register;
