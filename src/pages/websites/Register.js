
import React, { useEffect, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { main_api, register } from '../../APIs/API';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'

export default function Register() {
  // cookie
  const cookie = Cookie()
  // loading 
  const [loading, setLoading] = useState(false);

  // set form data
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  // function handle change inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  //  on submet 
  const [CheckSub, setCheckSub] = useState(false)
  const [emailerr, setemailerr] = useState(false)
  const nav = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    setCheckSub(true)

    if (form.confirmPassword === form.password && form.email != '' && form.name != '' && form.password.length >= 8) {
      setLoading(true)
      try {
        let res = await axios.post(`${main_api}${register}`, form
        )

        if (res.status === 200) {
          const token = res.data.token
          cookie.set('e-commerce', token)
          setLoading(false)
          nav('/')
        }


      } catch (err) {
        console.log(err)
        if (err.response.status === 500) {
          setemailerr(500)
          setLoading(false)
        }
        if (err.response.status === 422) {
          setLoading(false)
          setemailerr(true)
        }
      }
    }
  }
// use ref to focus
const focus= useRef();
useEffect(()=>{
   focus.current.focus();
},[])

  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid style={{ height: '100vh', alignContent: 'center' }}>

        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='8' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput ref={focus} label='Your Name' id='form1' onChange={handleChange} name='name' type='text' value={form.name} className='w-100' />
                </div>
                {(form.name === '' && CheckSub) && <div><p style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Name Is Requred</p></div>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' onChange={handleChange} name='email' value={form.email} type='email' />
                </div>
                {(form.email === '' && CheckSub) && <div><p style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Email Is Requred</p></div>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' onChange={handleChange} name='password' value={form.password} type='password' />
                </div>
                {(form.password.length < 8 && CheckSub) && <div><p style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Password Is Less Than 8</p></div>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' onChange={handleChange} name='confirmPassword' id='form4' value={form.confirmPassword} type='password' />
                </div>
                {(form.password !== form.confirmPassword && CheckSub) && <div><p style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Password Repeat Is Not Match The Password</p></div>}

                <MDBBtn style={{ alignContent: 'center', maxHeight: '50px', minWidth: '120px' }} className='mb-4' size='lg'>
                  {loading ?
                    <div class="spinner-grow text-secondary  spinner-grow-md" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div> : <p>Register</p>}
                </MDBBtn>


                {emailerr === 500 && CheckSub && <div><p style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>this email is already been used </p></div>}

                <a className='btn btn-danger mb-4 px-2 ' style={{ fontSize: '15px', width: '70%' }} href='https://back-end-e-commerce-production-85fa.up.railway.app/login-google'><i class="fab fa-google me-2"></i>sign up with Google</a>
                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Do you have an account? <a href="#!" style={{ color: '#393f81' }}><Link to='/login'>Log_In here</Link></a></p>




                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>
              </MDBCol>
              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>

      </MDBContainer>
    </form>
  )
}