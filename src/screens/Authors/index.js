import React, {useEffect} from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";

export default function Authors() {

    useEffect(() => {
    }, [])

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className='pageTitle'>Authors</h2>
        </div>
    )
}
