import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";
import request from "../../api/request";
import {logDOM} from "@testing-library/react";

export default function Home() {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userIsAdmin, setUserIsAdmin] = useState('')
    const authorized = mainStore.authorized
    const title = authorized ? `Welcome to BookShelf, ${userName}` : 'Home'

    useEffect(() => {
        if (authorized) {
            request('/api/me', 'GET', null, true)
                .then(r => {
                    const data = r?.text?.data
                    setUserName(data.attributes.name)
                    setUserId(data.id)
                    setUserEmail(data.attributes.email)
                    setUserIsAdmin(data.attributes.is_admin)
                })
        }
    }, [])

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageContainer">{title}</h2>
            {authorized && <div className="">
                <p>{`User Id: ${userId}`}</p>
                <p>{`Is admin: ${!!userIsAdmin}`}</p>
                <p>{`Email: ${userEmail}`}</p>
            </div>}
        </div>

    );
}
