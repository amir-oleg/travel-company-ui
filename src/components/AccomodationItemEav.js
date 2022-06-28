/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import { useContext } from 'react'
import { Button, Carousel, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../API/OrdersService'
import { Context } from '../index'
import { HOME_ROUTE } from '../utils/consts'

function AccomodationItemEav({ acc }) {
	const { searchStore } = useContext(Context)
	const navigate = useNavigate()

	const click = async () => {
		await createOrder(searchStore.startDate, searchStore.endDate, acc.id, 0)
		navigate(HOME_ROUTE, { replace: true })
	}

	return (
		<div
			className="mt-3"
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
			}}
		>
			<div>
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
					<Row>
						{Array.isArray(acc.services) &&
							acc.services.length &&
							acc.services.map((service) => (
								<Col>
									{service.name} : {service.value}{' '}
									{service.measureOfUnit}
								</Col>
							))}
					</Row>
				</div>
			</div>
			<div>{acc.name}</div>
			<div>Цена на ваш период: {acc.price}р.</div>
			<Button onClick={() => click()}>Заказать</Button>
		</div>
	)
}

export default AccomodationItemEav
