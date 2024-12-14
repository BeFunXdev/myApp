import { Button, CircularProgress, List, ListItem, ListItemIcon } from '@mui/material'
import { usePost } from '@/app/hooks/usePost'
import AddPostItem from '@/components/AddListItem/PostItem'
import PostForm from '@/components/ListItemForm/PostForm'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useDeletePost from '@/app/hooks/useDeletePost'
import EditIcon from '@mui/icons-material/Edit';

const PostView = () => {
	const {items, setItems, isSuccess, isLoading} = usePost()
	const [isCreatedPost, setIsCreatedPost] = useState(false)
	const [editId, setEditId] = useState('')

	const {deletePost, isDeletePending} = useDeletePost()

	const reset = () => {
		setIsCreatedPost(false)
		setEditId('')
	}

	return(
		<List>
			<AddPostItem setItems={setItems} setIsActive={setIsCreatedPost} disabled={isCreatedPost}/>
			{isLoading ? <div>Loading</div> : (
				items?.map((item, index) => {
					return item.id == '' || item.id == editId? (
						<PostForm key={item.id} item={item} setItems={setItems} setIsActive={reset}/>
					) : (
						<ListItem key={item.id} >
							{item.name}
							<ListItemIcon>
								<Button onClick={() => {
									setEditId(item.id)
								}}>
									{isDeletePending ? <CircularProgress size={15} /> : <EditIcon fontSize={'small'} />}

								</Button>
								<Button onClick={() => {
									deletePost(item.id)
								}}>
									{isDeletePending ? <CircularProgress size={15} /> : <DeleteOutlineIcon fontSize={'small'} />}

								</Button>
							</ListItemIcon>
						</ListItem>
					)
				})
			)}
		</List>
	)
}

export default PostView