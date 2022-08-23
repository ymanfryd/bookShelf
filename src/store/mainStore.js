import { makeAutoObservable } from "mobx"

class mainStore {
    log = ""
    authorized = false
    user = {}

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentLog(log) {
        this.log = log
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
