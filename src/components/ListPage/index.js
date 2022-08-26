import EditBookForm from "../../screens/Books/components/EditBookForm";
import React, {useEffect, useState} from "react";
import mainStore from "../../store/mainStore";
import EditAuthorsForm from "../../screens/Authors/components/EditAuthorsForm";
import request from "../../api/request";
import Pagination from "../Pagination"
import "./style/index.css"
import AuthorBookList from "../../screens/Authors/components/AuthorBookList";
import Title from "./Title";
import ItemCard from "./ItemCard";


export default function ListPage({
                                     title,
                                     getElements
                                 }) {
    const [elements, setElements] = useState([])
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [deleteList, setDeleteList] = useState([])
    const [authorPressed, setAuthorPressed] = useState(undefined)
    const [editElementPressed, setEditElementPressed] = useState(undefined)
    const [deleteManyPressed, setDeleteManyPressed] = useState(false)
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [prevPageUrl, setPrevPageUrl] = useState('')
    const [firstPageUrl, setFirstPageUrl] = useState('')
    const [lastPageUrl, setLastPageUrl] = useState('')
    const [currentPageUrl, setCurrentPageUrl] = useState('')
    const [dynamicTitle, setTitle] = useState(title)
    const is_admin = !!mainStore.user.is_admin
    const isBooks = title === 'Books'

    function EditForm() {
        return isBooks ?
            (<EditBookForm setEditBookPressed={setEditElementPressed}
                           book={editElementPressed}
                           books={elements}
                           refreshCurrentPage={refreshCurrentPage}/>) :
            (<EditAuthorsForm author={editElementPressed}
                              setAuthor={setElements}
                              setEditElementPressed={setEditElementPressed}
                              refreshCurrentPage={refreshCurrentPage}/>)
    }

    function setItems(res) {
        const items = []
        if (res?.data)
            res.data?.map(it => items.push({id: it.id, ...it.attributes}))
        if (res?.meta) {
            setPageCount(parseInt(res.meta.pagination.total_pages))
            setCurrentItems(items)
            setCurrentPage(parseInt(res.meta.pagination.current_page))
        }
        if (res?.links) {
            setNextPageUrl(res.links.next)
            setPrevPageUrl(res.links.prev)
            setFirstPageUrl(res.links.first)
            setLastPageUrl(res.links.last)
            setCurrentPageUrl(res.links.self)
        }
        setElements(items)
    }

    useEffect(() => {
        getElements().then(setItems)
    }, [])

    function refreshCurrentPage() {
        handlePageClick(currentPageUrl).then(setItems)
    }


    const handlePageClick = async (url) => {
        const host = process.env.REACT_APP_HOST
        const endpoint = url.replace(host, '')
        const res = await request(endpoint, 'GET', null, true)
        setItems(res.text)
    };

    async function deleteMany() {
        if (deleteManyPressed) {
            const ids = []
            if (!deleteList.length) {
                setDeleteManyPressed(!deleteManyPressed)
                return
            }
            deleteList.map(it => {
                ids.push(it.id)
            })
            const res = await request('/api/admin/books/delete-many', 'POST', {ids: ids}, true)
            if (res.status < 300) {
                await refreshCurrentPage()
                setDeleteManyPressed(!deleteManyPressed)
            }
        } else
            setDeleteManyPressed(!deleteManyPressed)
    }

    return (
        <>
            <Title title={dynamicTitle}
                   setTitle={setTitle}
                   isBooks={isBooks}
                   is_admin={is_admin}
                   deleteMany={deleteMany}
                   authorPressed={authorPressed}
                   setAuthorPressed={setAuthorPressed}
                   deleteManyPressed={deleteManyPressed}
                   editElementPressed={editElementPressed}
                   setEditElementPressed={setEditElementPressed}
            />
            {editElementPressed ?
                <EditForm/> :
                (authorPressed ?
                    <AuthorBookList author={authorPressed} setTitle={setTitle}/> :
                    <>
                        <div className="ListContainer">
                            {currentItems?.map((item, index) =>
                                <ItemCard item={item}
                                          key={index}
                                          isBooks={isBooks}
                                          is_admin={is_admin}
                                          deleteList={deleteList}
                                          setDeleteList={setDeleteList}
                                          setAuthorPressed={setAuthorPressed}
                                          deleteManyPressed={deleteManyPressed}
                                          refreshCurrentPage={refreshCurrentPage}
                                          setEditElementPressed={setEditElementPressed}
                                />
                            )}
                        </div>
                        <Pagination currentPage={currentPage}
                                    nextPageUrl={nextPageUrl}
                                    prevPageUrl={prevPageUrl}
                                    lastPageUrl={lastPageUrl}
                                    firstPageUrl={firstPageUrl}
                                    pageCount={pageCount}
                                    handlePageClick={handlePageClick}/>
                    </>)
            }
        </>
    )
}
