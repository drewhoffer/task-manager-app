import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

//This function takes a name, email, password, checks them against some vals and throws
//a string with error if does not meet expectations
//else returns true
export default function (name, email, password) {
	if (!isLength(name, { min: 3, max: 25})) {
		throw "Name must be 3-25 characters long";
	}else if (!isLength( password, { min: 5 })){
		throw "Password must be at least 5 characters long";
	} else if (!isEmail(email)) {
		throw "Email must be valid";
	}
	return true;
}