/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import { Card, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { generatePath, useNavigate } from 'react-router-dom'
import { TOURS_ROUTE } from '../utils/consts'

function TourItem({ tour }) {
	const path = generatePath(`${TOURS_ROUTE}/tour/:id`, { id: tour.id })
	const navigate = useNavigate()
	return (
		<Col
			className="mt-3"
			style={{ display: 'flex', justifyContent: 'center' }}
		>
			<Card
				style={{ width: 270, cursor: 'pointer' }}
				border="light"
				onClick={() => navigate(path)}
			>
				<Image
					width={270}
					height={270}
					src={`${process.env.REACT_APP_API_URL}/api/images/${tour.previewImageId}`}
				/>
				<div>{tour.name}</div>
				<div>{tour.dietType}</div>
				<div>Цена: {tour.price}р.</div>
			</Card>
		</Col>
	)
}

export default TourItem
