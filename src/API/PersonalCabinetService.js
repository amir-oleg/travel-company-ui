import { $authHost } from './index'

export const getPersonalData = async () => {
	const response = await $authHost.get('api/lk')

	return response.data
}

export const getManagerData = async () => {
	const response = await $authHost.get(`api/lk/manager`)
	return response.data
}

export const getNewOrders = async () => {
	const response = await $authHost.get(`api/lk/manager/new-orders`)
	return response.data
}

export const getAdminStats = async (month) => {
	const response = await $authHost.post(`api/lk/admin`, { month })
	return response.data
}

export const getTourStats = async (month) => {
	const response = await $authHost.post(`api/lk/admin/tours`, { month })
	return response.data
}
