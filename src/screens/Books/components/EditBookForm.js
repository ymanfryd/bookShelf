import {Formik} from "formik";
import React from "react";
import request from "../../../api/request";

export default function EditBookForm({book, setEditBookPressed, books, refreshCurrentPage}) {
    const isNew = !book.id.length

    async function submit(values, {setSubmitting}) {
            if (isNew) {
                const res = await request('/api/admin/books', 'POST', values, true)
                if (res.status < 300) {
                    values.id = res.text.data.id
                    setEditBookPressed(undefined)
                    setSubmitting(false)
                    refreshCurrentPage()
                }
            } else {
                const {id, ...body} = values
                const res = await request(`/api/admin/books/${book.id}`, 'PUT', body, true)
                if (res.status < 300) {
                    setEditBookPressed(undefined)
                    setSubmitting(false)
                    refreshCurrentPage()
                }
            }


    }

    return (
        <Formik
            initialValues={{id: book.id, name: book.name, author_id: book.author_id, year: book.year,}}
            onSubmit={submit}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
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
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="year"
                        placeholder='year'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                    />
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="author_id"
                        placeholder='author id'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.author_id}
                    />
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        Save
                    </button>
                </form>
            )}
        </Formik>
    )

}
