import React, {useEffect, useState} from "react";
import request from "../../../api/request";

export default function AuthorBookList({author, setTitle}) {
    const [books, setBooks] = useState([])
    const [authorData, setAuthorData] = useState('')

    useEffect(() => {
        setTitle(author.name)
        setAuthorData(`id: ${author.id}, book count: ${author.books_count}, year: ${author.year}`)
        request(`/api/authors/${author.id}`, 'GET', null, true)
            .then(res => {
                setBooks(res.text.included)
            })
    }, [])


    return (
        <>
            <div>{authorData}</div>
            <div className='ListContainer'>
                {books?.map(book =>
                    <div className='CardContainer' key={book.id}>
                        <div className="Name">{book.attributes.name}</div>
                        <div>Year: {book.attributes.year}</div>
                        <div>id: {book.id}</div>
                    </div>
                )}
            </div>
        </>
    )
}
