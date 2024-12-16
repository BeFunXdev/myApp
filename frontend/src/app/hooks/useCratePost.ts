import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypePostFormState } from '@/types/post.types'
import { postService } from '@/service/post.service'

export function useCreatePost () {
	const queryClient = useQueryClient()

	const { mutate: createPost, isPending: isCreatePending } = useMutation({
		mutationKey: ['create post'],
		mutationFn: (data: TypePostFormState) => postService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['post']
			})
		}
	})

	return { createPost, isCreatePending }
}