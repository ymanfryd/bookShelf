import React from "react";
import Header from '../../components/Header'
import {Formik, Field} from "formik";
import mainStore from "../../store/mainStore";
import {useNavigate} from "react-router-dom";
import request from "../../api/request";

async function submit({values, setSubmitting, navigate}) {
    const {password2, ...json} = values;
    setSubmitting(false)
    const response = await request('/api/register', 'POST', json, false)
    if (response.status < 300) {
        const {name, is_admin, ...loginBody} = json
        const loginResponse = await request('/api/login', 'POST', loginBody, false)
        if (loginResponse.status < 300) {
            mainStore.setAuthorized(true)
            mainStore.setUserData(loginResponse.text.data.attributes)
            localStorage.setItem('userName', values.name)
            localStorage.setItem('is_admin', values.is_admin)
            localStorage.setItem('token', loginResponse.text.data.attributes.token)
            navigate('/')
        }
    }
}

export default function SignUp() {
    const navigate = useNavigate();

    function SignUpForm() {
        return (
            <Formik
                initialValues={{name: '', email: '', password: '', password2: '', is_admin: false}}
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
                            type="name"
                            name="name"
                            placeholder='Name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        <input
                            className='formInput'
                            type="name"
                            name="email"
                            placeholder='E-mail'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <input
                            className='formInput'
                            type="password"
                            name="password"
                            placeholder='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <input
                            className='formInput'
                            type="password"
                            name="password2"
                            placeholder='repeat password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password2}
                        />
                        <label>
                            <Field type="checkbox" name="is_admin"/>
                            Is Admin
                        </label>
                        <button type="submit" className="btn">
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
