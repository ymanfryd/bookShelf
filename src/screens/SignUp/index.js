import React from "react";
import Header from '../../components/Header'
import {Formik, Field} from "formik";
import mainStore from "../../store/mainStore";
import {useNavigate} from "react-router-dom";

export function validate(values, isSignUp) {
    const errors = {}
    if (!values.email)
        errors.email = 'Required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = 'Invalid email address'
    if (!values.password)
        errors.password = 'Required'
    if (isSignUp) {
        if (!values.name)
            errors.name = 'Required'
        if (values.password !== values.password2)
            errors.password = 'Passwords do not match'
    }
    return errors
}

function submit({values, setSubmitting, navigate}) {
    const {password2, ...json} = values;
    mainStore.setCurrentLog(JSON.stringify(json, null, 2))
    setSubmitting(false)
    mainStore.setAuthorized(true)
    mainStore.setUserData({name: values.name, isAdmin: values.is_admin})
    localStorage.setItem('userName', values.name)
    localStorage.setItem('isAdmin', values.is_admin)
    navigate('/')
}

export default function SignUp() {
    const navigate = useNavigate();

    function SignUpForm() {
        return (
            <Formik
                initialValues={{name: '', email: '', password: '', password2: '', is_admin: false}}
                validate={values => validate(values, true)}
                onSubmit={(values, {setSubmitting}) => submit({values, setSubmitting, navigate})}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit} className='form'>
                        <input
                            className='formInput'
                            type="name"
                            name="name"
                            placeholder='Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name && errors.name}
                        <input
                            className='formInput'
                            type="email"
                            name="email"
                            placeholder='E-mail'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            className='formInput'
                            type="password"
                            name="password"
                            placeholder='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <input
                            className='formInput'
                            type="password"
                            name="password2"
                            placeholder='repeat password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password2}
                        />
                        {errors.password2 && touched.password2 && errors.password2}
                        <label>
                            <Field type="checkbox" name="is_admin" />
                            Is Admin
                        </label>
                        <button type="submit" className="btn" disabled={isSubmitting}>
                            Sign Up
                        </button>
                    </form>
                )}
            </Formik>
        );
    }

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">Sign Up</h2>
            <SignUpForm/>
        </div>
    )
}
