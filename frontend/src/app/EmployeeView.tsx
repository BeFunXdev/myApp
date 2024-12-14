import { useEmployee } from '@/app/hooks/useEmployee'
import { Button, CircularProgress, List, ListItem, ListItemIcon } from '@mui/material'
import AddListItem from '@/components/AddListItem/EmployeeItem'
import EmployeeItemForm from '@/components/ListItemForm/EmployeeForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import useDeleteEmployee from '@/app/hooks/useDeleteEmployee'
import { useState } from 'react'
import styled from './page.module.scss'
import MessageIcon from '@mui/icons-material/Message';
import { usePrompt } from '@/app/hooks/usePrompt'

const EmployeeView = () => {
	const {items, setItems, isLoading} = useEmployee()
	const [isCreating, setIsCreating] = useState(false)
	const [editId, setEditId] = useState('')

	const {deleteEmployee, isDeletePending} = useDeleteEmployee()

	const {getPrompt, prompt} = usePrompt()

	const reset = () => {
		setIsCreating(false)
		setEditId('')
	}

	return(
		<List>
			<AddListItem setItems={setItems} setIsActive={setIsCreating} disabled={isCreating}/>
			{isLoading ? <div>Loading</div> : (
				items?.map((item) => {
					return item.id == '' || item.id == editId ? (
						<EmployeeItemForm key={item.id} setIsActive={reset} item={item} setItems={setItems}/>
					) : (
						<ListItem key={item.id}>
							<strong className={styled.employeeRow}>ФИО:</strong> {item.surname} {item.name} {item.middleName}
							<strong className={styled.employeeRow}>Должность: </strong> {item.post.name}
							<strong className={styled.employeeRow}>Дата принятия на работу:</strong> {new Date(item.DateOfEmployment).toLocaleDateString()}
							<ListItemIcon>
								<Button onClick={async () => {
									await getPrompt(item.id)
								}}>
									{isDeletePending ? <CircularProgress size={15} /> : <MessageIcon fontSize={'small'} />}
								</Button>
								<Button onClick={() => {
									setEditId(item.id)
								}}>
									{isDeletePending ? <CircularProgress size={15} /> : <EditIcon fontSize={'small'} />}
								</Button>
								<Button onClick={() => {
									deleteEmployee(item.id)
								}}>
									{isDeletePending ? <CircularProgress size={15} /> : <DeleteOutlineIcon fontSize={'small'} />}
								</Button>
							</ListItemIcon>
							{prompt && prompt.employeeId == item.id ? prompt.message : ''}
						</ListItem>
					)
				})
			)}
		</List>
	)
}

export default EmployeeView