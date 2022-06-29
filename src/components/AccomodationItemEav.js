/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import { useContext, useState } from 'react'
import { Button, Carousel, Row, Col, NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../API/OrdersService'
import { Context } from '../index'
import { HOME_ROUTE } from '../utils/consts'

function AccomodationItemEav({ acc }) {
	const { searchStore } = useContext(Context)
	const navigate = useNavigate()
	const [showAdetails, setShowAdetails] = useState(false)

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
						{acc.attributes &&
							acc.attributes.map((x) => (
								<Row key={x.name}>
									<Col>
										{x.name} : {x.value} {x.measureOfUnit}
									</Col>
								</Row>
							))}
					</>
				) : (
					<NavLink onClick={() => setShowAdetails(true)}>
						Показать детали
					</NavLink>
				)}
				</div>
			</div>
			<Row style={{marginLeft: "2rem"}}>
				<Col><h5>Цена на ваш период: {acc.price}р.</h5></Col>
				<Col><Button onClick={() => click()}>Заказать</Button></Col>
			</Row>
		</div>
	)
}

export default AccomodationItemEav
