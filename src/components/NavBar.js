/* eslint-disable import/no-cycle */
import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import {
	LK_ROUTE,
	LOGIN_ROUTE,
	HOME_ROUTE,
	TOUR_ADD_ROUTE,
	TOURS_SEARCH_ROUTE,
	HOTEL_ADD_ROUTE,
	HOTEL_SEARCH_ROUTE,
	HOTEL_ADMIN_SEARCH_ROUTE,
} from '../utils/consts'
import { Context } from '../index'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const navigate = useNavigate()

	const logOut = () => {
		user.setUser({})
		user.setRoles([])
		user.setIsAuth(false)
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavLink style={{ color: 'white' }} to={HOME_ROUTE}>
					Туристическая фирма
				</NavLink>
				{user.isAuth && user.roles.includes('Admin') ? (
					<Button
						variant="outline-light"
						onClick={() =>
							navigate(HOTEL_ADMIN_SEARCH_ROUTE, {
								replace: true,
							})
						}
						style={{ marginLeft: '1rem' }}
					>
						Отели
					</Button>
				) : (
					<Button
						variant="outline-light"
						onClick={() =>
							navigate(HOTEL_SEARCH_ROUTE, {
								replace: true,
							})
						}
						style={{ marginLeft: '1rem' }}
					>
						Отели
					</Button>
				)}

				<Button
					variant="outline-light"
					onClick={() =>
						navigate(TOURS_SEARCH_ROUTE, { replace: true })
					}
					style={{ marginLeft: '1rem' }}
				>
					Туры
				</Button>
				{user.isAuth && user.roles.includes('Admin') ? (
					<Button
						variant="outline-light"
						onClick={() =>
							navigate(TOUR_ADD_ROUTE, { replace: true })
						}
						style={{ marginLeft: '1rem' }}
					>
						Добавить тур
					</Button>
				) : null}
				{user.isAuth && user.roles.includes('Admin') ? (
					<Button
						variant="outline-light"
						onClick={() =>
							navigate(HOTEL_ADD_ROUTE, { replace: true })
						}
						style={{ marginLeft: '1rem' }}
					>
						Добавить отель
					</Button>
				) : null}
				{user.isAuth ? (
					<Nav className="ml-auto" style={{ color: 'white' }}>
						<Button
							variant="outline-light"
							onClick={() =>
								navigate(LK_ROUTE, { replace: true })
							}
						>
							Личный кабинет
						</Button>
						<Button
							variant="outline-light"
							onClick={() => logOut()}
							className="ml-2"
						>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav className="ml-auto" style={{ color: 'white' }}>
						<Button
							variant="outline-light"
							onClick={() =>
								navigate(LOGIN_ROUTE, { replace: true })
							}
							style={{ marginLeft: '1rem' }}
						>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
