/* eslint-disable import/no-cycle */
import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Context } from '../index'
import MultiValue from '../components/MultiValue'
import { TOUR_ADD_ROUTE, TransportTypes } from '../utils/consts'
import {
	getDietTypes,
	getTourCategories,
	getCities,
	getHotels,
	getAccs,
} from '../API/ConstsService'
import { addTour } from '../API/ToursService'

const TourAdd = observer(() => {
	const [name, setName] = useState('')
	const [startCity, setStartCity] = useState(0)
	const [endCity, setEndCity] = useState(0)
	const [startCountry, setStartCountry] = useState(0)
	const [endCountry, setEndCountry] = useState(0)
	const [transportType, setTransportType] = useState('Самолет')
	const [guestsCount, setGuestsCount] = useState(2)
	const [childrenCount, setChildrenCount] = useState(0)
	const [days, setDays] = useState(7)
	const [dietType, setDietType] = useState('')
	const [tourCategories, setTourCategories] = useState([])
	const [price, setPrice] = useState(1)
	const [image, setImage] = useState({})
	const [tourAttributes, setTourAttributes] = useState([])
	const [hotel, setHotel] = useState('')
	const [accomodation, setAccomodation] = useState('')
	const { searchStore } = useContext(Context)
	const navigate = useNavigate()
	const [allDietTypes, setAllDietTypes] = useState([])
	const [allTourCategories, setAllTourCategories] = useState([])
	const [allHotels, setAllHotels] = useState([])
	const [allAccs, setAllAccs] = useState([])
	const allTransportTypes = TransportTypes.map((x) => ({
		value: x,
		label: x,
	}))
	const allCountries = searchStore.countries.map((x) => ({
		value: x.id,
		label: x.name,
	}))
	const [allStartCities, setStartAllCities] = useState([])
	const [allEndCities, setEndAllCities] = useState([])

	useEffect(() => {
		getDietTypes().then((data) =>
			setAllDietTypes(data.map((x) => ({ value: x.code, label: x.code })))
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
		getCities(startCountry).then((data) =>
			setStartAllCities(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [startCountry])
	useEffect(() => {
		getCities(endCountry).then((data) =>
			setEndAllCities(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [endCountry])
	useEffect(() => {
		getHotels(endCity).then((data) =>
			setAllHotels(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [endCity])
	useEffect(() => {
		getAccs(hotel).then((data) =>
			setAllAccs(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [hotel])

	const click = async () => {
		await addTour(
			name,
			startCity,
			endCity,
			transportType,
			guestsCount,
			childrenCount,
			days,
			dietType,
			tourCategories,
			price,
			tourAttributes,
			accomodation,
			image
		)
		navigate(TOUR_ADD_ROUTE)
		alert('ТУР ДОБАВЛЕН!')
	}
	const addAttribute = () => {
		let id = 1
		if (tourAttributes.length === 0) {
			id = 1
		} else {
			id = tourAttributes[tourAttributes.length - 1].key + 1
		}

		setTourAttributes((atts) => [
			...atts,
			{ name: '', value: '', measureOfUnit: '', key: id },
		])
	}

	const handleInputChange = (event) => {
		const reader = new FileReader()
		reader.readAsDataURL(event.target.files[0])

		reader.onload = (e) => {
			const res = e.target.result.substring(
				e.target.result.indexOf('base64,') + 7
			)
			setImage(res)
		}
	}

	return (
		<div className="pt-4">
			<Form>
				<Row>
					<Form.Group as={Col} controlId="formGridStartCountry">
						<Form.Label>Страна начала</Form.Label>
						<Select
							options={allCountries}
							closeMenuOnSelect
							onChange={(e) => setStartCountry(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridStartCity">
						<Form.Label>Город начала</Form.Label>
						<Select
							options={allStartCities}
							closeMenuOnSelect
							noOptionsMessage={() => 'Выберите страну'}
							onChange={(e) => setStartCity(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEndCountry">
						<Form.Label>Страна назначения</Form.Label>
						<Select
							options={allCountries}
							closeMenuOnSelect
							onChange={(e) => setEndCountry(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEndCity">
						<Form.Label>Город назначения</Form.Label>
						<Select
							options={allEndCities}
							closeMenuOnSelect
							noOptionsMessage={() => 'Выберите страну'}
							onChange={(e) => setEndCity(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridTransportType">
						<Form.Label>Тип транспорта</Form.Label>
						<Select
							options={allTransportTypes}
							closeMenuOnSelect
							onChange={(e) => setTransportType(e.value)}
							placeholder="Выберите"
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
							closeMenuOnSelect
							onChange={(e) => setDietType(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridName">
						<Form.Label>Название тура</Form.Label>
						<Form.Control
							placeholder=""
							value={name}
							onChange={(e) => setName(e.target.value)}
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
					<Form.Group as={Col} controlId="formGridPrice">
						<Form.Label>Цена</Form.Label>
						<Form.Control
							placeholder=""
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							type="number"
							min="1"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridHotel">
						<Form.Label>Отель</Form.Label>
						<Select
							options={allHotels}
							closeMenuOnSelect
							noOptionsMessage={() => 'Выберите город назначения'}
							onChange={(e) => setHotel(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridAcc">
						<Form.Label>Размещение</Form.Label>
						<Select
							options={allAccs}
							closeMenuOnSelect
							noOptionsMessage={() => 'Выберите отель'}
							onChange={(e) => setAccomodation(e.value)}
							placeholder="Выберите"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridImage">
						<Form.Label>Выберите изображение тура</Form.Label>
						<Form.Control
							type="file"
							onChange={(e) => handleInputChange(e)}
						/>
					</Form.Group>
				</Row>
				<h3>Атрибуты</h3>
				<Row>
					<Col>Аттрибут</Col>
					<Col>Значение</Col>
					<Col>Единица измерения</Col>
					<Col />
				</Row>
				<Row>
					{tourAttributes.map((att, index) => (
						<Row className="mt-2" key={att.key}>
							<Form.Group as={Col} controlId="formGridAttribute">
								<Form.Control
									placeholder="Название..."
									value={att.name}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...tourAttributes]
										temp[index].name = e.target.value
										setTourAttributes(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridValue">
								<Form.Control
									placeholder="Значение..."
									value={att.value}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...tourAttributes]
										temp[index].value = e.target.value
										setTourAttributes(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridMeasure">
								<Form.Control
									placeholder="Единица..."
									value={att.measureOfUnit}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...tourAttributes]
										temp[index].measureOfUnit =
											e.target.value
										setTourAttributes(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridDeleteBut">
								<Button
									onClick={() => {
										// eslint-disable-next-line prefer-const
										let temp = [...tourAttributes]
										temp.splice(index, 1)
										setTourAttributes(temp)
									}}
									variant="outline-danger"
								>
									Удалить
								</Button>
							</Form.Group>
						</Row>
					))}
				</Row>
				<Row className="mt-2">
					<Form.Group as={Col} controlId="formGridAddAttribute">
						<br />
						<Button variant="warning" onClick={addAttribute}>
							Добавить аттрибут
						</Button>
					</Form.Group>
				</Row>
				<Row className="mt-3">
					<Button variant="success" onClick={click} width="700">
						Добавить тур
					</Button>
				</Row>
			</Form>
		</div>
	)
})

export default TourAdd
