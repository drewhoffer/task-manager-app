import Router from "next/router";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import App from "next/app";


import Layout from "../components/_App/Layout";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

/*So the idea with nextjs isnt that each individual page has authentication
	Instead what we want to do is basically render the page then fetch with axios the data
	that way the page loads quickly and the data will only come if auth passes
	To do this we need to wrap everything in a HOC to ensure that it can see the ctx and
	redirect accordingly

*/

class MyApp extends App {

	
	static async getInitialProps({ Component, ctx}) {
		// eslint-disable-next-line no-unused-vars
		const { token } = parseCookies(ctx);

		//grab token from cookies
		//get data ready to be initialized
		let pageProps = {};

		//So each page that we are loading i think is a component
		//Because of this the getInitialProps runs for the page
		//So protected routes need a getInitialProps function with checking for tokens
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		if(!token) {
			//here is where we list our protected routes
			const isProtectedRoute = ctx.pathname === "/dashboard" || ctx.pathname === "/create";
			if (isProtectedRoute) {
				redirectUser(ctx, "/login");
			}
			
		} else {
			//they have a token
			try {
				//lets connect to the route
				const payload = { headers: {Authorization: token } };
				const url = `${baseUrl}/api/account`;
				const response = await axios.get(url, payload);
				const user = response.data;
				pageProps.user = user;
				//if logged in do not allow them to go back to login page
				if (ctx.pathname === "/login" && user) {
					redirectUser(ctx, "/dashboard");

				}
			}catch(error) {
				//throw out the invalid token
				destroyCookie(ctx, "token");
				//redirect to login
				redirectUser(ctx, "/");
			}
		}
		return { pageProps };

	}

	//needed to logoout on multiple tabs if the user is utilizing many
	componentDidMount() {
		window.addEventListener("storage", this.syncLogout);
	}

	//If user logs out on one tab we want to log them out and bring all tabs to login
	syncLogout (event) {
		if (event.key === "logout"){
			Router.push("/login");
		}
	}

	render () {

		const { Component, pageProps } = this.props;
		return (
			<Layout { ...pageProps}>
				<Component { ...pageProps}/>
			</Layout>);
	}

	
}

export default MyApp;
