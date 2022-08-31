import React, {useMemo, useState} from "react";
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
import EditBookForm from "./screens/Books/components/EditBookForm";
import EditAuthorsForm from "./screens/Authors/components/EditAuthorsForm";
import AuthorBookList from "./screens/Authors/components/AuthorBookList";

export default function App() {

    useMemo(() => {
        const name = localStorage.getItem('userName')
        const is_admin = localStorage.getItem('is_admin')
        mainStore.setAuthorized(!!name)
        if (name)
            mainStore.setUserData({name: name, is_admin: JSON.parse(is_admin)})
    }, [])

    return (
        <Router>
            <Logger/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/authors" element={<Authors/>}/>
                <Route path="/admin/books" element={<EditBookForm/>}/>
                <Route path="/admin/authors" element={<EditAuthorsForm/>}/>
                <Route path="/author" element={<AuthorBookList/>}/>
            </Routes>
        </Router>
    );
}
