import {
	Autocomplete,
	Box,
	CircularProgress,
	FormControl, FormControlProps, FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material'
import { IPostResponse } from '@/types/post.types'
import { useRef, useState } from 'react'

interface ISelectProps extends FormControlProps {
	value: IPostResponse | undefined
	onChange: (...event: any[]) => void
	data: IPostResponse[] | undefined
	helperText: string
}

const SelectInput = ({onChange, value, data, helperText, ...rest}: ISelectProps) => {
	return (
		<FormControl style={{width: 200}} {...rest}>
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
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}

export default SelectInput