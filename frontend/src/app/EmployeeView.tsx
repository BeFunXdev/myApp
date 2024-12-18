import { useEmployee } from '@/app/hooks/useEmployee'
import {Button, CircularProgress, Divider, List, ListItem, ListItemIcon, Skeleton} from '@mui/material'
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

	const {getPrompt, prompt, isLoadingPrompt} = usePrompt()

	const reset = () => {
		setIsCreating(false)
		setEditId('')
	}

	return(
		<List>
			<AddListItem setItems={setItems} setIsActive={setIsCreating} disabled={isCreating}/>
			{isLoading ? (
				<div className={styled.skeletonRow}>
					<Skeleton variant="rounded" width={'100%'} height={48} />
					<Skeleton variant="rounded" width={'100%'} height={48} />
					<Skeleton variant="rounded" width={'100%'} height={48} />
					<Skeleton variant="rounded" width={'100%'} height={48} />
				</div>
			) : (
				items?.map((item) => {
					return item.id == '' || item.id == editId ? (
						<EmployeeItemForm key={item.id} setIsActive={reset} item={item} setItems={setItems}/>
					) : (
						<ListItem key={item.id} style={{flexWrap: 'wrap'}}>
							<strong className={styled.employeeRow}>ФИО:</strong> {item.surname} {item.name} {item.middleName}
							<strong className={styled.employeeRow}>Должность: </strong> {typeof item.post == 'object' ? item.post.name : item.post}
							<strong className={styled.employeeRow}>Дата принятия на работу:</strong> {new Date(item.DateOfEmployment).toLocaleDateString()}
							<ListItemIcon>
								<Button disabled={isLoadingPrompt} onClick={async () => {
									await getPrompt(item.id)
								}}>
									{isLoadingPrompt ? <CircularProgress size={15} /> : <MessageIcon fontSize={'small'} />}
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
							<div style={{flex: '1 0 100%'}}>
								{prompt[item.id] ? (
									<>
										<Divider />
										{prompt[item.id]}
									</>
								) : ''}
							</div>
						</ListItem>
					)
				})
			)}
		</List>
	)
}

export default EmployeeView