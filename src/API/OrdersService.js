import { $authHost } from './index'

export const createOrder = async (
	startDate,
	endDate,
	accomodationId,
	tourId
) => {
	const response = await $authHost.post('api/orders/create', {
		startDate,
		endDate,
		accomodationId,
		tourId,
	})

	return response.data
}

export const cancelBook = async (id) => {
	const response = await $authHost.post(`api/orders/order/${id}/cancel`)
	return response.data
}

export const getFreeOrders = async () => {
	const response = await $authHost.get(`api/orders/free`)
	return response.data
}

export const takeOrderInJob = async (id) => {
	const response = await $authHost.post(`api/orders/order/${id}/take-in-job`)
	return response.data
}

export const markOrderAsPaid = async (id) => {
	const response = await $authHost.post(`api/orders/order/${id}/mark-as-paid`)
	return response.data
}
