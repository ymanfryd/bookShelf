import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import './style/index.css'
import ListPage from "../../components/ListPage";
import request from "../../api/request";
import booksStore from "../../store/booksStore";

export default function Books() {
    async function getBooks () {
        const res = await request('/api/books', 'GET', null, true)
        if (res.status < 300)
            booksStore.setBooks(res.text)
        return res.text
    }

    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Books'}
                      getElements={getBooks}
            />
        </div>
    )
}
