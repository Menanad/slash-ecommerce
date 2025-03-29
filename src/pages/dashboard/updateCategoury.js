// export default function UpdateCategorry()
import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBFile,

}
    from 'mdb-react-ui-kit';  
import { Axios } from '../../comonants/axios/Axios';
import { CAT, USER } from '../../APIs/API';
import { replace, useNavigate } from 'react-router-dom';

export default function UpdateCategorry() {
    const nav = useNavigate();
    const [title, settitle] = useState('');
    const [image, setimage] = useState('');
    const [imageshow, setimageshow] = useState('');
    const [load, setload] = useState(false);
    const [disaple, setdisaple] = useState(true);
    //get id 
    const id = window.location.pathname.split("/").slice(-1)[0];
   

    useEffect(() => {
        setload(true);
        Axios.get(`${CAT}/${id}`)
            .then((data) => {
                
                setimageshow("https://back-end-e-commerce-production-2a6c.up.railway.app/"+data.data.image)
                
                settitle(data.data.title);
                setload(false);
            })
            .then(() => setdisaple(false))
            .catch((err) => nav('/dashboard/Error404', { replace: true }))
    }, [])
    // function submet
    async function handleSubmet(e) {
        e.preventDefault();
        const form  = new FormData();
        form.append("title", title);
        form.append("image", image);
        setload(true);
        try {
             const res = await Axios.post(`${CAT}/edit/${id}`, form)
             if(res.status==200){
                setload(false)
                nav('/dashboard/categories')
             }

        } catch (err) {
            console.log(err);
            setload(false)
        }    

    }
     
    return (
        <form onSubmit={handleSubmet}>
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ width: '100%' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Update Categories</h2>
                        <MDBInput wrapperClass='mb-4' label='The Title' size='lg' onChange={(e) => { settitle(e.target.value) }} value={title} id='form1' required type='text' />
                        {title == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Title</p> : ''}

                        <div style={{ margin: '20px 0' }}>
                            <MDBFile label='please upload the image : ' onChange={(e) =>{ setimage(e.target.files.item(0));setimageshow(URL.createObjectURL(e.target.files.item(0)))}} id='customFile' />
                        </div>
                        <br/>
                        {imageshow == '' ? <h4 style={{ color: 'blue' }}>image is loading...</h4> :
                            <div style={{ border: ' 2px solid blue', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={ imageshow} alt="image" style={{ maxHeight: '70px', maxWidth: '100px' }} />
                            </div>
                        }
                        {imageshow == '' ? <p style={{ color: 'red', marginTop: '10px' }}>Please Upload The Image</p> : ''}
                        

                        <br/>
                        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
                            {load ? <span className="spinner-grow text-light" role="status"></span> : <h6 style={{ marginTop: '5px', letterSpacing: '2px' }}>SAVE</h6>}
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </form>
    )
}
