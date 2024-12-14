import { Dispatch, SetStateAction } from 'react'
import {
	ListItemButton, ListItemButtonProps,
	ListItemIcon,
	ListItemText
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { IPostResponse } from '@/types/post.types'

export interface IListAddItemInput extends ListItemButtonProps {
	setItems: Dispatch<SetStateAction<IPostResponse[] | undefined>>
	setIsActive: Dispatch<SetStateAction<boolean>>
}
const AddPostItem = ({setItems, setIsActive, ...rest}: IListAddItemInput) => {
	const addItem = () => {
		setIsActive(true)
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: ''
				}
			]
		})
	}

	return (
		<ListItemButton onClick={addItem} {...rest}>
			<ListItemIcon>
				<AddIcon />
			</ListItemIcon>
			<ListItemText primary="Добавить новую должность" />
		</ListItemButton>
	)
}

export default AddPostItem