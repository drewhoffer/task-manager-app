import Link from "next/link";
import React from "react";
import axios from "axios";
import { Button, Form, Icon, Message, Segment } from "semantic-ui-react";



import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import { handleLogin } from "../utils/auth";


const INITIAL_USER = {
	name: "",
	email: "",
	password: "",
	confirm_password: "",
};

export default function SignUp() {
	const [user, setUser] = React.useState(INITIAL_USER); //initial page user
	const [error, setError] = React.useState(""); //message from serv
	const [disabled, setDisabled] = React.useState(true); //disable form
	const [loading, setLoading] = React.useState(false); //used to show something happening while api call occurs

	//used for disabling signup button until form is filled out
	React.useEffect(() => {
		const isUser = Object.values(user).every(el => Boolean(el));

		const isSamePassword = user.password === user.confirm_password;
		isSamePassword && isUser ? setDisabled(false) : setDisabled(true); 
	}, [user]);

	//Handle any changes to form data
	function handleChange(event){
		const {name, value } = event.target;
		setUser(prevState => ({...prevState, [name]:value}));
	}

	//submit the form to api for validation
	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setLoading(true);
			setError("");

			const url = `${baseUrl}/api/signup`;
			const payload = { ...user};
			const response = await axios.post(url, payload);
			
			handleLogin(response.data);

		}catch(error) {
			catchErrors(error, setError);

		}finally{
			setLoading(false);
		}
	}

	return (
		<>
			<Message
				attached
				icon="settings"
				header="Get Started!"
				content="Create a new account"
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
						icon="user"
						iconPosition="left"
						label="Name"
						placeholder="Name"
						name="name"
						value={user.name}
						onChange={handleChange}
					/>
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
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						label="Confirm_Password"
						placeholder="Confirm Password"
						name="confirm_password"
						type="password"
						value={user.confirm_password}
						onChange={handleChange}

					/>

					<Button
						icon="signup"
						type="submit"
						color="blue"
						content="Signup"
						disabled={disabled || loading}
					/>   
				</Segment>

			</Form>
			<Message attached="bottom" warning>
				<Icon 
					name="help"
				/>
					Existing user?{" "}
				<Link href="/login">
					<a>Log in here</a>
				</Link>{" "}
					instead.
			</Message>

		</>
	);
}