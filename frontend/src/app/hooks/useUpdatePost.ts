import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypePostFormState } from '@/types/post.types'
import { postService } from '@/service/post.service'

const useUpdatePost = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updatePost, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update post', key],
		mutationFn: ({ id, data }: { id: string; data: TypePostFormState }) => {
			console.log(data)
			return  postService.update(id, data)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['post']
			})
		}
	})

	return {updatePost, isUpdatePending}
}

export default useUpdatePost