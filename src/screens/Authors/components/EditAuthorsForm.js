import {Formik} from "formik";
import React from "react";
import request from "../../../api/request";

export default function EditAuthorsForm({author, setEditElementPressed, refreshCurrentPage}) {
const isNew = !author.id.length
    return (
        <Formik
            initialValues={{name: author.name, year: author.year}}
            onSubmit={async (values, {setSubmitting}) => {
                const res = isNew ?
                    await request('/api/admin/authors', 'POST', values, true) :
                    await request(`/api/admin/authors/${author.id}`, 'PUT', values, true)
                if (res.status < 300) {
                    setEditElementPressed(undefined)
                    setSubmitting(false)
                    refreshCurrentPage()
                }
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
