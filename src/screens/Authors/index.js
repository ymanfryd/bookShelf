import React from "react";
import Header from "../../components/Header";
import ListPage from "../../components/ListPage";

export default function Authors() {

    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Authors'}/>
        </div>
    )
}
