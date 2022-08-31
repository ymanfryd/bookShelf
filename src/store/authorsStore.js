import { makeAutoObservable } from "mobx"

class authorsStorage {
    authors = {}
    authorPressed = undefined
    authorToEdit = undefined
    createAuthorPressed = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuthors(authors) {
        this.authors = authors
    }

    setAuthorPressed(author) {
        this.authorPressed = author
    }

    unsetAuthorPressed() {
        this.authorPressed = undefined
    }

    setAuthorToEdit(author) {
        this.authorToEdit = author
    }

    unsetAuthorToEdit() {
        this.authorToEdit = undefined
    }

    setCreateAuthorPressed(value) {
        this.createAuthorPressed = value
    }
}

const authorsStore = new authorsStorage()
export default authorsStore
