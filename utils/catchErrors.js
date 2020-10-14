
//basically here i can set an error message and make this act as a catch all
//what i can do is link this function up with my setError i have on front end 
//This means that i can handle errors iwth this function to save code time
function catchErrors (error, displayError) {
	let errorMessage;
	if (error.response) {
		//the request was made and server responded with a 
		//status code not in range of 2XX
		errorMessage = error.response.data;

		//for cloudinary image uploads
		if (error.response.data.error) {
			errorMessage =  error.response.data.error.message;
		}
	}
	else if (error.request){
		//reqquest was made with no response
		errorMessage = error.request;
	}
	displayError(errorMessage);
}


export default catchErrors;