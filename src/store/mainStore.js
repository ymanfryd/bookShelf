import {configure , makeAutoObservable} from "mobx"

configure({
    enforceActions: "never",
})

class mainStore {
    log = {}
    logLength = 0
    isErrorLog = false
    authorized = false
    user = {}
    constructor() {
        makeAutoObservable(this)
    }

    setCurrentLog(log) {
        const len = Object.keys(this.log).length
        this.log[len] = log
        this.logLength++
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
