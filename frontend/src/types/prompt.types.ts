export interface IPromptResponse {
	model: string
	messages: {
		role: string
		content: string
	}
}