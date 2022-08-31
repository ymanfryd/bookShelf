import {Formik} from "formik";
import React from "react";
import request from "../../../api/request";
import {useNavigate} from "react-router-dom";
import authorsStore from "../../../store/authorsStore";
import Header from "../../../components/Header";

export default function EditAuthorsForm() {
    const isNew = authorsStore.createAuthorPressed
    const author = authorsStore.authorToEdit
    const navigate = useNavigate()

    return (
        <div>
            <Header/>
            <Formik
                initialValues={isNew ? {name: '', year: ''} : {name: author.name, year: author.year}}
                onSubmit={async (values, {setSubmitting}) => {
                    const res = isNew ?
                        await request('/api/admin/authors', 'POST', values, true) :
                        await request(`/api/admin/authors/${author.id}`, 'PUT', values, true)
                    if (res.status < 300) {
                        authorsStore.unsetAuthorToEdit()
                        authorsStore.setCreateAuthorPressed(false)
                        setSubmitting(false)
                        navigate('/authors')
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
        </div>
    )
}
