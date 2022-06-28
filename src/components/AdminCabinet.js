/* eslint-disable import/no-cycle */
import { useState, useEffect } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import { getAdminStats, getTourStats } from '../API/PersonalCabinetService'

function AdminCabinet() {
	const [stats, setStats] = useState([])
	const [tourStats, setTourStats] = useState([])
	const [managerStat, setManagerStat] = useState(true)
	const [managerDate, setManagerDate] = useState('2022-06')
	const [tourDate, setTourDate] = useState('2022-06')

	useEffect(() => {
		getAdminStats().then((data) => setStats(data))
	}, [managerDate])

	useEffect(() => {
		getTourStats().then((data) => setTourStats(data))
	}, [tourDate])

	const clickManagerStat = () => {
		setManagerStat(true)
	}

	const clickTourStat = () => {
		setManagerStat(false)
	}

	return (
		<div style={{ marginTop: '3rem' }}>
			<Button
				onClick={() => clickManagerStat()}
				style={{ marginRight: '2rem' }}
			>
				Статистика по менеджерам
			</Button>
			<Button onClick={() => clickTourStat()}>Статистика по турам</Button>
			{managerStat ? (
				<>
					<h2 style={{ marginTop: '3rem' }}>
						Статистика по менеджерам:
					</h2>
					<Form.Control
						value={managerDate}
						onChange={(e) => setManagerDate(e.target.value)}
						type="month"
						style={{ width: '200px' }}
					/>
					<Table striped bordered hover bgcolor="white">
						<thead>
							<tr>
								<th>№</th>
								<th>Менеджер</th>
								<th>Доход</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(stats) && stats.length
								? stats.map((stat, index) => (
										<tr key={stat.managerName}>
											<td>{index}</td>
											<td>{stat.managerName}</td>
											<td>{stat.income} р.</td>
										</tr>
								  ))
								: null}
						</tbody>
					</Table>
				</>
			) : (
				<>
					<h2 style={{ marginTop: '3rem' }}>Статистика по турам:</h2>
					<Form.Control
						value={tourDate}
						onChange={(e) => setTourDate(e.target.value)}
						type="month"
						style={{ width: '200px' }}
					/>
					<Table striped bordered hover bgcolor="white">
						<thead>
							<tr>
								<th>№</th>
								<th>Тур</th>
								<th>Заказов</th>
								<th>Сумма</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(tourStats) && tourStats.length
								? tourStats.map((stat, index) => (
										<tr key={stat.tourName}>
											<td>{index}</td>
											<td>{stat.tourName}</td>
											<td>{stat.countOfOrders}</td>
											<td>{stat.total} р.</td>
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

export default AdminCabinet
