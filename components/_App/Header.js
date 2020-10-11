import Link from "next/link";
import Router, { useRouter } from "next/router";
import React from "react";
import NProgress from "nprogress";
import { Menu, Container, Icon } from "semantic-ui-react";

import { handleLogout } from "../../utils/auth";

//handles top bar loading when doing actions
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Logout = React.forwardRef(({ onClick, href }, ref) => {
	return (
		<a href={href} onClick={onClick} ref={ref}>
		Logout
		</a>
	);
});
Logout.displayName = "Logout";

export default function Header ({ user }) {

	const router = useRouter();
	//Used for styling which link the user is currently on 
	function isActive(route){
		return route === router.pathname;
	}
	return (
		<Menu stackable fluid id="menu" inverted>
			<Container text>
				{user ? (
					<>
						<Link href="/dashboard">
							<Menu.Item header active={isActive("/dashboard")}>
								<Icon
									size="large"
									name="dashboard"
								/>
								Dashboard
							</Menu.Item>
						</Link>
						<Menu.Item header onClick={ handleLogout }>
							<Icon
								size="large"
								name="sign out"
							/>
							Logout
						</Menu.Item>
					</>
				)
					: 
					(
						<>
							<Link href="/">
								<Menu.Item header active={isActive("/")}>
									<Icon 
										name="home"
										size="large"
									/>
								Home
								</Menu.Item>
							</Link>
							<Link href="/login">
								<Menu.Item header active={isActive("/login")}>
									<Icon 
										name="sign in"
										size="large"
									/>
								Login
								</Menu.Item>
							</Link>
							<Link href="/signup">
								<Menu.Item header active={isActive("/signup")}>
									<Icon 
										name="signup"
										size="large"
									/>
								Sign up
								</Menu.Item>
							</Link>
						</>
					)}
			</Container>
				

		</Menu>
	);
}