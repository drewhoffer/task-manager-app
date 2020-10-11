import Link from "next/link";
import React from "react";

import { handleLogout } from "../../utils/auth";


const Logout = React.forwardRef(({ onClick, href }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref}>
		Logout
		</a>
	);
});
Logout.displayName = "Logout";

export default function Header ({ user }) {
	return (
		<>
			{user ? (
				<>
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/login" passHref>
						<Logout onClick={handleLogout}/>

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