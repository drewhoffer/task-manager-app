import React from "react";
import Link from "next/link";
import axios from "axios";


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

	function handleChange(event){
		const {name, value } = event.target;
		setUser(prevState => ({...prevState, [name]:value}));
	}

	async function handleSubmit(event){
		event.preventDefault();
		try{
			setError("");
			const url = `${baseUrl}/api/login`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
			handleLogin(response.data);
		}catch(error){
			catchErrors(error, setError);
		}

	}
	return (
		<>
			<p>{error}</p>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<input  name="email" value={user.email} onChange={handleChange} 
					type="text" placeholder="Email"/>

				<input name="password" value={user.password} onChange={handleChange}
					type="password" placeholder="Password"/>

				<button type="submit">Login</button>
				<p>New User?</p><Link href="/signup"><a>Create Account</a></Link>
			</form>


		</>
	);
}