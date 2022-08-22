import React, {useEffect} from "react";
import Index from "../../components/Header";
import mainStore from "../../store/mainStore";

export default function Books () {
    useEffect(() => {
        mainStore.setCurrentLog("Hello from Books")
    }, [])

    return (
        <div>
            <Index/>
            <h2 className="pageTitle">Books</h2>
        </div>
    )
}
