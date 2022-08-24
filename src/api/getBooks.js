import booksStore from "../store/booksStore"
import request from "./request"

export default async function getBooks() {
    const endpoint = 'api/books'

    await request(endpoint, 'GET', null, true)
    const res = [
        {name: 'name1', author_id: 1, year: 1832},
        {name: 'name2', author_id: 1, year: 1834},
        {name: 'name3', author_id: 1, year: 1832},
        {name: 'name4', author_id: 1, year: 1834},
        {name: 'name5', author_id: 1, year: 1832},
        {name: 'name6', author_id: 1, year: 1834},
        {name: 'name7', author_id: 1, year: 1834},
        {name: 'name8', author_id: 1, year: 1832},
        {name: 'name9', author_id: 1, year: 1834},
        {name: 'name10', author_id: 1, year: 1834},
        {name: 'name11', author_id: 1, year: 1832},
        {name: 'name12', author_id: 1, year: 1834},
        {name: 'name13', author_id: 1, year: 1832},
        {name: 'name14', author_id: 1, year: 1834},
    ]
    booksStore.setBooks(res)
    return res
}
