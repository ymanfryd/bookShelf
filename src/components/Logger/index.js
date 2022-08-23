import React, {useState} from "react";
import './style/index.css'
import mainStore from "../../store/mainStore"
import {observer} from "mobx-react-lite";

const Logger = observer(() => {
    const [expanded, setExpanded] = useState(false)

    return (!!mainStore.log.length &&
        <div className='loggerWrapper'>
            <div className='closeCross'
                 onClick={() => mainStore.setCurrentLog('')}>X</div>
            <div className="loggerContainer"
                 onClick={() => setExpanded(!expanded)}
                 style={expanded ? styles.containerExpanded : styles.container}
            >
                {mainStore.log}
            </div>
        </div>
    )
})

export default Logger

const styles = {
    container: {
        width: '150px',
        height: '150px',
        fontSize: '10px'
    },
    containerExpanded: {
        width: '300px',
        height: '300px',
        fontSize: '15px'
    }
}
