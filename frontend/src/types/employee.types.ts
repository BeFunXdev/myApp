import { IPostResponse } from '@/types/post.types'

export interface IEmployeeResponse {
	id: string
	name: string
	surname: string
	middleName: string
	DateOfEmployment: string
	post: string | IPostResponse
}

export type TypeEmployeeFormState = Partial<Omit<IEmployeeResponse, 'id' | 'DateOfEmployment'>>
