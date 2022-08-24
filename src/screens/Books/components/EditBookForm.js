import {Formik} from "formik";
import React from "react";
import booksStore from "../../../store/booksStore";

export default function EditBookForm({book, setEditBookPressed, setBooks}) {
    function validate(values) {
        const errors = {}
        const text = /^[0-9]+$/
        if (!values.name)
            errors.name = 'Name cannot be empty'
        if (!values.author_id)
            errors.author_id = 'Author cannot be empty'
        if (!values.year)
            errors.year = 'Year cannot be empty'
        else if (!text.test(values.year))
            errors.year = 'Year must be an integer'
        return errors
    }

    return (
        <Formik
            initialValues={{name: book.name, author_id: book.author_id, year: book.year}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
                values.year = parseInt(values.year)
                values.author_id = parseInt(values.author_id)
                setBooks(prev => {
                    const newBooks = [values, ...prev]
                    booksStore.setBooks(newBooks)
                    return newBooks
                })
                setEditBookPressed(undefined)
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  touched,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="name"
                        placeholder='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                    <input
                        className='formInput editBookInput'
                        type="number"
                        name="year"
                        placeholder='year'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                    />
                    {errors.year && touched.year && errors.year}
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="author_id"
                        placeholder='author'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.author_id}
                    />
                    {errors.author_id && touched.author_id && errors.author_id}
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        Save
                    </button>
                </form>
            )}
        </Formik>
    )

}