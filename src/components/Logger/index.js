import React, {useEffect, useRef, useState} from "react";
import './style/index.css'
import mainStore from "../../store/mainStore"
import {observer} from "mobx-react-lite";

const Logger = observer(() => {
    const [expanded, setExpanded] = useState(false)
    const [currentLog, setCurrentLog] = useState('')
    const [visible, setVisible] = useState(false)
    const logs = Object.values(mainStore.log)
    const [currentIndex, setCurrentIndex] = useState(logs.length)

    useEffect(() => {
        if (mainStore.logLength) {
            setCurrentLog(logs[logs.length - 1])
            setCurrentIndex(logs.length - 1)
            setVisible(true)
        }
    }, [mainStore.logLength])

    const styles = {
        container: {
            width: expanded ? '450px' : '150px',
            height: expanded ? '300px' : '150px',
            fontSize: expanded ? '15px' : '10px',
            backgroundColor: currentLog?.error ? '#ffd0d3' : '#d2ffd0'
        }
    }

    function wordWrap(text, width) {
        if (!text)
            return
        const re = new RegExp("([\\w\\s]{" + (width - 2) + ",}?\\w)\\s?\\b", "g")
        return text.replace(/,"/g, ', "').replace(/,\\"/g, ', \\"').replace(re, "$1\n")
    }


    function LoggerControlPanel() {

        function prevLog() {
            setCurrentIndex(prev => {
                const index = prev - 1
                if (index >= 0) {
                    setCurrentLog(logs[index])
                    return index
                }
                return prev
            })
        }

        function nextLog() {
            setCurrentIndex(prev => {
                const index = prev + 1
                if (index < logs.length) {
                    setCurrentLog(logs[index])
                    return index
                }
                return prev
            })
        }

        return (
            <div className="LoggerControlPanel">
                <div className='closeCross'
                     onClick={() => {
                         setVisible(false)
                         setExpanded(false)
                     }}>X
                </div>
                <div className='nextLog'
                     onClick={prevLog}>{"<"}</div>
                <div className='nextLog'
                     onClick={nextLog}>{">"}</div>
                <div className='nextLog'
                     onClick={() => setExpanded(!expanded)}>{expanded ? "><" : "<>"}</div>
            </div>);
    }

    return (!!visible &&
        <div className='loggerWrapper'>
            <LoggerControlPanel/>
            <div className="loggerContainer"
                 onClick={() => setExpanded(true)}
                 style={styles.container}
            >
                {wordWrap(currentLog?.log, 25)}
            </div>
        </div>
    )
})

export default Logger


