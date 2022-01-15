import "./style.css"
import React, { useEffect } from "react"
import { Provider, useSelector, useDispatch } from "react-redux"
import ReactDOM from "react-dom"
import {
	completeTask,
	deleteTask,
	updateTitle,
	loadTasks,
	getTasks,
	getTasksLoading,
	createTask
} from "./store/task"
import { getErrors } from "./store/errors"
import createStore from "./store/store"

const store = createStore()

const App = () => {
	const stateTasks = useSelector(getTasks())
	const tasksLoading = useSelector(getTasksLoading())
	const stateErrors = useSelector(getErrors())
	const dispatch = useDispatch()
	console.log(stateTasks)
	useEffect(() => {
		dispatch(loadTasks())
	}, [dispatch])
	return (
		(tasksLoading && <div className="lds-hourglass"></div>) ||
		(!tasksLoading && stateErrors.length > 0 &&
		<div style={{ color: "red" }}>{stateErrors.map((er, index) => <div key={index}>{er}</div>)}</div>) ||
		<React.Fragment>
			<h1>React - Redux</h1>
			{tasksLoading !== true && <button style={{ background: "green" }} onClick={() => {
				dispatch(createTask())
			}}>Add Tasks</button>}
			<ul>
				{stateTasks.map((task) => {
					const styless = task.color === "green" ? {color: "green", fontWeight: 800} : null
					return (
						<li key={task.id}>
							<p style={styless}>{task.title}</p>
							<p style={{color: "blue"}}>{`Completed: ${task.completed}`}</p>
							<button onClick={() => {
								dispatch(completeTask(task.id))
							}}>Update Status Task</button>
							<button onClick={() => {
								dispatch(updateTitle(task.id))
							}}>Change Title</button>
							<button onClick={() => {
								dispatch(deleteTask(task.id))
							}}>Delete Task</button>
							<hr />
						</li>
					)
				})}
			</ul>
		</React.Fragment>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
)
