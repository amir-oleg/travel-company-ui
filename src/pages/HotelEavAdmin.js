/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, NavLink, Form, Button, Carousel} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom'
import { PieChart } from 'react-minimal-pie-chart'
import {
	getAccomodationsInHotel,
	getHotelByIdEav,
	getHotelStats,
} from '../API/HotelService'
import AccomodationItemEav from '../components/AccomodationItemEav'

const HotelEavAdmin = observer(() => {
	console.log('ADMINADMIN')
	const { id } = useParams()
	const [hotel, setHotel] = useState({})
	const [accomodations, setAccs] = useState([])
	const [stats, setStats] = useState({})
	const [showHdetails, setShowHdetails] = useState(false)
	const [showAdetails, setShowAdetails] = useState(false)

	useEffect(() => {
		getHotelByIdEav(id).then((doc) => setHotel(doc))
		getAccomodationsInHotel(id).then((doc) => setAccs(doc))
		getHotelStats(id).then((doc) => setStats(doc))
	}, [id])
	console.log(hotel)
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
					<div>
				<h1>{hotel.hotelName} {hotel.category}</h1>
				<Image
					width={700}
					src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}
				/>
				<h3>{hotel.country} {hotel.city}</h3>
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
					<h4>{acc.name}</h4>
						<Carousel
							style={{
								width: 270,
								height: 270,
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
							{acc.services &&
								acc.services.map((x, ind) => (
									
									<Row className="mt-2" key={x.name}>
							<Form.Group as={Col} controlId="formGridAttribute">
								<Form.Control
									placeholder="Название..."
									value={x.name}
									onChange={(e) => {
										// eslint-disable-next-line prefer-const
										let temp = {...accomodations}
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
										let temp = {...accomodations}
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
										let temp = {...accomodations}
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
										temp[index].services.splice(index, 1)
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
