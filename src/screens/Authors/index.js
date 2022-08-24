import React, {useEffect} from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";
import ListPage from "../../components/ListPage";
import getAuthors from "../../api/getAuthors";

export default function Authors() {

    return (
        <div className='pageContainer'>
            <Header/>
            <ListPage title={'Authors'}
                      getElements={getAuthors}
            />
        </div>
    )
}
