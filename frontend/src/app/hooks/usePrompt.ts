import { useState } from 'react'
import { promptApiService } from '@/service/promptApi.service'

export function usePrompt() {
	const [prompt, setPrompt] = useState<{employeeId: string, message: string}>()
	const [isLoadingPrompt, setIsLoadingPrompt] = useState(false)

	const getPrompt = async (employeeId: string) => {
		setIsLoadingPrompt(true)
		setPrompt({employeeId, message: await promptApiService.prompt(employeeId).then(data => {
				setIsLoadingPrompt(false)
				return  data.data.choices[0].message.content
			})})
	}

	return {getPrompt, prompt, isLoadingPrompt}
}