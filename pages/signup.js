
import Link from "next/link";

export default function Login() {
	return (
		<>
			<h1>Sign Up</h1>
			<input type="text" placeholder="Email"/>
			<input type="password" placeholder="Password"/>
			<input type="password" placeholder="Confirm Password"/>
			<button >Sign Up</button>
			<p>Existing User?</p><Link href="/login"><a> Login Here</a></Link>

		</>
	);
}