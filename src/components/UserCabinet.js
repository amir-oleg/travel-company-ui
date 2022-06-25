/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getPersonalData } from '../API/PersonalCabinetService'
import { cancelBook } from '../API/OrdersService'
import { LK_ROUTE } from '../utils/consts'

const userCabinet = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [user, setUser] = useState({})
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const navigate = useNavigate()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		getPersonalData().then((data) => setUser(data))
	}, [])

	const click = async (id) => {
		await cancelBook(id)
		navigate(LK_ROUTE, { replace: true })
	}

	function styleTr(isPaid) {
		if (isPaid) {
			return { backgroundColor: 'darkgrey' }
		}
		return {}
	}

	return (
		<div>
			<h3>Имя: {user.firstName}</h3>
			<h3>Фамилия: {user.lastName}</h3>
			<h3>Отчество: {user.patronymic}</h3>
			<br />
			<h3>Заказы:</h3>
			<Table striped bordered hover bgcolor="white">
				<thead>
					<tr>
						<th>№ Заказа</th>
						<th>Содержание</th>
						<th>С</th>
						<th>По</th>
						<th>Стоимость</th>
						<th>Действие</th>
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
										Тур:{order.tourName}
										<br />
										Отель:{order.hotelName}
										<br />
										Номер:{order.accomodationName}
									</td>
									<td>{order.startDate}</td>
									<td>{order.endDate}</td>
									<td>{order.price} р.</td>
									<td>
										{order.isPaid ? (
											<>
												Заказ оплачен
												<br />
												<Button>Скачать путевку</Button>
											</>
										) : (
											<Button
												variant="danger"
												onClick={() => click(order.id)}
											>
												Отменить
											</Button>
										)}
									</td>
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
		</div>
	)
}

export default userCabinet
