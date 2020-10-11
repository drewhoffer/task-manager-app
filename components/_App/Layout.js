import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export const siteTitle = "Task Manager App";



export default function Layout ({ children, user }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="og:title" content={siteTitle} />
				<title>{siteTitle}</title>
			</Head>
			<Header user={user}/>
			{children}
			<Footer />
		</>
	);
}