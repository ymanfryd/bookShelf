import { makeAutoObservable } from "mobx"

class booksStorage {
    books = []
    bookToEdit = undefined
    createBookPressed = false

    constructor() {
        makeAutoObservable(this)
    }

    setBooks(books) {
        this.books = books
    }

    setBookToEdit(book) {
        this.bookToEdit = book
    }

    unsetBookToEdit() {
        this.bookToEdit = undefined
    }

    setCreateBookPressed(value) {
        this.createBookPressed = value
    }
}

const booksStore = new booksStorage()
export default booksStore
