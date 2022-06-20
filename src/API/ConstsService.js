import { $host } from './index'

export const getDietTypes = async () => {
	const response = await $host.get('api/consts/diet-types')
	return response.data
}

export const getHotelCategories = async () => {
	const response = await $host.get(`api/consts/hotel-cats`)
	return response.data
}

export const getTourCategories = async () => {
	const response = await $host.get(`api/consts/tour-cats`)
	return response.data
}

export const getAccomodations = async (id) => {
	const response = await $host.get(`api/consts/accomodations/${id}`)
	return response.data
}

export const getCountries = async () => {
	const response = await $host.get(`api/consts/countries`)
	return response.data
}

export const getTransportTypes = async () => {
	const response = await $host.get(`api/consts/transportTypes`)
	return response.data
}

export const getCities = async (countryId) => {
	const response = await $host.get(`api/consts/cities/${countryId}`)
	return response.data
}

export const getHotels = async (cityId) => {
	const response = await $host.get(`api/consts/hotels/${cityId}`)
	return response.data
}

export const getAccs = async (hotelId) => {
	const response = await $host.get(`api/consts/accomodations/${hotelId}`)
	return response.data
}
