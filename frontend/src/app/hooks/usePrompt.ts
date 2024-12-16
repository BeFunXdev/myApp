import { useState } from 'react'
import { promptApiService } from '@/service/promptApi.service'

export function usePrompt() {
	const [prompt, setPrompt] = useState<{[name: string]: string}>({})
	const [isLoadingPrompt, setIsLoadingPrompt] = useState(false)

	const getPrompt = async (employeeId: string) => {
		setIsLoadingPrompt(true)
		// setPrompt({employeeId, message: await promptApiService.prompt(employeeId).then(data => {
		// 		setIsLoadingPrompt(false)
		// 		return  data.data.choices[0].message.content
		// 	})})
		const data = await promptApiService.prompt(employeeId).then(data => data.data.choices[0].message.content)
		setPrompt(prev => {
			setIsLoadingPrompt(false)
			prev[employeeId] = data
			return {...prev}
		})
	}

	return {getPrompt, prompt, isLoadingPrompt}
}