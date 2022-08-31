import './style/index.css'
import React, {useEffect, useState} from "react";
import {Formik} from "formik";

export default function Filters({isBooks, setQuery}) {
    const [expanded, setExpanded] = useState(false)
    const [sortBy, setSortBy] = useState('id')
    const [reverted, setReverted] = useState(false)
    const [filters, setFilters] = useState({})

    const sortByList = isBooks ?
        ['id', 'name', 'author_id', 'year'] :
        ['id', 'name']

    const filterList = isBooks ?
        {limit: '', name: '', year_from: '', year_to: '', author_id: ''} :
        {limit: '', name: '', year_from: '', year_to: '', books_count_from: '', books_count_to: ''}

    useEffect(() => {
        let str = `&order_by=${sortBy}&order_direct=${reverted ? 'desc' : 'asc'}`
        Object.values(filters).map((i, index) => {
            if(i.length)
                str += `&${Object.keys(filters)[index]}=${i}`
        })
        setQuery(str)
    }, [sortBy, reverted, filters])

    return (
        <div className='filtersContainer'>

            <div className="filterTitle" onClick={() =>
                setExpanded(!expanded)}>
                Sort by: {sortBy}
                <div>{expanded ? '^' : 'v'}</div>
            </div>
            {expanded && sortByList.map(i =>
                <div className='expandedListElement' key={i} onClick={() => {
                    setSortBy(i)
                    setExpanded(false)
                }}>{i}</div>
            )}
            <button className='btn' onClick={() =>
                setReverted(!reverted)}>Revert
            </button>
            <div className="filterTitle">Filters</div>
            <Formik
                initialValues={filterList}
                onSubmit={values => setFilters(values)}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit} className='form'>
                        {Object.keys(filterList).map(i =>
                            <div className='filterItem' key={i}>
                                <div className="label">{i.replace(/_/g, ' ')}:</div>
                                <input type="text"
                                       className='filterInput'
                                       value={Object.values(values)[Object.keys(values).indexOf(i)]}
                                       onChange={handleChange}
                                       name={i}
                                       placeholder={i}/>
                            </div>
                        )}
                        <button className='btn' type='submit'>apply filters</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
