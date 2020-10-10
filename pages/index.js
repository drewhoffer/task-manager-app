import Link from "next/link";

//Steps 1. Landing page with header and footer
export default function Home() {
	return (
		<>

			<section>
				<h1>Welcome to My Task Manager App</h1>
				<Link href="/signup">
					<a>Click here to sign up</a>
				</Link>
      
				<Link href="/login">
					<a>Click here to login</a>
				</Link>

			</section>
		</>
	);
}
