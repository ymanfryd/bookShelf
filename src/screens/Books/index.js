import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import mainStore from "../../store/mainStore";
import booksStore from "../../store/booksStore";
import getBooks from "../../api/getBooks";
import './style/index.css'
import ReactPaginate from 'react-paginate';
import EditBookForm from "./components/EditBookForm";

export default function Books() {
    const [books, setBooks] = useState([])
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [offset, setCurrentOffset] = useState(0)
    const [editBookPressed, setEditBookPressed] = useState(undefined)
    const itemsPerPage = 12

    function setItems(res) {
        setBooks(res)
        setCurrentItems(res.slice(0, itemsPerPage))
        setPageCount(Math.ceil(res.length / itemsPerPage))
    }

    useEffect(() => {
        if (!booksStore.books.length)
            getBooks().then(setItems)
        else
            setItems(booksStore.books)
    }, [])

    function BookCard({book}) {
        const isAdmin = mainStore.user.isAdmin

        function removeBook(book) {
            const filtered = books.filter(item => item !== book)
            booksStore.setBooks(filtered)
            setBooks(filtered)
            setCurrentItems(filtered.slice(offset, offset + itemsPerPage))
            setPageCount(Math.ceil(filtered.length / itemsPerPage))
        }

        function editBook(book) {
            setEditBookPressed(book)
        }

        return (
            <div className='bookCardContainer'>
                <div className="bookName">{book.name}</div>
                <div>Year: {book.year}</div>
                <div>Author: {book.author_id}</div>
                {isAdmin && <div className="btnContainer">
                    <button className='btn' onClick={() => removeBook(book)}>remove</button>
                    <button className='btn' onClick={() => editBook(book)}>edit</button>
                </div>}
            </div>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        setCurrentOffset(newOffset)
        setCurrentItems(books.slice(newOffset, newOffset + itemsPerPage))
    };

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">Books</h2>
            {editBookPressed ?
                <EditBookForm setEditBookPressed={setEditBookPressed} book={editBookPressed}/> :
                <>
                    <div className="bookListContainer">
                        {currentItems?.map((book, index) =>
                            <BookCard book={book} key={index}/>
                        )}
                    </div>
                    <ReactPaginate
                        containerClassName='pagination'
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </>
            }
        </div>
    )
}
