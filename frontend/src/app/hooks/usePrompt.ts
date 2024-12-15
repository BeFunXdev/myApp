import { useState } from 'react'
import { promptApiService } from '@/service/promptApi.service'

export function usePrompt() {
	const [prompt, setPrompt] = useState<{employeeId: string, message: string}>()

	const getPrompt = async (employeeId: string) => {
		setPrompt({employeeId, message: await promptApiService.prompt(employeeId).then(data => data.data.messages.content)})
	}

	return {getPrompt, prompt}
}