import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import connectDb from "../../utils/connectDb";
import validateSignup from "../../utils/validateSignup";

connectDb();

//We need to take a request, check if the user is in the database or not, 
//and if so then return the appropriate message
export default async (req, res) => {
	const { name, email, password } = req.body; //for now, later we want avatar
	try {
		try {

			validateSignup(name, email, password);
			const user = await User.findOne( { email });
			//check if they exist
			if (user) {
				return res.status(422).send("That email is already in use.");
			}
			//they dont so lets hash their password and add them
			const hash = await bcrypt.hash(password, 10);

			//add that user
			//later on we want avatar here as well
			const newUser = await new User( {
				name,
				email, 
				password: hash
			}).save();
            
			//create token now (this step is skipped if you want to await an activation email)
			const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, {
				expiresIn: "1s"
			});

			res.status(201).json(token);
		}
		catch(e) {
			return res.status(422).send(e);
		}
	}
	catch(e) {
		res.status(500).send("Error signing up user, please try again later.");
	}

};