import httpService from "./http.service"

const todosEndPoint = "todos/"

const todosService = {
	fetch: async() => {
		const { data } = await httpService.get(todosEndPoint, {
			params: {
				_page: 1,
				_limit: 10
			}
		})
		return data
	},
	create: async() => {
		const newObject = {
			title: "My title very nice",
			completed: false
		}
		const { data } = await httpService.post(todosEndPoint, newObject)
		data.id = Math.random() + Math.random() + 1
		data.color = "green"
		return data
	}
}

export default todosService
