import axiosClassic from '@/api/interceptors'
import { IPromptResponse } from '@/types/prompt.types'

class PromptApiService {
	BASE_URL = '/ai-api'

	async prompt(employeeId: string) {
		return await axiosClassic.get<IPromptResponse>(this.BASE_URL + '/' + employeeId)
	}
}

export const promptApiService = new PromptApiService()