import React from "react";
import Header from "../../components/Header";
import './style/index.css'
import ListPage from "../../components/ListPage";

export default function Books() {
    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Books'}/>
        </div>
    )
}
