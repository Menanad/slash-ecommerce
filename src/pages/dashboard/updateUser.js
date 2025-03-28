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
import { replace, useNavigate } from 'react-router-dom';

export default function UpdateUser(){
  const nav = useNavigate();
    const [user, setuser] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState('');
    const [load , setload] = useState(false);
    const [disaple , setdisaple] = useState(true);
    //get id 
    const id = window.location.pathname.split("/").slice(-1)[0];
     
    useEffect(()=>{
      setload(true);
      Axios.get(`${USER}/${id}`)
      .then((data)=>{
        setuser(data.data.name);
        setemail(data.data.email);
        setrole(data.data.role);
        setload(false); 
      })
      .then(()=>setdisaple(false))
      .catch((err)=>nav('/dashboard/Error404',{replace:true}))
    },[])
    // function submet
    async function handleSubmet(e){
        e.preventDefault();
        setload(true);
        try{
         let res =await Axios.post(`${USER}/edit/${id}`,{
            name: user,
            email:email,
            role:role
          })
          setload(false)
          nav('/dashboard/users');
            
        }catch(err){
           console.log(err);  
           setload(false)           
        }

    }
    
 return(
    <form onSubmit={handleSubmet}>
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
    <div className='mask gradient-custom-3'></div>
    <MDBCard className='m-5' style={{width: '100%'}}>
      <MDBCardBody className='px-5'>
        <h2 className="text-uppercase text-center mb-5">Update User</h2>
        <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' onChange={(e)=>{setuser(e.target.value)}} value={user} id='form1' required type='text'/>
          {user ==''? <p style={{color:'red'  ,marginTop:'-10px'}}>Please Input User</p>:''}
        <MDBInput wrapperClass='mb-4' label='Your Email' size='lg'  onChange={(e)=>{setemail(e.target.value)}} required value={email} id='form2' type='email'/>
        {email ==''? <p style={{color:'red' ,marginTop:'-10px'}}>Please Input Email</p>:''}

          <div style={{width:'100%'}}>
           <div>
           <lable for="role">Role</lable>
           </div>
            <select value={role} id="role" onChange={(e)=>{
              setrole(e.target.value)
            }} style={{
              border:'2px bointed ',
               width:'200px',
               height:'40px',
               margin:'10px 0',
               boxShadow: ' 0 0 2px 2px blue',
               borderRadius:'5px'
               }}>
              <option value='' disabled>selected the role</option>
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="1996">Writer</option>

            </select>
          </div>

        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
       { load?<span className="spinner-grow text-light" role="status"></span> :<h6 style={{marginTop:'5px' ,letterSpacing:'2px'}}>SAVE</h6>}
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  </form>
    )
}