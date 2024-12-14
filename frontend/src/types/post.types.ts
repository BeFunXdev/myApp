export interface IPostResponse {
	id: string
	name: string
}

export type TypePostFormState = Partial<Omit<IPostResponse, 'id'>>