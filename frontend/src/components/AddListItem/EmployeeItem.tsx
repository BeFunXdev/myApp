import { Dispatch, SetStateAction } from 'react'
import {TypeEmployeeFormState} from '@/types/employee.types'
import { ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export interface IListAddItemInput extends ListItemButtonProps {
	setItems: Dispatch<SetStateAction<TypeEmployeeFormState[] | undefined>>
	setIsActive: Dispatch<SetStateAction<boolean>>
}
const AddEmployeeItem = ({setItems, setIsActive, ...rest}: IListAddItemInput) => {
	const addItem = () => {
		setItems(prev => {
			if (!prev) return

			setIsActive(true)

			return [
				...prev,
				{
					id: '',
					name: '',
					surname: '',
					middleName: '',
					post: ''
				}
			]
		})
	}

	return (
		<ListItemButton onClick={addItem} {...rest}>
			<ListItemIcon>
				<AddIcon />
			</ListItemIcon>
			<ListItemText primary="Добавить новго сотрудника" />
		</ListItemButton>
	)
}

export default AddEmployeeItem