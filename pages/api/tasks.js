import jwt from "jsonwebtoken";


import connectDb from "../../utils/connectDb";
import Task from "../../models/Task";


connectDb();


export default async (req, res) => {
	switch(req.method) {
	case "GET":
		await handleGetRequest(req, res);
		break;
	case "POST":
		console.log("Got here");
		await handlePostRequest(req, res);
		break;
	default:
		res.status(405).send(`Method ${req.method} not allowed`);
		break;
	}
};


async function handleGetRequest(req, res) {
	if (!("authorization" in req.headers)) {

		return res.status(401).send("No Authorization token");
	}
	try{
		const {userId} = jwt.verify( req.headers.authorization, process.env.JWT_SECRET);

		const tasks = await Task.find({user: userId}).populate({
			path: "tasks",
			
		}).sort({ createdAt: "desc"});

		res.status(200).json({tasks});


	} catch(error) {
		res.status(403).send("Invalid token.");

	}
}


//post /api/tasks
async function handlePostRequest(req, res) {

	if (!("authorization" in req.headers)) {

		return res.status(401).send("No Authorization token");
	}
	try{
		//get userid out of auth
		const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        
		//create a new task object with data in body as well as user ref.
		const task = new Task({
			...req.body,
			user: userId
		});
		//save them
		await task.save();
		//inform user it has been done
		res.status(201).send(task);
	}
	catch(error){
		res.status(400).send(error);
	}
}