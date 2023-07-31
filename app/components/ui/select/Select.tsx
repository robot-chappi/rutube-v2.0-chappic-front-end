import { FC } from 'react'
import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import styles from './Select.module.scss'
import { IOption, ISelect } from './interfaces/select.interface'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading
}) => {
	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map(item => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix='custom-select'
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
					styles={{
						option: (defaultStyles, state) => ({
							...defaultStyles,
							color: state.isSelected ? '#FFFFFF' : '#000000',
							backgroundColor: state.isSelected ? '#000000' : '#FFFFFF'
						}),
						control: defaultStyles => ({
							...defaultStyles,
							backgroundColor: '#FFFFFF',
							borderColor: '#FFFFFF',
							border: 'none',
							boxShadow: 'none',
							color: '#000000'
						}),
						singleValue: defaultStyles => ({
							...defaultStyles,
							color: '#000000'
						})
					}}
				/>
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
