import React from "react";
import "./style/index.css"

export default function Pagination({
                                       handlePageClick,
                                       firstPageUrl,
                                       prevPageUrl,
                                       currentPage,
                                       nextPageUrl,
                                       lastPageUrl,
                                       pageCount
                                   }) {
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
