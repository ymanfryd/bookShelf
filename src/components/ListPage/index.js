import EditBookForm from "../../screens/Books/components/EditBookForm";
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import mainStore from "../../store/mainStore";
import booksStore from "../../store/booksStore";
import authorsStore from "../../store/authorsStore";
import EditAuthorsForm from "../../screens/Authors/components/EditAuthorsForm";
import request from "../../api/request";


export default function ListPage({
                                     title,
                                     getElements
                                 }) {
    const [elements, setElements] = useState([])
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [offset, setCurrentOffset] = useState(0)
    const [deleteList, setDeleteList] = useState([])
    const [editElementPressed, setEditElementPressed] = useState(undefined)
    const [deleteManyPressed, setDeleteManyPressed] = useState(false)
    const itemsPerPage = 12
    const is_admin = !!mainStore.user.is_admin
    const isBooks = title === 'Books'

    function EditForm() {
        return isBooks ?
            (<EditBookForm setEditBookPressed={setEditElementPressed}
                           book={editElementPressed}
                           books={elements}/>) :
            (<EditAuthorsForm author={editElementPressed}
                              setAuthor={setElements}
                              setEditElementPressed={setEditElementPressed}/>)
    }

    function setItems(res) {
        if (isBooks) {
            let books = [];
            if (res.data)
                res.data?.map(it => books.push({id: it.id, ...it.attributes}))
            else
                books = res
            setElements(books)
            booksStore.setBooks(res)
            setCurrentItems(books.slice(0, itemsPerPage))
            setPageCount(Math.ceil(books.length / itemsPerPage))
        }
        // isBooks ? booksStore.setBooks(res) : authorsStore.setAuthors(res)

    }

    useEffect(() => {
        const storeElements = isBooks ? booksStore.books : authorsStore.authors
        // if (!storeElements.length)
        getElements().then(setItems)
        // else
        //     setItems(storeElements)
    }, [editElementPressed])

    function BookCard({book}) {
        const isInDeleteList = deleteList.includes(book)

        async function removeBook(book) {
            if (isBooks) {
                const res = await request(`/api/admin/books/${book.id}`, 'DELETE', null, true)
                if (res.status < 300) {
                    const filtered = elements.filter(item => item !== book)
                    isBooks ? booksStore.setBooks(filtered) : authorsStore.setAuthors(filtered)
                    setElements(filtered)
                    setCurrentItems(filtered.slice(offset, offset + itemsPerPage))
                    setPageCount(Math.ceil(filtered.length / itemsPerPage))
                }
            }
        }

        function editBook(book) {
            setEditElementPressed(book)
            // removeBook(book)
        }

        function addToDeleteList(book) {
            if (isInDeleteList)
                setDeleteList(prev => prev.filter(it => it !== book))
            else
                setDeleteList(prev => [book, ...prev])
        }

        return (
            <div className='bookCardContainer' style={isInDeleteList ? {backgroundColor: '#ffa9ab'} : {}}>
                <div className="bookName">{book.name}</div>
                <div>Year: {book.year}</div>
                {isBooks ? <div>Author: {book.author_id}</div> : <div>id: {book.id}</div>}
                {is_admin && !deleteManyPressed && <div className="btnContainer">
                    <button className='btn' onClick={() => removeBook(book)}>remove</button>
                    <button className='btn' onClick={() => editBook(book)}>edit</button>
                </div>}
                {deleteManyPressed && <div className="btnContainer">
                    <button className='btn' onClick={() => addToDeleteList(book)}>choose</button>
                </div>}

            </div>
        );
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % elements.length;
        setCurrentOffset(newOffset)
        setCurrentItems(elements.slice(newOffset, newOffset + itemsPerPage))
    };

    async function deleteMany() {
        if (deleteManyPressed) {
            const ids = []
            deleteList.map(it => {
                ids.push(it.id)
            })
            const res = await request('/api/admin/books/delete-many', 'POST', {ids: ids}, true)
            if (res.status < 300) {
                const newList = []
                elements?.map(i => {
                    if (!deleteList.includes(i))
                        newList.push(i)
                })
                setItems(newList)
            }
        }
        setDeleteManyPressed(!deleteManyPressed)
    }

    return (
        <>
            <div className="pageTitle">
                {is_admin &&
                <button className='btn'
                        disabled={deleteManyPressed}
                        onClick={() =>
                            setEditElementPressed({name: '', year: '', author_id: '', id: ''})}>
                    create new
                </button>}
                <h2>{title}</h2>
                {is_admin &&
                <button className='btn'
                        disabled={editElementPressed}
                        onClick={deleteMany}>
                    delete many
                </button>}


            </div>
            {editElementPressed ?
                <EditForm/> :
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
        </>
    )
}
