/* eslint-disable import/no-cycle */
import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Context } from '../index'
import MultiValue from '../components/MultiValue'
import { TOUR_ADD_ROUTE } from '../utils/consts'
import {
	getDietTypes,
	getTourCategories,
	getCities,
	getHotels,
	getAccs,
	getTransportTypes,
} from '../API/ConstsService'
import { addTour } from '../API/ToursService'

const TourAdd = observer(() => {
	const [name, setName] = useState('')
	const [startCity, setStartCity] = useState(0)
	const [endCity, setEndCity] = useState(0)
	const [startCountry, setStartCountry] = useState(0)
	const [endCountry, setEndCountry] = useState(0)
	const [transportType, setTransportType] = useState('AI')
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
	const [allTransportTypes, setAllTransportTypes] = useState([])

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
	useEffect(() => {
		getTransportTypes(transportType).then((data) =>
			setAllTransportTypes(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [transportType])

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
		alert('?????? ????????????????!')
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
						<Form.Label>???????????? ????????????</Form.Label>
						<Select
							options={allCountries}
							closeMenuOnSelect
							onChange={(e) => setStartCountry(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridStartCity">
						<Form.Label>?????????? ????????????</Form.Label>
						<Select
							options={allStartCities}
							closeMenuOnSelect
							noOptionsMessage={() => '???????????????? ????????????'}
							onChange={(e) => setStartCity(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEndCountry">
						<Form.Label>???????????? ????????????????????</Form.Label>
						<Select
							options={allCountries}
							closeMenuOnSelect
							onChange={(e) => setEndCountry(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEndCity">
						<Form.Label>?????????? ????????????????????</Form.Label>
						<Select
							options={allEndCities}
							closeMenuOnSelect
							noOptionsMessage={() => '???????????????? ????????????'}
							onChange={(e) => setEndCity(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="formGridTransportType">
						<Form.Label>?????? ????????????????????</Form.Label>
						<Select
							options={allTransportTypes}
							closeMenuOnSelect
							onChange={(e) => setTransportType(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridDays">
						<Form.Label>??????????</Form.Label>
						<Form.Control
							placeholder=""
							value={days}
							onChange={(e) => setDays(e.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridGuests">
						<Form.Label>????????????????</Form.Label>
						<Form.Control
							type="number"
							value={guestsCount}
							onChange={(e) => setGuestsCount(e.target.value)}
							min="1"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridChildren">
						<Form.Label>????????</Form.Label>
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
						<Form.Label>?????? ??????????????</Form.Label>
						<Select
							options={allDietTypes}
							closeMenuOnSelect
							onChange={(e) => setDietType(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridName">
						<Form.Label>???????????????? ????????</Form.Label>
						<Form.Control
							placeholder=""
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridTourCats">
						<Form.Label>?????? ????????</Form.Label>
						<Select
							options={allTourCategories}
							isMulti
							closeMenuOnSelect={false}
							components={{ MultiValue }}
							onChange={(e) =>
								setTourCategories(Array.from(e, (x) => x.value))
							}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPrice">
						<Form.Label>????????</Form.Label>
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
						<Form.Label>??????????</Form.Label>
						<Select
							options={allHotels}
							closeMenuOnSelect
							noOptionsMessage={() => '???????????????? ?????????? ????????????????????'}
							onChange={(e) => setHotel(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridAcc">
						<Form.Label>????????????????????</Form.Label>
						<Select
							options={allAccs}
							closeMenuOnSelect
							noOptionsMessage={() => '???????????????? ??????????'}
							onChange={(e) => setAccomodation(e.value)}
							placeholder="????????????????"
						/>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridImage">
						<Form.Label>???????????????? ?????????????????????? ????????</Form.Label>
						<Form.Control
							type="file"
							onChange={(e) => handleInputChange(e)}
						/>
					</Form.Group>
				</Row>
				<h3>????????????????</h3>
				<Row>
					<Col>????????????????</Col>
					<Col>????????????????</Col>
					<Col>?????????????? ??????????????????</Col>
					<Col />
				</Row>
				<Row>
					{tourAttributes.map((att, index) => (
						<Row className="mt-2" key={att.key}>
							<Form.Group as={Col} controlId="formGridAttribute">
								<Form.Control
									placeholder="????????????????..."
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
									placeholder="????????????????..."
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
									placeholder="??????????????..."
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
									??????????????
								</Button>
							</Form.Group>
						</Row>
					))}
				</Row>
				<Row className="mt-2">
					<Form.Group as={Col} controlId="formGridAddAttribute">
						<br />
						<Button variant="warning" onClick={addAttribute}>
							???????????????? ????????????????
						</Button>
					</Form.Group>
				</Row>
				<Row className="mt-3">
					<Button variant="success" onClick={click} width="700">
						???????????????? ??????
					</Button>
				</Row>
			</Form>
		</div>
	)
})

export default TourAdd
