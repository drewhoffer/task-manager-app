
import Link from "next/link";

export default function Login() {
	return (
		<>
			<h1>Login</h1>
			<input type="text" placeholder="Email"/>
			<input type="password" placeholder="Password"/>
			<button >Login</button>
			<p>New User?</p><Link href="/signup"><a>Create Account</a></Link>

		</>
	);
}