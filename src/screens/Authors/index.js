import React, {useEffect} from "react";
import Header from "../../components/Header";
import ListPage from "../../components/ListPage";
import request from "../../api/request";
import authorsStore from "../../store/authorsStore";

export default function Authors() {

    async function getAuthors() {
        const res = await request('/api/authors', 'GET', null, true)
        if (res.status < 300)
            authorsStore.setAuthors(res.text)
        return res.text;
    }

    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Authors'}
                      getElements={getAuthors}
            />
        </div>
    )
}
