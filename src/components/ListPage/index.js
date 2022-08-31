import React, {useEffect, useState} from "react";
import mainStore from "../../store/mainStore";
import request from "../../api/request";
import Pagination from "../Pagination"
import "./style/index.css"
import Title from "./Title";
import ItemCard from "./ItemCard";
import {useLocation} from "react-router-dom";
import Filters from "../Filters";

export default function ListPage({
                                     title
                                 }) {
    const [queryParams, setQueryParams] = useState('')
    const [reqQuery, setReqQuery] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [deleteList, setDeleteList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    let [currPageUrl, setCurrPageUrl] = useState('')
    const [prevPageUrl, setPrevPageUrl] = useState('')
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [lastPageUrl, setLastPageUrl] = useState('')
    const [firstPageUrl, setFirstPageUrl] = useState('')
    const [lastEndpoint, setLastEndpoint] = useState('')
    const [currentItems, setCurrentItems] = useState(null)
    const [authorPressed, setAuthorPressed] = useState(undefined)
    const [deleteManyPressed, setDeleteManyPressed] = useState(false)
    const [editElementPressed, setEditElementPressed] = useState(undefined)
    const is_admin = !!mainStore.user.is_admin
    const isBooks = title === 'Books'

    function useQuery() {
        const {search} = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    const query = useQuery()

    function setItems(res) {
        const items = []
        if (res?.data)
            res.data?.map(it => items.push({id: it.id, ...it.attributes}))
        if (res?.meta?.pagination) {
            const currPage = parseInt(res.meta.pagination.current_page)
            const totalPages = parseInt(res.meta.pagination.total_pages)
            const perPage = parseInt(res.meta.pagination.per_page)
            const queryParams = `?page=${currPage}`
            setPageCount(totalPages)
            setCurrentItems(items)
            setCurrentPage(currPage)
            setQueryParams(queryParams)
        }
        if (res?.links) {
            setNextPageUrl(res.links.next + reqQuery)
            setPrevPageUrl(res.links.prev + reqQuery)
            setFirstPageUrl(res.links.first + reqQuery)
            setLastPageUrl(res.links.last + reqQuery)
            setCurrPageUrl(res.links.self + reqQuery)
        }
    }

    useEffect(() => {
        if (isBooks && reqQuery.length)
            request(`/api/books?page=${currentPage}${reqQuery}`, 'GET', null, true).then(r => setItems(r.text))
        else if (reqQuery.length)
            request(`/api/authors?page=${currentPage}${reqQuery}`, 'GET', null, true).then(r => setItems(r.text))
    }, [reqQuery])

    useEffect(() => {
        const url = window.location.origin + window.location.pathname + queryParams
        window.history.pushState({path: url}, '', url)
    }, [queryParams])

    window.onpopstate = function () {
        const page = query.get('page')
        if (page) {
            setDeleteManyPressed(false)
            setEditElementPressed(false)
            currPageUrl = currPageUrl.slice(0, currPageUrl.indexOf('page=')) + `?page=${page}`
            refreshCurrentPage(false)
        }
    }

    function refreshCurrentPage(refresh) {
        handlePageClick(currPageUrl, refresh).then(setItems)
    }


    const handlePageClick = async (url, refresh) => {
        const host = process.env.REACT_APP_HOST
        const endpoint = url.replace(host, '')
        if (refresh || endpoint !== lastEndpoint) {
            const res = await request(endpoint, 'GET', null, true)
            setItems(res?.text)
            setLastEndpoint(endpoint)
        }
    }

    async function deleteMany() {
        if (deleteManyPressed) {
            if (!deleteList.length) {
                setDeleteManyPressed(!deleteManyPressed)
                return
            }
            const res = await request('/api/admin/books/delete-many', 'POST', {ids: deleteList}, true)
            if (res.status < 300) {
                await refreshCurrentPage(true)
                setDeleteManyPressed(!deleteManyPressed)
            }
        } else
            setDeleteManyPressed(!deleteManyPressed)
    }

    return (
        <>
            <Title title={title}
                   isBooks={isBooks}
                   is_admin={is_admin}
                   deleteMany={deleteMany}
                   authorPressed={authorPressed}
                   deleteManyPressed={deleteManyPressed}
                   editElementPressed={editElementPressed}
            />
            <div className='listPageContainer'>

                <Filters isBooks={isBooks}
                         setQuery={setReqQuery}
                         currentPage={currentPage}/>
                <div className="ListContainer">
                    {currentItems?.map((item, index) =>
                        <ItemCard item={item}
                                  key={index}
                                  isBooks={isBooks}
                                  is_admin={is_admin}
                                  deleteList={deleteList}
                                  setDeleteList={setDeleteList}
                                  deleteManyPressed={deleteManyPressed}
                                  refreshCurrentPage={refreshCurrentPage}
                        />
                    )}
                </div>
            </div>

            <Pagination currentPage={currentPage}
                        nextPageUrl={nextPageUrl}
                        prevPageUrl={prevPageUrl}
                        lastPageUrl={lastPageUrl}
                        firstPageUrl={firstPageUrl}
                        pageCount={pageCount}
                        handlePageClick={handlePageClick}/>


        </>
    )
}
