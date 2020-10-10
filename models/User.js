import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import Task from "./Task";


const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema ({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email : {
		type: String,
		required: true,
		unique: true
	},
	tokens: [{
		token:{
			type: String,
			required: true
		}
	}],
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


//Remove a user
userSchema.methods.toJSON = function () {
	const user = this;
	let userObject = user.toObject();
	userObject.tokens = null;
	userObject = null;
	return userObject;
};


//Generate a token for user when they sign in and make it expire after given time
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: "3 days"});


	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};


//Find a user based on email given
userSchema.statics.findByCredentials = async (email, password) =>{
	const user = await User.findOne({email});
	if (!user){
		throw new Error("Invalid email or password!");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch){
		throw new Error("Invalid email or password!");
	}

	return user;

};

//Securely encrypt user password using bcrypt
userSchema.pre("save", async function(next) {	
	const user = this;
	if (user.isModified("password")){
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();

});

//Remove related tasks if a user removes their account
userSchema.pre("remove", async function (next){
	const user = this;
	await Task.deleteMany({owner: user._id});
	next();
});


const User = mongoose.model("User", userSchema);


module.exports = User;