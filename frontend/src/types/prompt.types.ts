export interface IPromptResponse {
	choices: [
		{
			message: {
				content: string
			}
		}
	]
}