/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/function-component-definition */
import { components } from 'react-select'

const MoreSelectedBadge = ({ items }) => {
	const style = {
		marginLeft: '0rem',
		background: '#d4eefa',
		borderRadius: '4px',
		fontFamily: 'Open Sans',
		fontSize: '11px',
		padding: '3px',
		order: 99,
	}

	const title = items.join(', ')
	const { length } = items
	const label = `+ ${length} опци${length !== 1 ? 'й' : 'я'} выбран${
		length !== 1 ? 'ы' : 'а'
	}`

	return (
		<div style={style} title={title}>
			{label}
		</div>
	)
}

const MultiValue = ({ index, getValue, ...props }) => {
	const maxToShow = 1
	const overflow = getValue()
		.slice(maxToShow)
		.map((x) => x.label)

	return index < maxToShow ? (
		<components.MultiValue {...props} />
	) : index === maxToShow ? (
		<MoreSelectedBadge items={overflow} />
	) : null
}

export default MultiValue
