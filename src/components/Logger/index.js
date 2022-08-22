import React from "react";
import './index.css'
import mainStore from "../../store/mainStore"
import {observer} from "mobx-react-lite";

const Logger = observer(() =>
        <div className="loggerContainer">
            {mainStore.log}
        </div>
)
export default Logger
