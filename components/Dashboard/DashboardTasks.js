import { Header, Icon, Accordion, Label, Container, Divider  } from "semantic-ui-react";


import formatDate from "../../utils/formatDate";

export default function DashboardTasks ({tasks}) {
    
	function mapTasksToPanels(tasks) {
		return tasks.map(task => ({
			key: task._id,
			title: {
				content: <Label color="blue" content = {formatDate(task.createdAt)}/>
			},
			content: {
				content: (
					<>
						<Container>
							<Header as="h2">Title{task.title}</Header>
							<Divider/>
							<Header as="h4">Description</Header>
							<p>{task.description}</p>
							<Header as="h4">Completed</Header>
							<p>{task.completed.toString()}</p>
						</Container>
					</>
				)
			}
		}));
	}



	return (<>
		<Header as="h2">
			<Icon name="folder open"/>
      Tasks
		</Header>
		{tasks.length === 0 ? (
			<>
      no tasks
			</>
		) : (
			<Accordion
				fluid
				styled
				exclusive={false}
				panels={mapTasksToPanels(tasks)}/>
		)}
	</>);

}