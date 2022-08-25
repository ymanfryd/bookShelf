import {Formik} from "formik";
import React from "react";
import authorsStore from "../../../store/authorsStore";
import request from "../../../api/request";

export default function EditAuthorsForm({author, setEditElementPressed, setAuthor}) {

    return (
        <Formik
            initialValues={{name: author.name, year: author.year}}
            onSubmit={(values, {setSubmitting}) => {
                const res = request('/api/admin/authors', 'POST', values, true)
                if (res.data) {
                    setAuthor(prev => {
                        const newAuthors = [values, ...prev]
                        authorsStore.setAuthors(newAuthors)
                        return newAuthors
                    })
                    setEditElementPressed(undefined)
                }
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  handleBlur,
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
                    <button type="submit" className="btn">
                        Save
                    </button>
                </form>
            )}
        </Formik>
    )

}
