import { makeAutoObservable } from "mobx"

class mainStore {
    log = ""
    isErrorLog = false
    authorized = false
    user = {}

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentLog(log) {
        this.log = log
    }

    setErrorLog(isError) {
        this.isErrorLog = isError
    }

    setAuthorized(auth) {
        this.authorized = auth
    }

    setUserData(user) {
        this.user = user
    }

    removeUserData() {
        this.user = {}
    }
}

const mainStorage = new mainStore()
export default mainStorage
