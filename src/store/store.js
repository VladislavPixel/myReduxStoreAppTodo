import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import taskReducer from "./task"
import errorReducer from "./errors"
import { logger } from "./middleware/logger"

const rootReducer = combineReducers({
	tasks: taskReducer,
	errors: errorReducer
})

function createStore() {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
		devTools: process.env.NODE_ENV !== "production"
	})
}

export default createStore
