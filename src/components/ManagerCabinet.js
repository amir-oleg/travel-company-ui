/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getManagerData } from '../API/PersonalCabinetService'
import {
	cancelBook,
	getFreeOrders,
	takeOrderInJob,
	markOrderAsPaid,
} from '../API/OrdersService'
import { LK_ROUTE, LK_FREE_ORDERS_ROUTE } from '../utils/consts'

const managerCabinet = () => {
	const [user, setUser] = useState({})
	const [freeOrders, setFreeOrders] = useState([])
	const navigate = useNavigate()
	// eslint-disable-next-line no-restricted-globals
	const isFreeOrders = location.pathname === LK_FREE_ORDERS_ROUTE

	useEffect(() => {
		getFreeOrders().then((data) => setFreeOrders(data))
	}, [])

	useEffect(() => {
		getManagerData().then((data) => setUser(data))
	}, [])

	const clickCancel = async (id) => {
		await cancelBook(id)
		navigate(LK_ROUTE, { replace: true })
	}

	const clickTakeInJob = async (id) => {
		await takeOrderInJob(id)
		navigate(LK_ROUTE, { replace: true })
	}

	const clickMarkAsPaid = async (id) => {
		await markOrderAsPaid(id)
		navigate(LK_ROUTE, { replace: true })
	}

	function styleTr(isPaid) {
		if (isPaid) {
			return { backgroundColor: 'lightgreen' }
		}
		return {}
	}

	return (
		<div>
			<h4>Имя: {user.firstName}</h4>
			<h4>Фамилия: {user.lastName}</h4>
			<h4>Отчество: {user.patronymic}</h4>
			{isFreeOrders ? (
				<div style={{ marginTop: '2rem' }}>
					<Button onClick={() => navigate(LK_ROUTE)}>
						Показать свои заказы
					</Button>
				</div>
			) : (
				<div style={{ marginTop: '2rem' }}>
					<Button onClick={() => navigate(LK_FREE_ORDERS_ROUTE)}>
						Показать новые заказы
					</Button>
				</div>
			)}

			{isFreeOrders ? (
				<>
					<h3 style={{ marginTop: '2rem' }}>Свободные заказы:</h3>
					<Table striped bordered hover bgcolor="white">
						<thead>
							<tr>
								<th>№ Заказа</th>
								<th>Клиент</th>
								<th>Данные заказа</th>
								<th>Даты заказа</th>
								<th>Стоимость</th>
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(freeOrders.orders) &&
							freeOrders.orders.length
								? freeOrders.orders.map((order) => (
										<tr key={order.id}>
											<td>{order.id}</td>
											<td>
												{order.clientName}
												<br />
												{order.clientPhoneNumber}
											</td>
											<td>
												Тур:{order.tourName}
												<br />
												Отель:{order.hotelName}
												<br />
												Номер:{order.accomodationName}
											</td>
											<td>
												С: {order.startDate} По:{' '}
												{order.endDate}
											</td>
											<td>{order.price} р.</td>
											<td>
												<Button
													className="mb-1"
													onClick={() =>
														clickTakeInJob(order.id)
													}
												>
													Взять в работу
												</Button>
												<br />
												<Button
													className="mt-1"
													variant="danger"
													onClick={() =>
														clickCancel(order.id)
													}
												>
													Отменить
												</Button>
											</td>
										</tr>
								  ))
								: null}
						</tbody>
					</Table>
				</>
			) : (
				<>
					<h3 style={{ marginTop: '2rem' }}>Мои заказы:</h3>
					<Table striped bordered hover bgcolor="white">
						<thead>
							<tr>
								<th>№ Заказа</th>
								<th>Клиент</th>
								<th>Данные заказа</th>
								<th>Даты заказа</th>
								<th>Стоимость</th>
								<th>Действия</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(user.orders) && user.orders.length
								? user.orders.map((order) => (
										<tr
											key={order.id}
											style={styleTr(order.isPaid)}
										>
											<td>{order.id}</td>
											<td>
												{order.clientName}
												<br />
												{order.clientPhoneNumber}
											</td>
											<td>
												Тур:{order.tourName}
												<br />
												Отель:{order.hotelName}
												<br />
												Номер:{order.accomodationName}
											</td>
											<td>
												С: {order.startDate} По:{' '}
												{order.endDate}
											</td>
											<td>{order.price} р.</td>
											<td>
												{order.isPaid ? (
													<>Заказ оплачен</>
												) : (
													<>
														<Button
															className="mb-1"
															onClick={() =>
																clickMarkAsPaid(
																	order.id
																)
															}
														>
															Пометить оплаченным
														</Button>
														<br />
														<Button
															className="mt-1"
															variant="danger"
															onClick={() =>
																clickCancel(
																	order.id
																)
															}
														>
															Отменить
														</Button>
													</>
												)}
											</td>
										</tr>
								  ))
								: null}
						</tbody>
					</Table>
				</>
			)}
		</div>
	)
}

export default managerCabinet
