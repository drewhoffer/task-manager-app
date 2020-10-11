import Link from "next/link";
import { Divider, Header, Grid, Message } from "semantic-ui-react";


//Steps 1. Landing page with header and footer
export default function Home() {
	return (
		<>
			<Grid container style={{ padding: "5em 0em" }}>
				<Grid.Row>
					<Grid.Column>
						<Message>
							<Header as="h1">Welcome!</Header>
							<p>
							I made this example up to showcase a simple user creation system.
							</p>
						Existing user?{" "}
							<Link href="/login">
								<a>Log in here</a>
							</Link>
							<Divider horizontal>Or</Divider>
						New user?{" "}
							<Link href="/signup">
								<a>Log in here</a>
							</Link>
						</Message>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
}
