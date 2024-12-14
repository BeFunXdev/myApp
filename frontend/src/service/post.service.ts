import axiosClassic from '@/api/interceptors'
import { IPostResponse } from '@/types/post.types'
import { TypeEmployeeFormState } from '@/types/employee.types'

class PostService {
	BASE_URL = '/post'

	async getAll() {
		return await axiosClassic.get<IPostResponse[]>(this.BASE_URL)
	}

	async create(name: TypeEmployeeFormState) {
		return await axiosClassic.post<IPostResponse>(this.BASE_URL, name)
	}

	async update(postId: string, data: Partial<TypeEmployeeFormState>) {
		return await axiosClassic.put(this.BASE_URL + '/' + postId, data)
	}

	async delete(postId: string) {
		return await axiosClassic.delete(this.BASE_URL + '/' + postId)
	}
}

export const postService = new PostService()