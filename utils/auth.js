import cookie from "js-cookie";
import Router from "next/router";

export function handleLogin(token) {
	cookie.set("token", token);
	Router.push("/dashboard");
}

//sends them back to the given location
export function redirectUser(ctx, location) {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
}