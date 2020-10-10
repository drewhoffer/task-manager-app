import Link from "next/link";


export default function Header () {
	return (
		<>
			<Link href="/">
				<a>Home</a>
			</Link>
			<Link href="/signup">
				<a>Sign up</a>
			</Link>
			<Link href="/login">
				<a>Login</a>
			</Link>
		</>
	);
}