import {
	Autocomplete,
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material'
import { IPostResponse } from '@/types/post.types'
import { useRef, useState } from 'react'

interface ISelectProps {
	value: IPostResponse | undefined
	onChange: (...event: any[]) => void
	data: IPostResponse[] | undefined
}

const SelectInput = ({onChange, value, data}: ISelectProps) => {
	return (
		<FormControl style={{width: 200}}>
			<InputLabel>Должность</InputLabel>
			<Select
				value={value?.id}
				onChange={onChange}
				label="Должность"
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{data ?
					data.map((item) => {
						return(
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						)
					}) : <CircularProgress size={15} />}
			</Select>
		</FormControl>
	);
}

export default SelectInput