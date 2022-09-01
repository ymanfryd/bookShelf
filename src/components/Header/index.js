import React from "react";
import {Link} from "react-router-dom";
import "./style/index.css"
import mainStore from "../../store/mainStore";
import {observer} from "mobx-react-lite";

const Header = observer(() =>
        <header className={'Header'}>
            <div className="headerGroup rightAlign">
                <Link to="/books?page=1&order_by=id&order_direct=asc" className="headerLink">Books</Link>
                <Link to="/authors?page=1&order_by=id&order_direct=asc" className="headerLink">Authors</Link>
            </div>
            <Link to="/" className="title">BookShelf</Link>
            {mainStore.authorized ?
                <div className="headerGroup leftAlign">
                    <Link to="/logout" className="headerLink">Sign Out</Link>
                </div>
                :
                <div className="headerGroup leftAlign">
                    <Link to="/login" className="headerLink">Sign In</Link>
                    <Link to="/register" className="headerLink signUp">Sign Up</Link>
                </div>}
        </header>
)

export default Header
