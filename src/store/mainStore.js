import React from "react"
import { makeAutoObservable } from "mobx"

class mainStore {
    log = ""
    authorized = false

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentLog(log) {
        this.log = log
    }

    setAuthorized(auth) {
        this.authorized = auth
    }
}

const mainStorage = new mainStore()
export default mainStorage
