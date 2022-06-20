import { $host, $authHost } from './index'

export const getBySearchParams = async (
	country,
	startDate,
	endDate,
	guests
) => {
	const response = await $host.get('api/accomodations', {
		params: { country, startDate, endDate, guests },
	})

	return response.data
}

export const getAccomodationsInHotel = async (hotelId) => {
	const response = await $host.get(`api/hotels/${hotelId}/accomodations`)
	return response.data
}

export const getHotelById = async (hotelId) => {
	const response = await $host.get(`api/hotels/${hotelId}/`)
	return response.data
}

export const getAccomodationsInHotelEav = async (
	hotelId,
	startDate,
	endDate,
	guests
) => {
	const response = await $host.get(
		`api/hotels/${hotelId}/accomodations/eav`,
		{ params: { startDate, endDate, guests } }
	)
	return response.data
}

export const getHotelByIdEav = async (hotelId) => {
	const response = await $host.get(`api/hotels/${hotelId}/eav`)
	return response.data
}

export const getHotelBySearchString = async (search, page) => {
	const response = await $authHost.get(`api/hotels`, {
		params: { search, page },
	})
	return response.data
}

export const addHotel = async (
	hotelName,
	categoryCode,
	city,
	previewImageBase64,
	hotelAttributes,
	accomodations
) => {
	const response = await $authHost.post(`api/hotels/hotel`, {
		hotelName,
		categoryCode,
		city,
		previewImageBase64,
		hotelAttributes,
		accomodations,
	})
	return response.data
}
