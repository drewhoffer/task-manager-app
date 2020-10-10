import mongoose from "mongoose";


const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema ({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 25
	},
	email : {
		type: String,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true,
		minlength: 5,
		trim: true
	},
	avatar:{
		type: Buffer
	}
}, {
	timestamps: true
});


userSchema.virtual("tasks",{
	ref: "Task",
	localField: "_id",
	foreignField: "owner"
});




//prevent overwrite of user model once compiled
export default mongoose.models.User || mongoose.model("User", userSchema);