import React from "react";
import {Link} from "react-router-dom";
import "./index.css"
import mainStore from "../../store/mainStore";
import {observer} from "mobx-react-lite";

const Header = observer(() =>
        <header className={'Header'}>
            <div className="headerGroup rightAlign">
                <Link to="/books" className="headerLink">Books</Link>
                <Link to="/authors" className="headerLink">Authors</Link>
            </div>
            <Link to="/" className="title">BookShelf</Link>
            {mainStore.authorized ?
                <div className="headerGroup leftAlign">
                    <Link to="/" className="headerLink">Logout</Link>
                </div>
                :
                <div className="headerGroup leftAlign">
                    <Link to="/sign_in" className="headerLink">Sign In</Link>
                    <Link to="/sign_up" className="headerLink signUp">Sign Up</Link>
                </div>}
        </header>
)

export default Header
