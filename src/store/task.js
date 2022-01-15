import { createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service"
import { setError } from "./errors"

const initialState = {
	entities: [],
	isLoading: true
}

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		recived(state, action) {
			state.entities = action.payload
			state.isLoading = false
		},
		updated(state, action) {
			const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
			state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}
		},
		deleted(state, action) {
			state.entities = state.entities.filter(task => task.id !== action.payload.id)
		},
		created(state, action) {
			state.entities.unshift(action.payload)
		},
		requested(state) {
			state.isLoading = true
		},
		requestFailed(state) {
			state.isLoading = false
		}
	}
})

const { actions, reducer:taskReducer } = taskSlice
const { recived, updated, deleted, requested, requestFailed, created } = actions

export const loadTasks = () => {
	return async (dispatch) => {
		dispatch(requested())
		try {
			const data = await todosService.fetch()
			dispatch(recived(data))
		} catch(error) {
			dispatch(requestFailed())
			dispatch(setError(error.message))
		}
	}
}
// actions
export const completeTask = (id) => {
	return (dispatch, getState) => {
		dispatch(updated({ id: id, completed: true }))
	}
}
export const createTask = () => {
	return async(dispatch, getState) => {
		try{
			const data = await todosService.create()
			dispatch(created(data))
		} catch(error) {
			dispatch(setError(error.message))
		}
	}
}
export function updateTitle(id) {
	return (dispatch, getState) => {
		dispatch(updated({ id: id, title: `New title for ${id}` }))
	}
}
export function deleteTask(id) {
	return (dispatch, getState) => {
		dispatch(deleted({ id: id }))
	}
}
// selectors
export function getTasks () {
	return (state) => state.tasks.entities
}
export function getTasksLoading () {
	return (state) => state.tasks.isLoading
}

export default taskReducer
