/* eslint-disable import/no-cycle */
import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, NavLink } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom'
import { Context } from '../index'
import {
	getAccomodationsInHotelEav,
	getHotelByIdEav,
} from '../API/HotelService'
import AccomodationItemEav from '../components/AccomodationItemEav'

const HotelEav = observer(() => {
	const { searchStore } = useContext(Context)
	const { id } = useParams()
	const [hotel, setHotel] = useState({})
	const [accomodations, setAccs] = useState([])
	const [showHdetails, setShowHdetails] = useState(false)

	useEffect(() => {
		getHotelByIdEav(id).then((doc) => setHotel(doc))
		getAccomodationsInHotelEav(
			id,
			searchStore.startDate,
			searchStore.endDate,
			searchStore.guests
		).then((doc) => setAccs(doc))
	}, [id, searchStore.endDate, searchStore.guests, searchStore.startDate])

	return (
		<div className="border d-flex align-items-center justify-content-center customHeight" style={{backgroundColor: "white"}}>
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
							hotel.services.map((x) => (
								<Row key={x.name}>
									<Col>
										{x.name} : {x.value} {x.measureOfUnit}
									</Col>
								</Row>
							))}
					</>
				) : (
					<NavLink onClick={() => setShowHdetails(true)}>
						Показать детали
					</NavLink>
				)}
				</div>
				<h3 style={{marginTop: "2rem", marginBottom: "2rem"}}>Номера</h3>
				{accomodations.map((acc) => (
					<AccomodationItemEav key={acc.name} acc={acc} />
				))}
			</div>
		</div>
	)
})

export default HotelEav
