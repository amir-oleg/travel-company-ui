/* eslint-disable no-underscore-dangle */
import { makeAutoObservable } from 'mobx'

export default class TourStore {
	constructor() {
		this._tours = []
		this._page = 1
		this._totalCount = 0
		makeAutoObservable(this)
	}

	setTours(tours) {
		this._tours = tours
	}

	setPage(page) {
		this._page = page
	}

	setTotalCount(totalCount) {
		this._totalCount = totalCount
	}

	get tours() {
		return this._tours
	}

	get totalCount() {
		return this._totalCount
	}

	get page() {
		return this._page
	}
}
