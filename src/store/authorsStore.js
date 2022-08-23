import { makeAutoObservable } from "mobx"

class authorsStorage {
    authors = {}

    constructor() {
        makeAutoObservable(this)
    }

    setAuthors(authors) {
        this.authors = authors
    }
}

const authorsStore = new authorsStorage()
export default authorsStore
