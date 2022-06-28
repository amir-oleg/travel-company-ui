/* eslint-disable no-underscore-dangle */
import { makeAutoObservable } from 'mobx'

export default class SearchStore {
	constructor() {
		this._startDate = {}
		this._endDate = {}
		this._guests = {}
		this._countries = []
		this._days = {}
		makeAutoObservable(this)
	}

	setStartDate(startDate) {
		this._startDate = startDate
	}

	setEndDate(endDate) {
		this._endDate = endDate
	}

	setGuests(guests) {
		this._guests = guests
	}

	setCountries(countries) {
		this._countries = countries
	}

	setDays(days) {
		this._days = days
	}

	get startDate() {
		return this._startDate
	}

	get endDate() {
		return this._endDate
	}

	get guests() {
		return this._guests
	}

	get countries() {
		return this._countries
	}

	get days() {
		return this._days
	}
}
