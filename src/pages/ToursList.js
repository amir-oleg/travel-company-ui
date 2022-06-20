/* eslint-disable import/no-cycle */
import { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import TourItem from '../components/TourItem'

const ToursList = observer(() => {
	const { tours } = useContext(Context)
	return (
		<Row
			md={1}
			className="border d-flex align-items-center justify-content-center"
		>
			{tours.tours.map((tour) => (
				<TourItem key={tour.id} tour={tour} />
			))}
		</Row>
	)
})

export default ToursList
