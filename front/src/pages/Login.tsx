import { Button, Input} from "@nextui-org/react";
import Divider from "../Components/Divider/Divider";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../Icons/Eyes";
import { isEmailValid } from "../Utils/isEmailValid";
import { Link, useNavigate } from "react-router-dom";
import { AuthLogin } from "../Services/Auth";

const Login = (): JSX.Element => {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isVisible, setIsVisible] = React.useState(false);
	const [emptyFields, setEmptyFields] = React.useState(false);
	const [invalidUser, setInvalidUser] = React.useState(false);
	const [isEmailInvalid, setIsEmailValid] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async () => {
		if (!email || !password) {
			setEmptyFields(true);
			return;
		}
		const isValid = await isEmailValid(email);
		if (!isValid) {
			setIsEmailValid(!isValid);
			return;
		}
		if (isEmailInvalid) {
			return;
		}
		const res = await AuthLogin({ email, password });
		if (res.success) {
			navigate("/dashboard");
		} else {
			setInvalidUser(true);
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
			<Link to="/register">
				<Button
					className="absolute top-4 right-4"
					variant="light"
				>
					Register
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
					Se connecter
				</h1>
				<h2
					style={{
						textAlign: "center",
						fontSize: "1rem",
					}}>
					Entrez vos identifiants pour vous connecter
				</h2>
				<h2
					style={{
						textAlign: "center",
						fontSize: "1rem",
						color: "red",
						display: (emptyFields || invalidUser) ? "block" : "none",
					}}>
					{emptyFields && "Veuillez remplir tous les champs"}
					{invalidUser && "Identifiants incorrects"}
				</h2>
				<Input
					variant='bordered'
					type='email'
					placeholder='nom@exemple.com'
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setEmptyFields(false);
						setInvalidUser(false);
						setIsEmailValid(false);
					}}
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
					onChange={(e) => {
						setPassword(e.target.value)
						setEmptyFields(false);
						setInvalidUser(false);
					}}
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
