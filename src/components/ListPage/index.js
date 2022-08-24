import EditBookForm from "../../screens/Books/components/EditBookForm";
import ReactPaginate from "react-paginate";
import React, {useEffect, useState} from "react";
import mainStore from "../../store/mainStore";
import booksStore from "../../store/booksStore";
import authorsStore from "../../store/authorsStore";
import EditAuthorsForm from "../../screens/Authors/components/EditAuthorsForm";


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
    const isAdmin = mainStore.user.isAdmin
    const isBooks = title === 'Books'

    function EditForm() {
        return isBooks ? (
                <EditBookForm setEditBookPressed={setEditElementPressed}
                              book={editElementPressed}
                              setBooks={setElements}
                />) :
            (<EditAuthorsForm author={editElementPressed}
                              setAuthor={setElements}
                              setEditElementPressed={setEditElementPressed}
            />)
    }

    function setItems(res) {
        setElements(res)
        isBooks ? booksStore.setBooks(res) : authorsStore.setAuthors(res)
        setCurrentItems(res.slice(0, itemsPerPage))
        setPageCount(Math.ceil(res.length / itemsPerPage))
    }

    useEffect(() => {
        const storeElements = isBooks ? booksStore.books : authorsStore.authors
        if (!storeElements.length)
            getElements().then(setItems)
        else
            setItems(storeElements)
    }, [editElementPressed])

    function BookCard({book}) {
        const isInDeleteList = deleteList.includes(book)

        function removeBook(book) {
            const filtered = elements.filter(item => item !== book)
            isBooks ? booksStore.setBooks(filtered) : authorsStore.setAuthors(filtered)
            setElements(filtered)
            setCurrentItems(filtered.slice(offset, offset + itemsPerPage))
            setPageCount(Math.ceil(filtered.length / itemsPerPage))
        }

        function editBook(book) {
            removeBook(book)
            setEditElementPressed(book)
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
                {isAdmin && !deleteManyPressed && <div className="btnContainer">
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

    function deleteMany() {
        if (deleteManyPressed) {
            const newList = []
            elements.map(i => {
                if (!deleteList.includes(i))
                    newList.push(i)
            })
            setItems(newList)
        }
        setDeleteManyPressed(!deleteManyPressed)
    }

    return (
        <>
            <h2 className="pageTitle">
                {isAdmin &&
                <button className='btn'
                        disabled={deleteManyPressed}
                        onClick={() =>
                            setEditElementPressed({name: '', year: '', author_id: ''})}>
                    create new
                </button>}
                {title}
                {isAdmin &&
                <button className='btn'
                        disabled={editElementPressed}
                        onClick={deleteMany}>
                    delete many
                </button>}

            </h2>
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
