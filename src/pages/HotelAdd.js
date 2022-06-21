/* eslint-disable import/no-cycle */
import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Context } from '../index'
import { HOTEL_ADD_ROUTE } from '../utils/consts'
import { addHotel } from '../API/HotelService'
import { getCities, getHotelCategories } from '../API/ConstsService'

const HotelAdd = observer(() => {
	const navigate = useNavigate()
	const [hotelName, setHotelName] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')
	const [image, setImage] = useState('')
	const [hotelCategory, setHotelCategory] = useState('')
	const [hotelAttributes, setHotelAttributes] = useState([])
	const [accomodations, setAccomodations] = useState([])
	const [allHotelCategories, setAllHotelCategories] = useState([])
	const { searchStore } = useContext(Context)
	const allCountries = searchStore.countries.map((x) => ({
		value: x.id,
		label: x.name,
	}))
	const [allCities, setAllCities] = useState([])

	useEffect(() => {
		getCities(country).then((data) =>
			setAllCities(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [country])

	useEffect(() => {
		getHotelCategories().then((data) =>
			setAllHotelCategories(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [])

	const click = async () => {
		await addHotel(
			hotelName,
			hotelCategory,
			city,
			image,
			hotelAttributes,
			accomodations
		)
		navigate(HOTEL_ADD_ROUTE)
		alert('ОТЕЛЬ ДОБАВЛЕН')
	}

	const addHotelAttribute = () => {
		let id = 1
		if (hotelAttributes.length === 0) {
			id = 1
		} else {
			id = hotelAttributes[hotelAttributes.length - 1].key + 1
		}

		setHotelAttributes((atts) => [
			...atts,
			{ name: '', value: '', measureOfUnit: '', key: id },
		])
	}

	const addAccomodation = () => {
		let id = 1
		if (accomodations.length === 0) {
			id = 1
		} else {
			id = accomodations[accomodations.length - 1].key + 1
		}

		setAccomodations((atts) => [
			...atts,
			{
				name: '',
				capacity: '',
				pricePerDay: '',
				count: 1,
				images: [],
				attributes: [],
				key: id,
			},
		])
	}

	const addAccAttribute = (index) => {
		let id = 1
		if (accomodations[index].attributes.length === 0) {
			id = 1
		} else {
			id =
				accomodations[index].attributes[
					accomodations[index].attributes.length - 1
				].key + 1
		}
		const temp = [...accomodations]
		temp[index].attributes.push({
			name: '',
			value: '',
			measureOfUnit: '',
			key: id,
		})
		setAccomodations(temp)
		console.log(accomodations)
	}

	const handleInputChange = (event, index) => {
		// eslint-disable-next-line prefer-const
		let tempImages = []
		Array.from(event.target.files).forEach((file) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = (e) => {
				const res = e.target.result.substring(
					e.target.result.indexOf('base64,') + 7
				)
				tempImages.push(res)
			}
		})
		// eslint-disable-next-line prefer-const
		let temp = [...accomodations]
		temp[index].images = tempImages
		setAccomodations(temp)
	}

	const setHotelImage = (event) => {
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
		<Form className="pt-5">
			<Row>
				<Form.Group as={Col} controlId="formGridHotelName">
					<Form.Label>Название отеля</Form.Label>
					<Form.Control
						placeholder="Введите название отеля..."
						value={hotelName}
						onChange={(e) => setHotelName(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridCountry">
					<Form.Label>Страна</Form.Label>
					<Select
						options={allCountries}
						closeMenuOnSelect
						onChange={(e) => setCountry(e.value)}
						placeholder="Выберите"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>Город</Form.Label>
					<Select
						options={allCities}
						closeMenuOnSelect
						noOptionsMessage={() => 'Выберите страну'}
						onChange={(e) => setCity(e.value)}
						placeholder="Выберите"
					/>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group as={Col} controlId="formGridHotelCat">
					<Form.Label>Категория отеля</Form.Label>
					<Select
						options={allHotelCategories}
						closeMenuOnSelect
						onChange={(e) => setHotelCategory(e.value)}
						placeholder="Выберите"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridHotelCat">
					<Form.Label>Фотография отеля</Form.Label>
					<Form.Control
						placeholder="Выберите изображение..."
						onChange={(e) => setHotelImage(e)}
						type="file"
					/>
				</Form.Group>
			</Row>
			<hr style={{ height: '3px' }} />
			<h3>Атрибуты</h3>
			<Row>
				<Col>Аттрибут</Col>
				<Col>Значение</Col>
				<Col>Единица измерения</Col>
				<Col />
				{hotelAttributes.map((att, index) => (
					<Row className="mt-2" key={att.key}>
						<Form.Group as={Col} controlId="formGridAttribute">
							<Form.Control
								placeholder="Название..."
								value={att.name}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = [...hotelAttributes]
									temp[index].name = e.target.value
									setHotelAttributes(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridValue">
							<Form.Control
								placeholder="Значение..."
								value={att.value}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = [...hotelAttributes]
									temp[index].value = e.target.value
									setHotelAttributes(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridMeasure">
							<Form.Control
								placeholder="Единица..."
								value={att.measureOfUnit}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = [...hotelAttributes]
									temp[index].measureOfUnit = e.target.value
									setHotelAttributes(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridDeleteBut">
							<Button
								onClick={() => {
									// eslint-disable-next-line prefer-const
									let temp = [...hotelAttributes]
									temp.splice(index, 1)
									setHotelAttributes(temp)
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
					<Button variant="warning" onClick={addHotelAttribute}>
						Добавить аттрибут отеля
					</Button>
				</Form.Group>
			</Row>
			<hr style={{ height: '3px' }} />
			<h3>Номера</h3>
			<Row>
				{accomodations.map((acc, index) => (
					<>
						<Row className="mt-2" key={acc.key}>
							<Form.Group as={Col} controlId="formGridAccName">
								<Form.Label>Название номера</Form.Label>
								<Form.Control
									placeholder="Название..."
									value={acc.name}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].name = e.target.value
										setAccomodations(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridCapacity">
								<Form.Label>Спальных мест</Form.Label>
								<Form.Control
									value={acc.capacity}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].capacity = e.target.value
										setAccomodations(temp)
									}}
									type="number"
									min="1"
									defaultValue="2"
								/>
							</Form.Group>
							<Form.Group
								as={Col}
								controlId="formGridPricePerDay"
							>
								<Form.Label>Цена за день</Form.Label>
								<Form.Control
									placeholder="Цена за день..."
									value={acc.pricePerDay}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].pricePerDay = e.target.value
										setAccomodations(temp)
									}}
									type="number"
									min="1"
									defaultValue="1000"
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridCount">
								<Form.Label>Кол-во номеров</Form.Label>
								<Form.Control
									value={acc.count}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].count = e.target.value
										setAccomodations(temp)
									}}
									type="number"
									min="1"
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridAccImgs">
								<Form.Label>Фотографии номера</Form.Label>
								<Form.Control
									multiple
									type="file"
									onChange={(e) =>
										handleInputChange(e, index)
									}
								/>
							</Form.Group>
							<Form.Group
								as={Col}
								controlId="formGridDeleteAccBut"
							>
								<Button
									onClick={() => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp.splice(index, 1)
										setAccomodations(temp)
									}}
									variant="outline-danger"
								>
									Удалить
								</Button>
							</Form.Group>
						</Row>
						{acc.attributes.map((att, indexAtt) => (
							<Row className="mt-2" key={att.key}>
								<Form.Group
									as={Col}
									controlId="formGridAttribute"
								>
									<Form.Control
										placeholder="Название..."
										value={att.name}
										onChange={(e) => {
											// eslint-disable-next-line prefer-const
											let temp = [...accomodations]
											temp[index].attributes[
												indexAtt
											].name = e.target.value
											setAccomodations(temp)
										}}
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridValue">
									<Form.Control
										placeholder="Значение..."
										value={att.value}
										onChange={(e) => {
											// eslint-disable-next-line prefer-const
											let temp = [...accomodations]
											temp[index].attributes[
												indexAtt
											].value = e.target.value
											setAccomodations(temp)
										}}
									/>
								</Form.Group>
								<Form.Group
									as={Col}
									controlId="formGridMeasure"
								>
									<Form.Control
										placeholder="Единица..."
										value={att.measureOfUnit}
										onChange={(e) => {
											// eslint-disable-next-line prefer-const
											let temp = [...accomodations]
											temp[index].attributes[
												indexAtt
											].measureOfUnit = e.target.value
											setAccomodations(temp)
										}}
									/>
								</Form.Group>
								<Form.Group
									as={Col}
									controlId="formGridDeleteBut"
								>
									<Button
										onClick={() => {
											// eslint-disable-next-line prefer-const
											let temp = [...accomodations]
											temp[index].attributes.splice(
												indexAtt,
												1
											)
											setAccomodations(temp)
										}}
										variant="outline-danger"
									>
										Удалить
									</Button>
								</Form.Group>
							</Row>
						))}
						<Row className="mt-2">
							<Form.Group
								as={Col}
								controlId="formGridAddAttribute"
							>
								<br />
								<Button
									variant="warning"
									onClick={() => addAccAttribute(index)}
								>
									Добавить аттрибут номера
								</Button>
							</Form.Group>
						</Row>
						<hr style={{ height: '1px' }} />
					</>
				))}
			</Row>

			<Row className="mt-2">
				<Form.Group as={Col} controlId="formGridAddAcc">
					<br />
					<Button variant="warning" onClick={addAccomodation}>
						Добавить номер
					</Button>
				</Form.Group>
			</Row>

			<hr style={{ height: '3px' }} />
			<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
				<Button variant="outline-success" onClick={click}>
					Добавить отель
				</Button>
			</Row>
		</Form>
	)
})

export default HotelAdd
