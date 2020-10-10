import Link from "next/link";
import React from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
import { handleLogin } from "../utils/auth";


const INITIAL_USER = {
	name: "drew",
	email: "dhoffer8537@outlook.com",
	password: "1234567890"
};

export default function SignUp() {
	const [user, setUser] = React.useState(INITIAL_USER); //initial page user
	const [error, setError] = React.useState(""); //message from serv

	//Handle any changes to form data
	function handleChange(event){
		const {name, value } = event.target;
		setUser(prevState => ({...prevState, [name]:value}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setError("");
			const url = `${baseUrl}/api/signup`;
			const payload = { ...user};
			const response = await axios.post(url, payload);
			handleLogin(response.data);
		}catch(error) {
			catchErrors(error, setError);
		}
	}

	return (
		<>
			<p>{error}</p>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<input name="name" value={user.name} onChange={handleChange}
					type="text" placeholder="Name"/>
				
				<input name="email" value={user.email} onChange={handleChange}
					type="text" placeholder="Email"/>
				
				<input name="password" value={user.password} onChange={handleChange}
					type="password" placeholder="Password"/>
				<input name="confirm-password" value={user.password} onChange={handleChange}
					type="password" placeholder="Confirm Password"/>
				
				
				<button type="submit">Sign Up</button>
			</form>
			
			<p>Existing User?</p><Link href="/login"><a> Login Here</a></Link>

		</>
	);
}