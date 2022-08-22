import React, {useEffect} from "react";
import Index from "../../components/Header";
import mainStore from "../../store/mainStore";

export default function Authors() {

    useEffect(() => {
        mainStore.setCurrentLog("Hello from Authors")
    }, [])

    return (
        <div>
            <Index/>
            <h2 className='pageTitle'>Authors</h2>
        </div>
    )
}
