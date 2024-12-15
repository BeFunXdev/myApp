import { useState } from 'react'
import { promptApiService } from '@/service/promptApi.service'

export function usePrompt() {
	const [prompt, setPrompt] = useState<{employeeId: string, message: string}>()

	const getPrompt = async (employeeId: string) => {
		setPrompt({employeeId, message: await promptApiService.prompt(employeeId).then(data => data.data.choices[0].message.content)})
	}

	return {getPrompt, prompt}
}