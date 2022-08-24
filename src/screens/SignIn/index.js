import React from "react";
import Header from '../../components/Header'
import {Formik} from 'formik';
import './style/index.css'
import {validate} from "../SignUp";
import {useNavigate} from "react-router-dom";
import mainStore from "../../store/mainStore";
import request from "../../api/request";

function submit({values, setSubmitting, navigate}) {
    mainStore.setCurrentLog(JSON.stringify(values, null, 2))
    setSubmitting(false)
    mainStore.setAuthorized(true)
    request('/api/login', 'POST', values, false)
    mainStore.setUserData({name: 'name', isAdmin: 'is_admin'}) //TODO replace userData
    localStorage.setItem('userName', "name")
    localStorage.setItem('isAdmin', "true")
    navigate('/')
}

export default function SignIn() {
    const navigate = useNavigate()
    function SignInForm() {
        return (
            <Formik
                initialValues={{email: '', password: ''}}
                validate={values => validate(values, false)}
                onSubmit={(values, {setSubmitting}) => submit({values, setSubmitting, navigate})}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit} className='form'>
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
                        <button type="submit" className="btn" disabled={isSubmitting}>
                            Sign In
                        </button>
                    </form>
                )}
            </Formik>
        );
    }

    return (
        <div className='pageContainer'>
            <Header/>
            <h2 className="pageTitle">Sign In</h2>
            <SignInForm/>
        </div>
    )
}
