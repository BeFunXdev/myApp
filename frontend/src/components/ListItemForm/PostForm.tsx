import { Button, CircularProgress, ListItem } from '@mui/material'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'
import { IPostResponse, TypePostFormState } from '@/types/post.types'
import { useCreatePost } from '@/app/hooks/useCratePost'
import useUpdatePost from '@/app/hooks/useUpdatePost'

interface IPostItemForm {
	item: IPostResponse
	setIsActive: () => void
	setItems: Dispatch<SetStateAction<IPostResponse[] | undefined>>
}

const PostItemForm = ({setItems, item, setIsActive}: IPostItemForm) => {
	const { register, handleSubmit } = useForm<TypePostFormState>({
		defaultValues: {
			name: item.name
		}
	})

	const {createPost, isCreatePending} = useCreatePost()
	const {updatePost, isUpdatePending} = useUpdatePost()

	const onSubmit = (data: any) => {
		console.log(data)
		setIsActive()
		item.id ? updatePost({id: item.id, data}) : createPost(data)
	}

	return (
		<ListItem>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('name')} />
				<Button type={'submit'} variant="contained" disabled={isUpdatePending || isCreatePending}>
					{(isUpdatePending || isCreatePending) ?? <CircularProgress size={15} />}
					Save
				</Button>
				<Button onClick={() => {
					setIsActive()
					setItems(prev => prev?.slice(0, -1))
				}} variant="contained">Delete</Button>
			</form>
		</ListItem>
	)
}

export default PostItemForm