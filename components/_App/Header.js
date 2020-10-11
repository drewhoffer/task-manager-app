import Link from "next/link";


export default function Header ({ user }) {
	return (
		<>
			{user ? (
				<>
					<Link href="/">
						<a>Home</a>
					</Link>

					<Link href="/logout">
						<a>Logout</a>
					</Link>
				</>
			):(
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
			)}
		</>
	);
}