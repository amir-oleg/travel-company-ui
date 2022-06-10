/* eslint-disable no-underscore-dangle */
import {makeAutoObservable} from "mobx";

export default class HotelStore {
    constructor() {
        this._hotels = []
        this._page = 1
        this._totalCount = 0
        this._limit = 50
        makeAutoObservable(this)
    }

    setHotels(hotels){
        this._hotels = hotels
    }

    setPage(page){
        this._page = page
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    setLimit(limit){
        this._limit = limit
    }

    get hotels() {
        return this._hotels
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}