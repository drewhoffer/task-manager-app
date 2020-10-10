const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
	title:{
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed:{
		type: Boolean,
		default: false
	},
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}

}, {
	timestamps: true
});




//prevent overwrite of task model once compiled
export default mongoose.models.Task || mongoose.model("Task", taskSchema);