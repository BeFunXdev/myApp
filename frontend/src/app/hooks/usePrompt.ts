import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { promptApiService } from '@/service/promptApi.service'
import { IPromptResponse } from '@/types/prompt.types'

export function usePrompt() {
	const [prompt, setPrompt] = useState<{employeeId: string, message: string}>()

	const getPrompt = async (employeeId: string) => {
		setPrompt({employeeId, message: await promptApiService.prompt(employeeId).then(data => data.data.messages.content)})
	}

	return {getPrompt, prompt}
}