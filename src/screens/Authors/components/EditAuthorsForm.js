import {Formik} from "formik";
import React from "react";
import authorsStore from "../../../store/authorsStore";

export default function EditAuthorsForm({author, setEditElementPressed, setAuthor}) {
    function validate(values) {
        const errors = {}
        const text = /^[0-9]+$/
        if (!values.name)
            errors.name = 'Name cannot be empty'
        if (!values.year)
            errors.year = 'Year cannot be empty'
        else if (!text.test(values.year))
            errors.year = 'Year must be an integer'
        return errors
    }

    return (
        <Formik
            initialValues={{name: author.name, year: author.year}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
                values.year = parseInt(values.year)
                values.id = parseInt(values.id)
                setAuthor(prev => {
                    const newAuthors = [values, ...prev]
                    authorsStore.setAuthors(newAuthors)
                    return newAuthors
                })
                setEditElementPressed(undefined)
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
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        Save
                    </button>
                </form>
            )}
        </Formik>
    )

}
