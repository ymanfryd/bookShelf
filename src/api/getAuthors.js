import request from "./request";

export default async function getAuthors() {
    const endpoint = '/api/authors'

    // return request(endpoint, requestOptions)

    return [
        {name: 'name1', id: 1, year: 1832},
        {name: 'name2', id: 2, year: 1834},
        {name: 'name3', id: 3, year: 1832},
        {name: 'name4', id: 4, year: 1834},
        {name: 'name5', id: 5, year: 1832},
        {name: 'name6', id: 6, year: 1834},
    ]
}
