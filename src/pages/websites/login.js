import React, { useEffect, useRef, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login, main_api, register } from '../../APIs/API';
import Cookie from 'cookie-universal'

export default function LogIn() {
  // cookies
  const cookie = Cookie()
  // set nav
  const nav = useNavigate()
  // loading 
  const [loading, setLoading] = useState(false);

  // set form data
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })
  // function handle change inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setemailerr('')
  }
  //  on submet 
  const [CheckSub, setCheckSub] = useState(false)
  const [checklogin, setchecklogin] = useState(false)
  const [emailerr, setemailerr] = useState()
  async function handleSubmit(e) {
    e.preventDefault()
    setCheckSub(true)
    if (form.email != '' && form.password != '') {
      setLoading(true)
      try {
        let res = await axios.post(`${main_api}${login}`, form);

        if (res.status === 200) {
          setchecklogin(true)
          setLoading(false)

          const token = res.data.token;
          const role = res.data.user.role;
          // console.log(role)
          // console.log(res)
          cookie.set('e-commerce', token)
          let go =
            role == "1995" ?
              "/dashboard/users" :
              role == "1996" ?
                "/dashboard/writer" :
                role == "1999" ?
                  "categories" :
                  "/";

          window.location.pathname = go;
        }
      } catch (err) {

        setemailerr(err.response.status)
        setLoading(false)
      }
    }
  }

  // use ref to focuse
  const focus = useRef();
  useEffect(()=>{
    focus.current.focus()
  },[])
  return (
    <form onSubmit={handleSubmit}  >
      <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: 'hidden' }}>
        <div style={{ width: '85vw', maxHeight: '85vh', boxShadow: '0 0 10px 1px rgba(86, 82, 82, 0.37)', borderRadius: '30px', overflowY: 'hidden', backgroundColor: 'white', paddingt: '100px' }}>
          <MDBContainer fluid>
            <MDBRow>

              <MDBCol md='6' >

                <div className='d-flex flex-row ps-5 pt-5'>
                  <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
                  <span className="h1 fw-bold mb-0">Slash</span>
                </div>

                <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                  <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px', fontSize: '25px' }}>Log in</h3>

                  <MDBInput ref={focus} wrapperClass='mb-4 mx-5 w-100' onChange={handleChange} name='email' type='email' value={form.email} label='Email address' id='formControlLg' size="lg" />

                  {(form.email === '' && CheckSub) && <div><p className='ms-5' style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Email Is Requred</p></div>}

                  <MDBInput wrapperClass='mb-4 mx-5 w-100' onChange={handleChange} name='password' value={form.password} label='Password' id='formControlLg' type='password' size="lg" />

                  {(form.password === '' && CheckSub) && <div><p className='ms-5' style={{ color: 'red', fontSize: '13px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The Password Is Requred</p></div>}

                  <MDBBtn style={{ alignContent: 'center', maxHeight: '50px', minWidth: '120px' }} className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>
                    {loading ?
                      <div className="spinner-grow text-light  spinner-grow-md" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div> : <p>Log In</p>}
                  </MDBBtn>
                  {emailerr === 401 && <div><p className='ms-5' style={{ color: 'red', fontSize: '16px', margin: '0', marginTop: '-20px', marginBottom: '10px' }}>The email or password is not correct</p></div>}
                  <a className='btn btn-primary mb-4 px-5 mx-5 w-100' style={{ fontSize: '15px' }} href={"https://back-end-e-commerce-production-2a6c.up.railway.app/login-google"}><i class="fab fa-google me-2"></i> Sign in with google</a>


                  {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p> */}
                  <p className='ms-5'>Don't have an account? <a href="#!" className="link-info"><Link to='/register'>Register here</Link></a></p>


                  <div className='d-flex flex-row justify-content-start ms-5' style={{ marginTop: '10px' }}>
                    <a href="#!" className="small text-muted me-1 ">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>


                  </div>

                  <div><br></br></div>
                </div>


              </MDBCol>

              <MDBCol md='6' className='d-none d-md-block px-0'>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                  alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
              </MDBCol>

            </MDBRow>

          </MDBContainer>
        </div>
      </div>
    </form>
  )
}