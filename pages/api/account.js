import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";


connectDb();

export default async (req, res) => {
	switch(req.method) {
	case "GET":
		await handleGetRequest(req, res);
		break;
	default:
		res.status(405).send(`Method ${req.method} not allowed`);
		break;
	}
};

async function handleGetRequest ( req, res )  {
	if (!("authorization" in req.headers)) {
		return res.status(401).send("No Authorization token");
	}

	try {
        
		const { userId } = jwt.verify(req.headers.authorization,
			process.env.JWT_SECRET);
		const user = await User.findOne({ _id: userId });
		
		if (user) {
			return res.status(200).json(user);

		} else {
			return res.status(404).send("User not found");

		}
	} catch ( error ){
		return res.status(403).send("Invalid token");

	}

}