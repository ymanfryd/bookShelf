import React, {useEffect, useState} from "react";
import request from "../../../api/request";
import Header from "../../../components/Header";
import authorsStore from "../../../store/authorsStore";
import {useNavigate} from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function AuthorBookList() {
    const [books, setBooks] = useState([])
    const [authorData, setAuthorData] = useState('')
    const [reqRes, setReqRes] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [reqQuery, setReqQuery] = useState('')
    const [currPageUrl, setCurrPageUrl] = useState('')
    const author = authorsStore.authorPressed
    const navigate = useNavigate()

    useEffect(() => {
        setAuthorData(`Name: ${author.name}, id: ${author.id}, book count: ${author.books_count}, year: ${author.year}`)
        request(`/api/books?author_id=${author.id}`, 'GET', null, true)
            .then(res => {
                if (res.status < 300) {
                    setBooks(res.text.data)
                    setReqRes(res.text)
                }
            })
    }, [])


    const handlePageClick = async (url) => {
        const host = process.env.REACT_APP_HOST
        const endpoint = url.replace(host, '')
        const res = await request(endpoint, 'GET', null, true)
        if (res.status < 300)
            setReqRes(res.text)
    }

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
                <Pagination setCurrPageUrl={setCurrPageUrl}
                            reqQuery={reqQuery}
                            res={reqRes}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            handlePageClick={handlePageClick}/>
            </div>
        </div>
    )
}
