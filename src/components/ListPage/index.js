import React, {useEffect, useState} from "react";
import mainStore from "../../store/mainStore";
import request from "../../api/request";
import Pagination from "../Pagination"
import "./style/index.css"
import Title from "./Title";
import ItemCard from "./ItemCard";
import {useSearchParams} from "react-router-dom";
import Filters from "../Filters";

export default function ListPage({title}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [reqQuery, setReqQuery] = useState('')
    const [reqRes, setReqRes] = useState('')
    const [deleteList, setDeleteList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastEndpoint, setLastEndpoint] = useState('')
    const [currentItems, setCurrentItems] = useState(null)
    const [deleteManyPressed, setDeleteManyPressed] = useState(false)
    const [editElementPressed, setEditElementPressed] = useState(undefined)
    const is_admin = !!mainStore.user.is_admin
    const isBooks = title === 'Books'
    let [currPageUrl, setCurrPageUrl] = useState('')

    function setItems(res) {
        const items = []
        if (res?.data) {
            res.data?.map(it => items.push({id: it.id, ...it.attributes}))
            setCurrentItems(items)
        }
        setReqRes(res)
    }


    useEffect(() => {
        if (reqQuery.length && currentPage) {
            const query = `?page=${currentPage}${reqQuery}`
            const endpoint = isBooks ? '/api/books' : '/api/authors'
            if (lastEndpoint !== endpoint + query) {
                setSearchParams(query)
                setLastEndpoint(endpoint + query)
                request(endpoint + query, 'GET', null, true).then(r => setItems(r.text))
            }
        }
    }, [reqQuery, currentPage])

    window.onpopstate = function () {
        const page = searchParams.get('page')
        if (page) {
            setDeleteManyPressed(false)
            setEditElementPressed(false)
            currPageUrl = currPageUrl.slice(0, currPageUrl.indexOf('page=')) + `page=${page}${reqQuery}`
            refreshCurrentPage(false)
        }
    }

    function refreshCurrentPage(refresh) {
        handlePageClick(currPageUrl, refresh)
    }


    const handlePageClick = async (url, refresh) => {
        const host = process.env.REACT_APP_HOST
        const endpoint = url.replace(host, '')
        if (refresh || endpoint !== lastEndpoint) {
            setLastEndpoint(endpoint)
            setSearchParams(endpoint.substr(endpoint.indexOf('?')))
            const res = await request(endpoint, 'GET', null, true)
            setItems(res?.text)
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

            <Pagination setCurrPageUrl={setCurrPageUrl}
                        reqQuery={reqQuery}
                        res={reqRes}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        handlePageClick={handlePageClick}/>
        </>
    )
}
