import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,

}
    from 'mdb-react-ui-kit';

import { Axios } from '../../comonants/axios/Axios';
import { USER } from '../../APIs/API';
import { useNavigate } from 'react-router-dom';
import Alert from '../../comonants/alert massege/alert';
 
 

export default function AddUser() {
    const nav = useNavigate();
    const [user, setuser] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('');
    const [load, setload] = useState(false);
    const [disaple, setdisaple] = useState(true);
    const [checkemail, setcheckemail] = useState(false);
    const [seccessfully, setseccessfully] = useState(false);

    // function submet
    useEffect(() => {
        setseccessfully(false);
        if (user != '' && email != '' && password.length >= 8 && role != '') {
            setdisaple(false);
        } else {
            setdisaple(true);
        }
    }, [email, password, role, user])
    async function handleSubmet(e) {
        e.preventDefault();
        setload(true);
        try {
            let res = await Axios.post(`${USER}/add`, {
                name: user,
                email: email,
                password: password,
                role: role
            })
            setload(false)
            setseccessfully(true);
        } catch (err) {
            if (err.status === 422) {
                setcheckemail(true);
            }
            console.log(err);
            setload(false)
        }
        // function seccessfully



    }
    return (
        <form onSubmit={handleSubmet}>
            
               {seccessfully?<Alert/>:''}  
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ width: '100%' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5" style={{ color: '#fed000' }}>Add User</h2>
                        <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' onChange={(e) => { setuser(e.target.value) }} value={user} id='form1' required type='text' />
                        {user == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input User</p> : ''}
                        <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' onChange={(e) => { setemail(e.target.value); setcheckemail(false) }} required value={email} id='form2' type='email' />
                        {email == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input Email</p> : ''}

                        <MDBInput wrapperClass='mb-4' label='Your Password' size='lg' onChange={(e) => { setpassword(e.target.value) }} required value={password} id='form2' type='password' />
                        {password.length < 8 ? <p style={{ color: 'red', marginTop: '-10px' }}>Password Must Be Larger Than 8</p> : ''}

                        <div style={{ width: '100%' }}>
                            <div>
                                <lable for="role">Role</lable>
                            </div>
                            <select value={role} id="role" onChange={(e) => {
                                setrole(e.target.value)
                            }} style={{
                                border: '2px bointed ',
                                width: '200px',
                                height: '40px',
                                margin: '10px 0',
                                boxShadow: ' 0 0 2px 2px blue',
                                borderRadius: '5px'
                            }}>
                                <option value='' disabled>selected the role</option>
                                <option value="1995">Admin</option>
                                <option value="2001">User</option>
                                <option value="1996">Writer</option>
                                <option value="1999">Product Manger</option>

                            </select>
                        </div>

                        {role === '' ? <p style={{ color: 'red', marginTop: '5px' }}>Please Select The Role</p> : ''}

                        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
                            {load ? <span className="spinner-grow text-light" role="status"></span> : <h6 style={{ marginTop: '5px', letterSpacing: '2px' }}>SAVE</h6>}

                        </MDBBtn>
                        {checkemail ? <h6 className='fas fa-triangle-exclamation' style={{ marginTop: '5px', fontSize: '15px', color: 'red', letterSpacing: '1px' }}> This Email Is Already Have Been Used</h6> : ''}
                    </MDBCardBody>
                
                   
                     
                     
                </MDBCard>
            </MDBContainer>
            
        </form>
    )
}