import React, {useEffect} from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";
import request from "../../api/request";

export default function Home() {
    const authorized = mainStore.authorized
    const title = authorized ? `Welcome to BookShelf, ${mainStore.user.name}` : 'Home'

    useEffect(() => {
        if (authorized) {
            request('/api/me', 'GET', null, true)
        }
    }, [])

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">{title}</h2>
            {authorized && <p>{`Is admin: ${!!mainStore.user.is_admin}`}</p>}
        </div>

    );
}
