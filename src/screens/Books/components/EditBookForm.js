import {Formik} from "formik";
import React from "react";

export default function EditBookForm({book, setEditBookPressed}) {
    function validate(values) {
        const errors = {}
        const text = /^[0-9]+$/
        if (!values.name)
            errors.name = 'Name cannot be empty'
        if (!values.author)
            errors.author = 'Author cannot be empty'
        if (!values.year)
            errors.year = 'Year cannot be empty'
        else if(!text.test(values.year))
            errors.year = 'Year must be an integer'
        return errors
    }
    return (
        <Formik
            initialValues={{name: book.name, year: book.year, author: book.author_id}}
            validate={validate}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(false)
                setEditBookPressed(undefined)
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="name"
                        placeholder='name'
                        onChange={handleChange}
                        value={values.name}
                    />
                    {errors.name}
                    <input
                        className='formInput editBookInput'
                        type="year"
                        name="year"
                        placeholder='year'
                        onChange={handleChange}
                        value={values.year}
                    />
                    {errors.year}
                    <input
                        className='formInput editBookInput'
                        type="name"
                        name="author"
                        placeholder='author'
                        onChange={handleChange}
                        value={values.author}
                    />
                    {errors.author}
                    <button type="submit" className="btn" disabled={isSubmitting}>
                        Save
                    </button>
                </form>
            )}
        </Formik>
    )

}
