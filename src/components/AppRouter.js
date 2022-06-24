/* eslint-disable import/no-cycle */
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import PersonalCabinet from '../pages/PersonalCabinet'
import {
	LK_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	HOME_ROUTE,
	HOTELS_ROUTE,
	LK_FREE_ORDERS_ROUTE,
	TOURS_ROUTE,
	TOUR_ADD_ROUTE,
	TOURS_SEARCH_ROUTE,
	HOTEL_ADD_ROUTE,
	HOTEL_SEARCH_ROUTE,
	HOTEL_ADMIN_SEARCH_ROUTE,
} from '../utils/consts'
import Auth from '../pages/Auth'
import HotelsList from './HotelsList'
import HotelEav from '../pages/HotelEav'
import HotelEavAdmin from '../pages/HotelEavAdmin'
import ToursList from '../pages/ToursList'
import Tour from '../pages/Tour'
import TourAdd from '../pages/TourAdd'
import SearchHotels from './SearchHotels'
import SearchTours from './SearchTours'
import SearchHotelsAdmin from './SearchHotelsAdmin'
import HotelAdd from '../pages/HotelAdd'
import HomePage from '../pages/HomePage'

const AppRouter = observer(() => {
	const { user } = useContext(Context)

	return (
		<Routes>
			<Route
				path={LK_ROUTE}
				element={
					user.isAuth ? (
						<PersonalCabinet />
					) : (
						<Navigate to={HOME_ROUTE} />
					)
				}
			/>
			<Route
				path={LK_FREE_ORDERS_ROUTE}
				element={
					user.isAuth ? (
						<PersonalCabinet />
					) : (
						<Navigate to={HOME_ROUTE} />
					)
				}
			/>
			<Route path={LOGIN_ROUTE} element={<Auth />} />
			<Route path={REGISTRATION_ROUTE} element={<Auth />} />
			<Route path={HOTELS_ROUTE} element={<HotelsList />} />
			{user.roles.includes('Admin') ? (
				<Route path="/hotels/:id" element={<HotelEavAdmin />} />
			) : (
				<Route path="/hotels/:id" element={<HotelEav />} />
			)}
			<Route path={TOURS_ROUTE} element={<ToursList />} />
			{user.roles.includes('Admin') ? (
				<Route path="/tours/tour/:id" element={<Tour />} />
			) : (
				<Route path="/tours/tour/:id" element={<Tour />} />
			)}
			{user.roles.includes('Admin') ? (
				<Route path={TOUR_ADD_ROUTE} element={<TourAdd />} />
			) : null}
			{user.roles.includes('Admin') ? (
				<Route path={HOTEL_ADD_ROUTE} element={<HotelAdd />} />
			) : null}
			<Route path={TOURS_SEARCH_ROUTE} element={<SearchTours />} />

			{user.roles.includes('Admin') ? (
				<Route
					path={HOTEL_ADMIN_SEARCH_ROUTE}
					element={<SearchHotelsAdmin />}
				/>
			) : (
				<Route path={HOTEL_SEARCH_ROUTE} element={<SearchHotels />} />
			)}
			<Route path={HOME_ROUTE} element={<HomePage />} />
		</Routes>
	)
})

export default AppRouter
