import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,

}
    from 'mdb-react-ui-kit';
import { MDBFile } from 'mdb-react-ui-kit';
import { Axios } from '../../comonants/axios/Axios';
import { CAT } from '../../APIs/API';
import { useNavigate } from 'react-router-dom';
import Alert from '../../comonants/alert massege/alert';



export default function AddCategouries() {
    const nav = useNavigate();

    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [load, setload] = useState(false);
    const [disaple, setdisaple] = useState(true);
    const [seccessfully, setseccessfully] = useState(false);

    // function submet
    useEffect(() => {
        setseccessfully(false);
        if (title != '' && image != '') {
            setdisaple(false);
        } else {
            setdisaple(true);
        }
    }, [title, image])
    async function handleSubmet(e) {
        // get form
        const form  = new FormData();
        form.append("title", title);
        form.append("image", image);
        e.preventDefault();
        setload(true);
        try {
            let res = await Axios.post(`${CAT}/add`, form)
            setload(false)
            setseccessfully(true);
        } catch (err) {
            // if (err.status === 422) {
            // }
            console.log(err);
            setload(false)
        }
        // function seccessfully



    }
    return (
        <form onSubmit={handleSubmet}>

            {seccessfully ? <Alert /> : ''}
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ width: '100%' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5" style={{ color: '#fed000' }}>ADD CATEGORIES</h2>
                        <MDBInput wrapperClass='mb-4' label='Title' size='lg' onChange={(e) => { settitle(e.target.value) }} value={title} id='form1' required type='text' />
                        {title == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Title</p> : ''}
                        <div style={{margin:'20px 0'}}>
                            <MDBFile label='please upload the image : ' onChange={(e) => setimage(e.target.files.item(0))} id='customFile' />
                        </div>
                        {image == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Upload The Image</p> : ''}

                        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
                        {load ? <span className="spinner-grow text-light" role="status"></span> : <h6 style={{ marginTop: '5px', letterSpacing: '2px' }}>SAVE</h6>}

                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>

        </form>
    )
}
