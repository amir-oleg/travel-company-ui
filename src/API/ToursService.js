import { $host, $authHost } from './index'

export const searchByParams = async (
	startPlace,
	endPlace,
	transportType,
	guestsCount,
	childrenCount,
	startDate,
	days,
	dietTypes,
	hotelCategories,
	tourCategories,
	priceFrom,
	priceTo,
	page
) => {
	const response = await $host.post(
		'api/tours/search',
		{
			startPlace,
			endPlace,
			transportType,
			guestsCount,
			childrenCount,
			startDate,
			days,
			dietTypes,
			hotelCategories,
			tourCategories,
			priceFrom,
			priceTo,
		},
		{ params: { page } }
	)

	return response.data
}

export const getTourById = async (id) => {
	const response = await $host.get(`api/tours/tour/${id}`)
	return response.data
}

export const addTour = async (
	name,
	startCity,
	endCity,
	transportType,
	guestsCount,
	childrenCount,
	days,
	dietType,
	tourCategories,
	price,
	attributes,
	accomodation,
	image
) => {
	const response = await $authHost.post('api/tours/tour', {
		name,
		startCity,
		endCity,
		transportType,
		guestsCount,
		childrenCount,
		days,
		dietType,
		tourCategories,
		price,
		attributes,
		accomodation,
		image,
	})

	return response.data
}
