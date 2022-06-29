/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, NavLink, Form, Button, Carousel} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useParams, useNavigate } from 'react-router-dom'
import { PieChart } from 'react-minimal-pie-chart'
import Select from 'react-select'
import {
	getAccomodationsInHotel,
	getHotelByIdEav,
	getHotelStats,
	editHotel
} from '../API/HotelService'
import { getCities, getHotelCategories } from '../API/ConstsService'
import { Context } from '../index'

const HotelEavAdmin = observer(() => {
	const { searchStore } = useContext(Context)
	const { id } = useParams()
	const navigate = useNavigate()
	const [hotel, setHotel] = useState({})
	const [accomodations, setAccs] = useState([])
	const [stats, setStats] = useState({})
	const [image, setImage] = useState('')
	const [showHdetails, setShowHdetails] = useState(false)
	const [showAdetails, setShowAdetails] = useState(false)
	const [allHotelCategories, setAllHotelCategories] = useState([])
	const allCountries = searchStore.countries.map((x) => ({
		value: x.id,
		label: x.name,
	}))
	const [allCities, setAllCities] = useState([])

	useEffect(() => {
		getHotelByIdEav(id).then((doc) => setHotel(doc))
		getAccomodationsInHotel(id).then((doc) => setAccs(doc))
		getHotelStats(id).then((doc) => setStats(doc))
	}, [id])

	useEffect(() => {
		getCities(hotel.country).then((data) =>
			setAllCities(data.map((x) => ({ value: x.id, label: x.name })))
		)
	}, [hotel.country])

	useEffect(() => {
		getHotelCategories().then((data) =>
			setAllHotelCategories(
				data.map((x) => ({ value: x.code, label: x.value }))
			)
		)
	}, [])
	
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
		setAccs(temp)
	}

	const click = async () => {
		await editHotel(
			id,
			hotel.hotelName,
			hotel.hotelCategory,
			hotel.city,
			image,
			hotel.services,
			accomodations
		)
		navigate(`/hotels/${id}`)
	}

	return (
		<div className="border d-flex align-items-center justify-content-center customHeight">
			{hotel === {} || accomodations.length === 0 ? (
				<br />
			) : (
				<div>
					<PieChart
						data={[
							{
								title: 'Свободно',
								value: stats.free,
								color: '#5ee684',
							},
							{
								title: 'Занято',
								value: stats.busy,
								color: '#fa2f2f',
							},
						]}
						style={{ height: '250px', marginTop: '3rem' }}
						label={({ dataEntry }) => dataEntry.value}
						labelStyle={{
							fontSize: '25px',
							fontFamily: 'sans-serif',
						}}
						animate
					/>
					<div style={{marginTop:'2rem'}}>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
				<Button variant="success" onClick={click}>
					Сохранить изменения
				</Button>
			</Row>
						<Form.Label><h3>Название отеля:</h3></Form.Label>
					<Form.Control
						placeholder="Введите название отеля..."
						value={hotel.hotelName}
						onChange={(e) => {
							const temp ={...hotel}
							temp.hotelName = e.target.value
							setHotel(temp)
						}}
					/>
					<Form.Label><h3>Категория отеля:</h3></Form.Label>
					<Select
						options={allHotelCategories}
						closeMenuOnSelect
						onChange={(e) => {
							const temp ={...hotel}
							temp.category = e.value
							setHotel(temp)
						}}
						placeholder="Выберите"
					/>
					<Form.Label>Фотография отеля</Form.Label>
					<Form.Control
						placeholder="Выберите изображение..."
						onChange={(e) => setHotelImage(e)}
						type="file"
					/>
				<Image
					width={700}
					src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}
				/>
				<Form.Group as={Col} controlId="formGridCountry">
					<Form.Label>Страна</Form.Label>
					<Select
						options={allCountries}
						closeMenuOnSelect
						onChange={(e) => {
							const temp ={...hotel}
							temp.country = e.value
							setHotel(temp)
						}}
						placeholder={hotel.country}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridCity">
					<Form.Label>Город</Form.Label>
					<Select
						options={allCities}
						closeMenuOnSelect
						noOptionsMessage={() => 'Выберите страну'}
						onChange={(e) => {
							const temp ={...hotel}
							temp.city = e.value
							setHotel(temp)
						}}
						placeholder={hotel.city}
					/>
				</Form.Group>
				<div>
				{showHdetails ? (
					<>
						<NavLink onClick={() => setShowHdetails(false)}>
							Скрыть детали
						</NavLink>
						<Row>
							<h4>Детали:</h4>
						</Row>
						{hotel.services &&
							hotel.services.map((x,index) => (
								
								<Row className="mt-2" key={x.name}>
						<Form.Group as={Col} controlId="formGridAttribute">
							<Form.Control
								placeholder="Название..."
								value={x.name}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = {...hotel}
									temp.services[index].name = e.target.value
									setHotel(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridValue">
							<Form.Control
								placeholder="Значение..."
								value={x.value}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = {...hotel}
									temp.services[index].value = e.target.value
									setHotel(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridMeasure">
							<Form.Control
								placeholder="Единица..."
								value={x.measureOfUnit}
								onChange={(e) => {
									// eslint-disable-next-line prefer-const
									let temp = {...hotel}
									temp.services[index].measureOfUnit = e.target.value
									setHotel(temp)
								}}
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="formGridDeleteBut">
							<Button
								onClick={() => {
									// eslint-disable-next-line prefer-const
									let temp = {...hotel}
									temp.services.splice(index, 1)
									setHotel(temp)
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
									onClick={() => {
										const temp = {...hotel}
									temp.services.push({
										name: '',
										value: '',
										measureOfUnit: '',
									})
									setHotel(temp)
									}}
								>
									Добавить атрибут отеля
								</Button>
							</Form.Group>
						</Row>
					</>
				) : (
					<NavLink onClick={() => setShowHdetails(true)}>
						Показать детали
					</NavLink>
				)}
				</div>
				<h3 style={{marginTop: "2rem", marginBottom: "2rem"}}>Номера</h3>
				{accomodations.map((acc, index) => (
					<div>
					<Form.Label><h4>Название номера:</h4></Form.Label>
					<Form.Control
						placeholder="Введите название номера..."
						value={acc.name}
						onChange={(e) => {
							const temp ={...hotel}
							temp.accomodations[index].name = e.target.value
							setHotel(temp)
						}}
					/>
					<Form.Label><h4>Цена за день:</h4></Form.Label>
					<Form.Control
						placeholder="Введите цену за день..."
						value={acc.pricePerDay}
						onChange={(e) => {
							const temp ={...hotel}
							temp.accomodations[index].pricePerDay = e.target.value
							setHotel(temp)
						}}
						type="number"
						min="1"
					/>
					<Form.Label><h4>Спальных мест:</h4></Form.Label>
					<Form.Control
						placeholder=""
						value={acc.capacity}
						onChange={(e) => {
							const temp ={...hotel}
							temp.accomodations[index].capacity = e.target.value
							setHotel(temp)
						}}
						type="number"
						min="1"
					/>
					<Form.Label>Фотографии номера</Form.Label>
								<Form.Control
									multiple
									type="file"
									onChange={(e) =>
										handleInputChange(e, index)
									}
								/>
						<Carousel
							style={{
								width: 270,
								height: 270,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
								marginTop:"1rem"
							}}
						>
							{acc.images.map((a) => (
								<Carousel.Item style={{ height: 270 }} key={a}>
									<img
										className="d-block w-100"
										style={{ height: 230 }}
										src={`${process.env.REACT_APP_API_URL}/api/images/${a}`}
										alt=""
									/>
								</Carousel.Item>
							))}
						</Carousel>
						<div>
						{showAdetails ? (
							<>
							<NavLink onClick={() => setShowAdetails(false)}>
								Скрыть детали
							</NavLink>
							<Row>
								<h4>Детали:</h4>
							</Row>
							{acc.attributes &&
								acc.attributes.map((x, ind) => (
									
									<Row className="mt-2" key={x.name}>
							<Form.Group as={Col} controlId="formGridAttribute">
								<Form.Control
									placeholder="Название..."
									value={x.name}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].services[ind].name = e.target.value
										setAccs(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridValue">
								<Form.Control
									placeholder="Значение..."
									value={x.value}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].services[ind].value = e.target.value
										setAccs(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridMeasure">
								<Form.Control
									placeholder="Единица..."
									value={x.measureOfUnit}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].services[ind].measureOfUnit = e.target.value
										setAccs(temp)
									}}
								/>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridDeleteBut">
								<Button
									onClick={() => {
										// eslint-disable-next-line prefer-const
										let temp = [...accomodations]
										temp[index].services.splice(ind, 1)
										setAccs(temp)
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
										onClick={() => {
											const temp = [...accomodations]
										temp[index].services.push({
											name: '',
											value: '',
											measureOfUnit: '',
										})
										setAccs(temp)
										}}
									>
										Добавить атрибут номера
									</Button>
								</Form.Group>
							</Row>
						</>
						) : (
							<NavLink onClick={() => setShowAdetails(true)}>
								Показать детали
							</NavLink>
						)}
						</div>
					</div>
				))}
			</div>
				</div>
			)}
		</div>
	)
})

export default HotelEavAdmin
