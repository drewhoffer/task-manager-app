import { parseCookies, destroyCookie} from "nookies";
import axios from "axios";

import baseUrl from "../utils/baseUrl";
import DashboardTasks from "../components/Dashboard/DashboardTasks";

export function Dashboard ({ user, tasks }) {
	return (
		<>
			<h1>Hello {user.name}</h1>
			<DashboardTasks tasks = {tasks}/>
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
		try {
			const payload = { headers: { Authorization: token}};
			const url = `${baseUrl}/api/tasks`;
			const response = await axios.get(url, payload);
			return response.data;
		}catch(error) {
			//throw out the invalid token
			//redirect to login
			destroyCookie(ctx, "token");
			return {
				tasks: []
			};
		}

	}
};

export default Dashboard;