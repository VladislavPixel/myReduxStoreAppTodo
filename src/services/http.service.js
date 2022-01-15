import axios from "axios"

const http = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com/"
})

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch,
	options: http.options
}

export default httpService
