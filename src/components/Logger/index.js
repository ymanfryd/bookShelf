import React, {useState} from "react";
import './style/index.css'
import mainStore from "../../store/mainStore"
import {observer} from "mobx-react-lite";

const Logger = observer(() => {
    const [expanded, setExpanded] = useState(false)

    const styles = {
        container: {
            width: expanded ? '300px' : '150px',
            height:  expanded ? '300px' : '150px',
            fontSize:  expanded ? '15px' : '10px',
            backgroundColor: mainStore.isErrorLog ? '#ff9ca1' : '#c9ff9c'
        }
    }

    return (!!mainStore.log.length &&
        <div className='loggerWrapper'>
            <div className='closeCross'
                 onClick={() => mainStore.setCurrentLog('')}>X</div>
            <div className="loggerContainer"
                 onClick={() => setExpanded(!expanded)}
                 style={styles.container}
            >
                {mainStore.log}
            </div>
        </div>
    )
})

export default Logger


