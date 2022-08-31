import mainStorage from "../store/mainStore";

function createLog(myHeaders, requestOptions, endpoint, res, text, startTime) {
    const endTime = Date.now()
    let headersString = "{"
    myHeaders.forEach((key, value) => {
        headersString += `${value}: ${key}\n`
    })
    const {headers, ...options} = requestOptions
    const log = `Request:\nEndpoint: ${endpoint}\n` +
        `Options: ${JSON.stringify(options)}\n` +
        `Headers: ${headersString.substr(0,headersString.length -1)}}\n\n` +
        `Response time: ${endTime - startTime} ms\n\n` +
        `Response:\nStatus: ${res.status}\nText: ${text}`
    mainStorage.setCurrentLog({log: log, error: res.status >= 300})
    console.log(log)
}

export default async function request(endpoint, method, body, authorization) {
    const host = process.env.REACT_APP_HOST
    const token = localStorage.getItem('token')
    const myHeaders = new Headers()
    myHeaders.append("Accept", "application/json")
    myHeaders.append("Content-Type", "application/json")
    if (authorization && token)
        myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: method,
        headers: myHeaders
    }
    if (body)
        requestOptions.body = JSON.stringify(body)
    try {
        const startTime = Date.now()
        const res = await fetch(host + endpoint, requestOptions)
        const text = await res.text()
        createLog(myHeaders, requestOptions, endpoint, res, text, startTime)
        if (text)
            return {text: JSON.parse(text), status: res.status}
        return {status: res.status}
    } catch (e) {
        mainStorage.setCurrentLog({log: host + endpoint + "\n" + e.name + ": " + e.message, error: true})
    }
}
