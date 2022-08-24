import Header from "../../components/Header";
import React from "react";
import "./style/index.css"
import {useNavigate} from "react-router-dom";
import mainStore from "../../store/mainStore";
import request from "../../api/request";

function signOut(navigate) {
    mainStore.setAuthorized(false)
    mainStore.removeUserData()
    localStorage.removeItem('userName')
    localStorage.removeItem('isAdmin')
    request('/api/logout', 'POST', null, true)
    navigate('/')
}

export default function LogOut () {
    const navigate = useNavigate()
    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">Sign Out</h2>
            <div className="signOutContainer">
                Please confirm signing out
                <button className='btn' onClick={() => signOut(navigate)}>Confirm</button>
            </div>
        </div>
    )
}
