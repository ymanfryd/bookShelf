import { makeAutoObservable } from "mobx"

class booksStorage {
    books = []

    constructor() {
        makeAutoObservable(this)
    }

    setBooks(books) {
        this.books = books
    }
}

const booksStore = new booksStorage()
export default booksStore
