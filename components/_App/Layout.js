import Head from "next/head";
import { Container } from "semantic-ui-react";


import Header from "./Header";

export const siteTitle = "Task Manager App";



export default function Layout ({ children, user }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="og:title" content={siteTitle} />
				<link rel="stylesheet" type="text/css" href="/static/styles.css" />
				<link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
				<link
					rel="stylesheet"
					href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
				/>
				<title>{siteTitle}</title>
			</Head>
			<Header user={user}/>
			<Container text style= {{ paddingTop: "1em"}} >
				{children}
			</Container>
		</>
	);
}