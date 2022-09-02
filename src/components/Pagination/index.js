import React, {useEffect, useState} from "react";
import "./style/index.css"

export default function Pagination({
                                       handlePageClick,
                                       res,
                                       reqQuery,
                                       setCurrPageUrl = () => {},
                                       currentPage,
                                       setCurrentPage
                                   }) {

    const [prevPageUrl, setPrevPageUrl] = useState('')
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [lastPageUrl, setLastPageUrl] = useState('')
    const [firstPageUrl, setFirstPageUrl] = useState('')
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        if (res?.meta?.pagination) {
            const currPage = parseInt(res.meta.pagination.current_page)
            const totalPages = parseInt(res.meta.pagination.total_pages)
            setPageCount(totalPages)
            setCurrentPage(currPage)
        }
        if (res?.links) {
            setNextPageUrl(res.links.next ? res.links.next + reqQuery : '')
            setPrevPageUrl(res.links.prev ? res.links.prev + reqQuery : '')
            setFirstPageUrl(res.links.first ? res.links.first + reqQuery : '')
            setLastPageUrl(res.links.last ? res.links.last + reqQuery : '')
            setCurrPageUrl(res.links.self ? res.links.self + reqQuery : '')
        }
    }, [res])

    return (

        <div className='pagination'>
            <div className="paginationBtnContainer left">
                {firstPageUrl &&
                <button className='paginationBtn'
                        onClick={() => handlePageClick(firstPageUrl)}>first</button>}
                {prevPageUrl &&
                <button className='paginationBtn'
                        onClick={() => handlePageClick(prevPageUrl)}>prev</button>}
            </div>

            {!!currentPage && <div className='paginationBtn current'
                                   onClick={() => {
                                   }}>{currentPage}</div>}
            <div className="paginationBtnContainer">
                {nextPageUrl &&
                <button className='paginationBtn'
                        onClick={() => handlePageClick(nextPageUrl)}>next</button>}
                {lastPageUrl &&
                <button className='paginationBtn'
                        onClick={() => handlePageClick(lastPageUrl)}>last ({pageCount})</button>}
            </div>

        </div>
    )
}
