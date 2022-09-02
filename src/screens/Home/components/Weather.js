import {useEffect, useState} from "react";
import '../styles/index.css'
import {Tooltip, XAxis, AreaChart, Area, YAxis, ResponsiveContainer, LabelList} from "recharts";


async function getWeather() {
    // const res = await request('/api/weather', 'GET', null, false)
    const res = {
        "data": [
            {
                "type": "weather",
                "id": "20",
                "attributes": {
                    "value": 71,
                    "time": "2022-09-01 16:11:03"
                }
            },
            {
                "type": "weather",
                "id": "19",
                "attributes": {
                    "value": 21.9,
                    "time": "2022-09-02 16:11:03"
                }
            },
            {
                "type": "weather",
                "id": "18",
                "attributes": {
                    "value": 0,
                    "time": "2022-09-03 16:10:03"
                }
            },
            {
                "type": "weather",
                "id": "17",
                "attributes": {
                    "value": -21.9,
                    "time": "2022-09-04 16:10:03"
                }
            },
            {
                "type": "weather",
                "id": "15",
                "attributes": {
                    "value": -21.8,
                    "time": "2022-09-05 16:09:03"
                }
            },
            {
                "type": "weather",
                "id": "16",
                "attributes": {
                    "value": -71,
                    "time": "2022-09-06 16:09:03"
                }
            },
            {
                "type": "weather",
                "id": "13",
                "attributes": {
                    "value": 21.8,
                    "time": "2022-09-07 16:08:03"
                }
            },
            {
                "type": "weather",
                "id": "14",
                "attributes": {
                    "value": 71,
                    "time": "2022-09-08 16:08:03"
                }
            },
            {
                "type": "weather",
                "id": "11",
                "attributes": {
                    "value": 109,
                    "time": "2022-09-09 16:07:03"
                }
            },
            {
                "type": "weather",
                "id": "12",
                "attributes": {
                    "value": 71,
                    "time": "2022-09-10 16:07:03"
                }
            },
            {
                "type": "weather",
                "id": "9",
                "attributes": {
                    "value": 21.9,
                    "time": "2022-09-11 16:06:02"
                }
            },
            {
                "type": "weather",
                "id": "10",
                "attributes": {
                    "value": 1,
                    "time": "2022-09-12 16:06:02"
                }
            },
            {
                "type": "weather",
                "id": "7",
                "attributes": {
                    "value": -21.9,
                    "time": "2022-09-13 16:05:02"
                }
            },
            {
                "type": "weather",
                "id": "8",
                "attributes": {
                    "value": 21,
                    "time": "2022-09-14 16:05:02"
                }
            },
            {
                "type": "weather",
                "id": "5",
                "attributes": {
                    "value": 31.9,
                    "time": "2022-09-15 16:04:05"
                }
            }
        ]
    }
    // if (res?.status < 300) {
    //     const data = res?.text?.data
    const data = res.data
    if (data) {
        const values = []
        data.map(item => values.push({
            id: item.id,
            temperature: item.attributes.value,
            time: item.attributes.time,
            timestamp: new Date(item.attributes.time).getTime()
        }))
        values.sort((a, b) => {
            if (a.timestamp < b.timestamp)
                return -1
            if (a.timestamp > b.timestamp)
                return 1
            return 0
        })
        return values
    }
    // }
    // return
}

const gradientOffset = (weather) => {
    const dataMax = Math.max(...weather.map((i) => i.temperature));
    const dataMin = Math.min(...weather.map((i) => i.temperature));
    if (dataMax <= 0)
        return 0
    if (dataMin >= 0)
        return 1
    return dataMax / (dataMax - dataMin);
};


export default function Weather() {
    const [weather, setWeather] = useState([])
    const [off, setOff] = useState(0)


    useEffect(() => {
        setOff(gradientOffset(weather))
    }, [weather])

    useEffect(() => {
        getWeather().then(res => setWeather(res))
    }, [])

    function getDate(timestamp) {
        let date = new Date(timestamp).toLocaleDateString() + " "
        const hours = new Date(timestamp).getHours()
        const minutes = new Date(timestamp).getMinutes()
        date += hours < 10 ? `0${hours}` : hours
        date += ":"
        date += minutes < 10 ? `0${minutes}` : minutes
        return date
    }

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="customTooltip">
                    <p>{getDate(label)}</p>
                    <p>{`Temperature: ${payload[0].value}`}</p>
                </div>
            )
        }
        return null
    }


    return (
        <div style={{width: '80vw', height: 300}}>
            <ResponsiveContainer>
                <AreaChart
                    data={weather}
                    margin={{top: 5, right: 20, left: 10, bottom: 5}}
                >
                    <XAxis dataKey="timestamp" name='time' type="number"
                           tickFormatter={getDate}
                           domain={[Math.min(...weather.map((i) => i.timestamp)), Math.max(...weather.map((i) => i.timestamp))]}/>
                    <YAxis dataKey='temperature' type="number"/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#F68084" stopOpacity={1}/>
                            <stop offset={off} stopColor="#A6C0FE" stopOpacity={1}/>
                        </linearGradient>
                    </defs>

                    <Area type="monotone" dataKey="temperature" stroke="#000" fill="url(#splitColor)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
