import React from "react";
import Header from '../../components/Header'
import {Formik} from 'formik';
import './style/index.css'
import {useNavigate} from "react-router-dom";
import mainStore from "../../store/mainStore";
import request from "../../api/request";

async function submit({values, setSubmitting, navigate}) {
    const res = await request('/api/login', 'POST', values, false)
    if (res.status < 300) {
        setSubmitting(false)
        mainStore.setAuthorized(true)
        mainStore.setUserData(res.text.data.attributes)
        localStorage.setItem('userName', res.text.data.attributes.name)
        localStorage.setItem('is_admin', res.text.data.attributes.is_admin)
        localStorage.setItem('token', res.text.data.attributes.token) //TODO
        navigate('/')
    }

}

export default function SignIn() {
    const navigate = useNavigate()
    function SignInForm() {
        return (
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => submit({values, setSubmitting, navigate})}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit} className='form'>
                        <input
                            className='formInput'
                            type="name"
                            name="email"
                            placeholder='E-mail'
                            onChange={handleChange}
                            value={values.email}
                        />
                        <input
                            className='formInput'
                            type="password"
                            name="password"
                            placeholder='password'
                            onChange={handleChange}
                            value={values.password}
                        />
                        <button type="submit" className="btn">
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
