/* eslint-disable import/no-named-default */
/* eslint-disable import/no-cycle */
import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Form, Col } from 'react-bootstrap'
import Moment from 'moment'
import Select from 'react-select'
import MultiValue from './MultiValue'
import { searchByParams } from '../API/ToursService'
import {
	getDietTypes,
	getHotelCategories,
	getTourCategories,
	getTransportTypes,
} from '../API/ConstsService'
import { Context } from '../index'
import { TOURS_ROUTE } from '../utils/consts'

const SearchTours = observer(() => {
	const currentDate = Moment().format('YYYY-MM-DD')
	const [startPlace, setStartPlace] = useState('Россия')
	const [endPlace, setEndPlace] = useState('Турция')
	const [transportType, setTransportType] = useState([])
	const [guestsCount, setGuestsCount] = useState(2)
	const [childrenCount, setChildrenCount] = useState(0)
	const [startDate, setStartDate] = useState(currentDate)
	const [days, setDays] = useState(7)
	const [dietTypes, setDietTypes] = useState([])
	const [hotelCategories, setHotelCategories] = useState([])
	const [tourCategories, setTourCategories] = useState([])
	const [priceFrom, setPriceFrom] = useState()
	const [priceTo, setPriceTo] = useState()
	const { tours } = useContext(Context)
	const navigate = useNavigate()
	const [allDietTypes, setAllDietTypes] = useState([])
	const [allHotelCategories, setAllHotelCategories] = useState([])
	const [allTourCategories, setAllTourCategories] = useState([])
	const [allTransportTypes, setAllTransportTypes] = useState([])
	const { searchStore } = useContext(Context)

	useEffect(() => {
		getDietTypes().then((data) =>
			setAllDietTypes(data.map((x) => ({ value: x.code, label: x.code })))
		)
	}, [])
	useEffect(() => {
		getHotelCategories().then((data) =>
			setAllHotelCategories(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [])
	useEffect(() => {
		getTourCategories().then((data) =>
			setAllTourCategories(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [])
	useEffect(() => {
		getTransportTypes().then((data) =>
			setAllTransportTypes(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [])

	const click = async () => {
		try {
			// eslint-disable-next-line no-unused-expressions
			let { page } = tours
			console.log(tours)
			console.log(tours.page)
			if (tours.page === 'undefined') {
				page = 1
			}
			const response = await searchByParams(
				startPlace,
				endPlace,
				transportType,
				guestsCount,
				childrenCount,
				startDate,
				days,
				dietTypes,
				hotelCategories,
				tourCategories,
				priceFrom,
				priceTo,
				page
			)
			searchStore.setStartDate(startDate)
			searchStore.setDays(days)
			tours.setTours(response.tours)
			tours.setTotalCount(response.pageCount)
			navigate(TOURS_ROUTE, { replace: true })
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
						<Form.Label>Откуда</Form.Label>
						<Form.Control
							placeholder=""
							value={startPlace}
							onChange={(e) => setStartPlace(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEndPlace">
						<Form.Label>Куда</Form.Label>
						<Form.Control
							placeholder=""
							value={endPlace}
							onChange={(e) => setEndPlace(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridTransportType">
						<Form.Label>Тип транспорта</Form.Label>
						<Select
							options={allTransportTypes}
							closeMenuOnSelect={false}
							isMulti
							components={{ MultiValue }}
							onChange={(e) =>
								setTransportType(Array.from(e, (x) => x.value))
							}
							placeholder="Выберите"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridStartDate">
						<Form.Label>Дата начала</Form.Label>
						<Form.Control
							placeholder=""
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							type="date"
							min={currentDate}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridDays">
						<Form.Label>Ночей</Form.Label>
						<Form.Control
							placeholder=""
							value={days}
							onChange={(e) => setDays(e.target.value)}
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridGuests">
						<Form.Label>Взрослые</Form.Label>
						<Form.Control
							type="number"
							value={guestsCount}
							onChange={(e) => setGuestsCount(e.target.value)}
							min="1"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridChildren">
						<Form.Label>Дети</Form.Label>
						<Form.Control
							type="number"
							value={childrenCount}
							onChange={(e) => setChildrenCount(e.target.value)}
							min="0"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridDiet">
						<Form.Label>Тип питания</Form.Label>
						<Select
							options={allDietTypes}
							isMulti
							closeMenuOnSelect={false}
							components={{ MultiValue }}
							onChange={(e) =>
								setDietTypes(Array.from(e, (x) => x.value))
							}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridHotelCats">
						<Form.Label>Категория отеля</Form.Label>
						<Select
							options={allHotelCategories}
							isMulti
							closeMenuOnSelect={false}
							components={{ MultiValue }}
							onChange={(e) =>
								setHotelCategories(
									Array.from(e, (x) => x.value)
								)
							}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridTourCats">
						<Form.Label>Вид тура</Form.Label>
						<Select
							options={allTourCategories}
							isMulti
							closeMenuOnSelect={false}
							components={{ MultiValue }}
							onChange={(e) =>
								setTourCategories(Array.from(e, (x) => x.value))
							}
							placeholder="Выберите"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridPricefrom">
						<Form.Label>Цена от</Form.Label>
						<Form.Control
							placeholder=""
							value={priceFrom}
							onChange={(e) => setPriceFrom(e.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPriceTo">
						<Form.Label>Цена до</Form.Label>
						<Form.Control
							placeholder=""
							value={priceTo}
							onChange={(e) => setPriceTo(e.target.value)}
						/>
					</Form.Group>
				</Row>
				<Row className="mt-3">
					<Button variant="success" onClick={click}>
						Подобрать тур
					</Button>
				</Row>
			</Form>
		</div>
	)
})

export default SearchTours
