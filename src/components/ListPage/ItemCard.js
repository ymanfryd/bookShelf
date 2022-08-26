import request from "../../api/request";
import React from "react";

export default function ItemCard({
                                     item,
                                     isBooks,
                                     is_admin,
                                     deleteList,
                                     setDeleteList,
                                     setAuthorPressed,
                                     deleteManyPressed,
                                     refreshCurrentPage,
                                     setEditElementPressed,
                                 }) {
    const isInDeleteList = deleteList.includes(item)

    async function removeElement(el) {
        const res = await request(`/api/admin/${isBooks ? 'books' : 'authors'}/${el.id}`, 'DELETE', null, true)
        if (res.status < 300) {
            refreshCurrentPage()
        }
    }

    function editItem(item) {
        setEditElementPressed(item)
    }

    function addToDeleteList(item) {
        if (isInDeleteList)
            setDeleteList(prev => prev.filter(it => it !== item))
        else
            setDeleteList(prev => [item, ...prev])
    }

    function containerClickHandler(e) {
        if (!isBooks && e.target.tagName !== "BUTTON")
            setAuthorPressed(item)
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
