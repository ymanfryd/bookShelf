import React from "react";

export default function Title({
                                  title,
                                  isBooks,
                                  setTitle,
                                  is_admin,
                                  deleteMany,
                                  authorPressed,
                                  setAuthorPressed,
                                  deleteManyPressed,
                                  editElementPressed,
                                  setEditElementPressed
                              }) {
    return (
        <div className="pageTitle">
            {is_admin && authorPressed ?
            <button className='btn'
                    disabled={deleteManyPressed}
                    onClick={() =>
                        setEditElementPressed(authorPressed)}>
                edit
            </button> :
            is_admin && <button className='btn'
                    onClick={() =>
                        setEditElementPressed({name: '', year: '', author_id: '', id: ''})}>
                create new
            </button>}
            <h2>{title}</h2>
            {isBooks ? is_admin &&
                <button className='btn'
                        disabled={editElementPressed}
                        onClick={deleteMany}>
                    {deleteManyPressed ? 'confirm': 'delete many'}
                </button> : is_admin && !authorPressed && <div style={{width: '180px'}}/>}
            {authorPressed &&
            <button className='btn'
                    onClick={() => {
                        setAuthorPressed(undefined)
                        setEditElementPressed(undefined)
                        setTitle('Authors')
                    }}>
                go back
            </button>}
        </div>
    );
}
