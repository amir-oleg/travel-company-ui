/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useParams } from 'react-router-dom'
import { getTourById } from '../API/ToursService'
import AccomodationItemEav from '../components/AccomodationItemEav'

const Tour = observer(() => {
	console.log('TURUTRUTURTURT')
	const { id } = useParams()
	const [tour, setTour] = useState({})

	useEffect(() => {
		getTourById(id).then((doc) => setTour(doc))
	}, [id])
	console.log(tour)
	return (
		<div className="border d-flex align-items-center justify-content-center customHeight">
			<div>
				<h1>&quot{tour.tourName}&quot</h1>
				<Image
					width={700}
					src={`${process.env.REACT_APP_API_URL}/api/images/${tour.previewImageId}`}
				/>
				<div>питание {tour.dietType}</div>
				<div>страна начала {tour.startCountry}</div>
				<div>город начала {tour.startCity}</div>
				<div>страна конца {tour.endCountry}</div>
				<div>город конца {tour.endCity}</div>
				<div>цена {tour.price}</div>

				{tour.tourCategories &&
					tour.tourCategories.map((cat) => (
						<div>категория: {cat}</div>
					))}
				<div>гости {tour.guests}</div>
				<div>дети {tour.childrenCount}</div>
				<div>ночи {tour.dys}</div>
				<div>
					<Row>
						{Array.isArray(tour.services) &&
							tour.services.length &&
							tour.services.map((service) => (
								<Col key={service.name}>
									{service.name} : {service.value}{' '}
									{service.measureOfUnit}
								</Col>
							))}
					</Row>
				</div>
				{tour.accomodations.map((acc) => (
					<AccomodationItemEav key={acc.name} acc={acc} />
				))}
			</div>
		</div>
	)
})

export default Tour
