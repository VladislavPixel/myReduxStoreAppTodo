export function createStore(reducer, initialState) { // Принимает Reduser и начальный state
	let state = initialState // Private variable Store
	let listeners = [] // Observers
	function getState() { // Защита через замыкание
		return state
	}
	function dispatch(action) {
		state = reducer(state, action) // dispatch дергает reducer с конкретным action и происходит возврат нового значения
		for (let i = 0; i < listeners.length; i++) { // так как dispatch был вызван нам нужно вызвать работу наблюдателей
			const listener = listeners[i]
			listener()
		}
	}
	function subscribe(listener) { // Метод вступления в члены наблюдателей
		listeners.push(listener)
	}
	return { getState, dispatch, subscribe }
}