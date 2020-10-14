import React from "react";
import Link from "next/link";
import axios from "axios";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";


import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";
import catchErrors from "../utils/catchErrors";

const INITIAL_USER = {
	email: "",
	password: ""
};

export default function Login() {
	const [user, setUser] = React.useState(INITIAL_USER); //initial page user
	const [error, setError] = React.useState(""); //message from serv
	const [disabled, setDisabled] = React.useState(true); //disable form
	const [loading, setLoading] = React.useState(false); //used to show something happening while api call occurs

	//sets changed fields
	function handleChange(event){
		const {name, value } = event.target;
		setUser(prevState => ({...prevState, [name]:value}));
	}

	//ensure fields are filled out before allowing signup
	React.useEffect(() => {
		const isUser = Object.values(user).every(el => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	//handle submission
	async function handleSubmit(event){
		event.preventDefault();
		try{
			setLoading(true);
			setError("");

			const url = `${baseUrl}/api/login`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			
			handleLogin(response.data);
		}catch(error){
			catchErrors(error, setError);

		}finally {
			setLoading(false);
		}

	}
	return (
		<>
			<Message
				attached
				icon="privacy"
				header="Welcome Back!"
				content="Log in with email and password"
				color="green"
			/>
			<Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
				<Message
					error
					header="Oops!"
					content={error}
				/>
				<Segment>
					<Form.Input
						fluid
						icon="envelope"
						iconPosition="left"
						label="Email"
						placeholder="Email"
						name="email"
						type="email"
						value={user.email}
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						label="Password"
						placeholder="Password"
						name="password"
						type="password"
						value={user.password}
						onChange={handleChange}
					/>
					<Button
						icon="sign in"
						type="submit"
						color="blue"
						content="Log in"
						disabled={disabled || loading}
					/>   
				</Segment>
			</Form>
			<Message attached="bottom" warning>
				<Icon 
					name="help"
				/>
				New user?{" "}
				<Link href="/signup">
					<a>Sign up here</a>
				</Link>{" "}
				instead.
			</Message>

		</>
	);
}