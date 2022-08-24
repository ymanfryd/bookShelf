import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import getBooks from "../../api/getBooks";
import './style/index.css'
import ListPage from "../../components/ListPage";

export default function Books() {
    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Books'}
                      getElements={getBooks}
            />
        </div>
    )
}
