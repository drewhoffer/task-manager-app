import { parseCookies} from "nookies";
import axios from "axios";

import baseUrl from "../utils/baseUrl";

export function Dashboard ({ user, tasks }) {
	return (
		<>
			<h1>Hello {user.name}</h1>
			<ul>
				{tasks.map((task) => (
					<>
						<p>title: {task.title}</p>
						<p>description: {task.description}</p>
						<p>completed: {task.completed}</p>
					</>)
				)}
			</ul>
		</>
	);
}

//needed as this is a protected route
Dashboard.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx);
	if (!token) {
		//they arent authenticated, give them a blank set of tasks
		return {
			tasks: []
		};
	} else {
		const payload = { headers: { Authorization: token}};
		const url = `${baseUrl}/api/tasks`;
		const response = await axios.get(url, payload);
		return response.data;
	}

};

export default Dashboard;