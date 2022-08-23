import axios from 'axios'
import mainStorage from "../store/mainStore";

export default async function getAuthors() {
    // const host = process.env.REACT_APP_HOST;
    // const endpoint = mainStorage.user.isAdmin ? 'api/admin/books' : 'api/books'
    // const res = await axios.get(host + endpoint)
    // console.log(res)
    return [
        {name: 'name1', id: 1, year: 1832},
        {name: 'name2', id: 2, year: 1834},
        {name: 'name3', id: 3, year: 1832},
        {name: 'name4', id: 4, year: 1834},
        {name: 'name5', id: 5, year: 1832},
        {name: 'name6', id: 6, year: 1834},
    ]
}
