import axios, {type CreateAxiosDefaults} from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'http://backend/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

export default axiosClassic
