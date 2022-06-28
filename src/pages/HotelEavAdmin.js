/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col } from 'react-bootstrap'
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

	useEffect(() => {
		getHotelByIdEav(id).then((doc) => setHotel(doc))
		getAccomodationsInHotel(id).then((doc) => setAccs(doc))
		getHotelStats(id).then((doc) => setStats(doc))
	}, [id])

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
					/>
					<div>
						<h1>{hotel.hotelName}</h1>
						<Image
							width={700}
							src={`${process.env.REACT_APP_API_URL}/api/images/${hotel.previewImage}`}
						/>
						<div>
							<Row>
								{Array.isArray(hotel.services) &&
									hotel.services.length &&
									hotel.services.map((service) => (
										<Col>
											{service.name} : {service.value}{' '}
											{service.measureOfUnit}
										</Col>
									))}
							</Row>
						</div>
						{accomodations.map((acc) => (
							<AccomodationItemEav acc={acc} />
						))}
					</div>
				</div>
			)}
		</div>
	)
})

export default HotelEavAdmin
