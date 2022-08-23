import React from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";

export default function Home() {
    const authorized = mainStore.authorized
    const title = authorized ? `Welcome to BookShelf, ${mainStore.user.name}` : 'Home'
    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">{title}</h2>
            {authorized && <p>{`Is admin: ${mainStore.user.isAdmin}`}</p>}
            {/*<div className="homePageContainer">*/}

            {/*</div>*/}
        </div>

    );
}
