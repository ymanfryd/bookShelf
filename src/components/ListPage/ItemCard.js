import request from "../../api/request";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import booksStore from "../../store/booksStore";
import authorsStore from "../../store/authorsStore";

export default function ItemCard({
                                     item,
                                     isBooks,
                                     is_admin,
                                     deleteList,
                                     setDeleteList,
                                     deleteManyPressed,
                                     refreshCurrentPage,
                                 }) {
    const isInDeleteList = deleteList.filter(i => i === item.id).length
    const navigate = useNavigate()

    async function removeElement(el) {
        const res = await request(`/api/admin/${isBooks ? 'books' : 'authors'}/${el.id}`, 'DELETE', null, true)
        if (res.status < 300) {
            refreshCurrentPage(true)
        }
    }

    function editItem(item) {
        if (isBooks) {
            booksStore.setBookToEdit(item)
            navigate('/admin/books')
        } else {
            authorsStore.setAuthorToEdit(item)
            navigate('/admin/authors')
        }

    }

    function addToDeleteList(item) {
        if (isInDeleteList)
            setDeleteList(prev => prev.filter(it => it !== item.id))
        else
            setDeleteList(prev => [item.id, ...prev])
    }

    function containerClickHandler(e) {
        if (!isBooks && e.target.tagName !== "BUTTON") {
            authorsStore.setAuthorPressed(item)
            navigate('/author')
        }
    }

    return (
        <div className='CardContainer' onClick={containerClickHandler}
             style={isInDeleteList ? {backgroundColor: '#ffa9ab'} : {}}>
            <div className="Name">{item.name}</div>
            <div>Year: {item.year}</div>
            {isBooks ? <div>Author id: {item.author_id}</div> : <div>Author id: {item.id}</div>}
            {isBooks ? <div>Book id: {item.id}</div> : <div>Book count: {item.books_count}</div>}
            {is_admin && !deleteManyPressed && <div className="btnContainer">
                <button className='btn' onClick={() => removeElement(item)}>remove</button>
                <button className='btn' onClick={() => editItem(item)}>edit</button>
            </div>}
            {deleteManyPressed && <div className="btnContainer">
                <button className='btn' onClick={() => addToDeleteList(item)}>choose</button>
            </div>}

        </div>
    );
}
