

export function Dashboard ({ user }) {
	return (
		<>
			<h1>Hello {user.name}</h1>
		</>
	);
}

//needed as this is a protected route
// Dashboard.getInitialProps = async (ctx) => {
//     // const { token } = parseCookies(ctx);
//     // console.log("Token in dashboard props", token);
//     // if (!token) {
//     //     //they arent authenticated, give them a blank set of tasks
//     //     return {
//     //         tasks: []
//     //     }
//     // } else {
//     //     const payload = { headers: { Authorization: token}};
//     //     const url = `${baseUrl}/api/tasks`;
//     //     const response = await axios.get(url, payload);
//     //     return response.data;
//     // }

// }

export default Dashboard;