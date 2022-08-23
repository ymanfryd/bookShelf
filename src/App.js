import React, {useMemo} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Books from "./screens/Books";
import Authors from "./screens/Authors"
import Logger from "./components/Logger";
import LogOut from "./screens/LogOut";
import mainStore from "./store/mainStore";

export default function App() {
    useMemo(() => {
        const name = localStorage.getItem('userName')
        const isAdmin = localStorage.getItem('isAdmin')
        mainStore.setAuthorized(!!name)
        if (name)
            mainStore.setUserData({name: name, isAdmin: JSON.parse(isAdmin)})
    }, [])

    return (
        <Router>
            <Logger/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sign_in" element={<SignIn/>}/>
                <Route path="/sign_up" element={<SignUp/>}/>
                <Route path="/log_out" element={<LogOut/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/authors" element={<Authors/>}/>
            </Routes>
        </Router>
    );
}
