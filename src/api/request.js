import mainStorage from "../store/mainStore";

export default async function request(endpoint, method, body, authorization) {
    const host = process.env.REACT_APP_HOST
    const myHeaders = new Headers()
    myHeaders.append("Accept", "application/json")
    myHeaders.append("Content-Type", "application/json")
    // myHeaders.append("Access-Control-Allow-Origin", host)
    if (authorization)
        myHeaders.append("Authorization", "Bearer 5|oQckFXk8Iq1H7YlWk7oIbHoWb2NkNd1UujccjSCY");

    const requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    }
    if (body)
        requestOptions.body = JSON.stringify(body)
    console.log(JSON.stringify(requestOptions))
    try {
        const res = await fetch(host + endpoint, requestOptions)
        const text = await res.text()
        mainStorage.setErrorLog(res.status !== 200)
        mainStorage.setCurrentLog(res)
        console.log(text)
        return text
    } catch (e) {
        mainStorage.setErrorLog(true)
        mainStorage.setCurrentLog(e.name + ": " + e.message)
    }
}
