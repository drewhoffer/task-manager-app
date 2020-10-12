import React from "react";
import { Header, Icon, Form, Message, Input, Checkbox, Segment, Button} from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";


import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";
const INITIAL_TASK = {
	title: "",
	description: "",
};

export default function Create() {
	const [task, setTask] = React.useState(INITIAL_TASK); //initial page user
	const [error, setError] = React.useState(""); //message from serv
	const [completed, setCompleted] = React.useState(false);
	const [disabled, setDisabled] = React.useState(true); //disable form
	const [loading, setLoading] = React.useState(false); //used to show something happening while api call occurs
	const [success, setSuccess] = React.useState(false);

	//used for disabling signup button until form is filled out
	React.useEffect(() => {
		const isTask = Object.values(task).every((el) => Boolean(el));
		isTask ? setDisabled(false) : setDisabled(true); 
	}, [task]);





	//submit the form to api for validation
	async function handleSubmit(event) {

		event.preventDefault();
		try {
			setLoading(true);
			setError("");
            
			const token = cookie.get("token");
			const newTask = {...task, completed};
			const url = `${baseUrl}/api/tasks`;
			const payload = {...newTask }; 
			const headers = {headers: { Authorization: token} };
			await axios.post(url, payload, headers);
            
			setTask(INITIAL_TASK);
			setCompleted(false);
			setSuccess(true);

		}catch(error) {
			catchErrors(error, setError);

		}finally{
			setLoading(false);
		}
	}



	//Handle any changes to form data
	function handleChange(event){
		const {name, value } = event.target;

		setTask(prevState => ({...prevState, [name]:value}));
	}

	function handleToggleChange(_event,{checked} ) {
		setCompleted(!checked);
	}

	return (
		<>
			<Header as="h2" block>
				<Icon name="add" color="orange"/>
                Create New Task
			</Header>
            
			<Form loading={loading} error={Boolean(error)} success = {success} onSubmit={handleSubmit}>
				<Message
					error
					header="Oops!"
					content= {error}
				/>
				<Message
					success
					icon="check"
					header="Success!"
					content="Your Task has been created"
				/>
				<Segment>
					<Form.Field
						control={Input}
						name="title"
						label="Title"
						placeholder="Title"
						value={task.title}
						type="text"
						onChange={handleChange}
					/>
					<Form.Field
						control={Input}
						name="description"
						label="Description"
						placeholder="Description"
						value={task.description}
						type="text"
						onChange={handleChange}

					/>
                    
					<Form.Field >
						<Checkbox 
							toggle 
							name="completed"
							label="Completed"
							checked={task.completed}
							onChange={handleToggleChange}
						/>
					</Form.Field>

					<Form.Field
						control={Button}
						disabled={loading || disabled}
						color="blue"
						icon="pencil alternate"
						content="Submit"
						type="submit"
					/>

				</Segment>
			</Form>
		</>
	);
    
}