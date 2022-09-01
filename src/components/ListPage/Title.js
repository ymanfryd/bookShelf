import React from "react";
import booksStore from "../../store/booksStore";
import {useNavigate} from "react-router-dom";
import authorsStore from "../../store/authorsStore";

export default function Title({
                                  title,
                                  isBooks,
                                  is_admin,
                                  deleteMany,
                                  authorPressed,
                                  deleteManyPressed,
                                  editElementPressed
                              }) {
    const navigate = useNavigate()

    function createNew() {
        if (isBooks) {
            booksStore.setCreateBookPressed(true)
            navigate('/admin/books')
        } else {
            authorsStore.setCreateAuthorPressed(true)
            navigate('/admin/authors')
        }
    }

    return (
        <div className="pageTitle">
            {is_admin && <button className='btn'
                                 onClick={createNew}>
                create new
            </button>}
            <h2>{title}</h2>
            {isBooks ? is_admin &&
                <button className='btn'
                        disabled={editElementPressed}
                        onClick={deleteMany}>
                    {deleteManyPressed ? 'confirm' : 'delete many'}
                </button> : is_admin &&  <div style={{width: '180px'}}/>}

        </div>
    );
}
