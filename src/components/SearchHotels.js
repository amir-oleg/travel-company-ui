/* eslint-disable import/no-cycle */
import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { Form, Col } from 'react-bootstrap'
import { getBySearchParams } from '../API/HotelService'
import { Context } from '../index'
import { HOTELS_ROUTE } from '../utils/consts'

const SearchHotels = observer(() => {
	const [country, setCountry] = useState('')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')
	const [guests, setGuests] = useState(2)
	const { hotels } = useContext(Context)
	const { searchStore } = useContext(Context)
	const navigate = useNavigate()

	const click = async () => {
		try {
			const response = await getBySearchParams(
				country,
				startDate,
				endDate,
				guests
			)
			hotels.setHotels(response.hotels)
			searchStore.setStartDate(startDate)
			searchStore.setEndDate(endDate)
			searchStore.setGuests(guests)
			navigate(HOTELS_ROUTE, { replace: true })
		} catch (e) {
			alert(e.response.data.message)
		}
	}
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center',
				paddingTop: '1rem',
			}}
		>
			<Form>
				<Row>
					<Form.Group as={Col} controlId="formGridStartPlace">
						<Form.Label>Страна</Form.Label>
						<Form.Control
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							placeholder="Введите страну..."
							required
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridStartPlace">
						<Form.Label>Дата начала</Form.Label>
						<Form.Control
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							required
							type="date"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridStartPlace">
						<Form.Label>Дата окончания</Form.Label>
						<Form.Control
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							required
							type="date"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridStartPlace">
						<Form.Label>Гостей</Form.Label>
						<Form.Control
							value={guests}
							placeholder="2"
							min="1"
							onChange={(e) => setGuests(e.target.value)}
							required
							type="number"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Button type="button" onClick={click}>
						Поиск
					</Button>
				</Row>
			</Form>
		</div>
	)
})

export default SearchHotels
