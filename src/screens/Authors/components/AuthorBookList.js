import React, {useEffect, useState} from "react";
import request from "../../../api/request";
import Header from "../../../components/Header";
import authorsStore from "../../../store/authorsStore";
import {useNavigate} from "react-router-dom";

export default function AuthorBookList() {
    const [books, setBooks] = useState([])
    const [authorData, setAuthorData] = useState('')
    const author = authorsStore.authorPressed
    const navigate = useNavigate()

    useEffect(() => {
        setAuthorData(`Name: ${author.name}, id: ${author.id}, book count: ${author.books_count}, year: ${author.year}`)
        request(`/api/authors/${author.id}`, 'GET', null, true)
            .then(res => {
                setBooks(res.text.included)
            })
    }, [])


    return (
        <div>
            <Header/>

            <div className='pageContainer'>
                <div className="pageTitle">
                    <button className='btn'
                            onClick={() => {
                                authorsStore.setAuthorToEdit(author)
                                navigate('/admin/authors')
                            }}>
                        edit
                    </button>
                    <h2>{author.name}</h2>
                    <button className='btn'
                            onClick={() => {
                                navigate('/authors')
                            }}>
                        go back
                    </button>
                </div>
                <div>{authorData}</div>
            </div>
            <div className='ListContainer'>
                {books?.map(book =>
                    <div className='CardContainer' key={book.id}>
                        <div className="Name">{book.attributes.name}</div>
                        <div>Year: {book.attributes.year}</div>
                        <div>id: {book.id}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
