import React, { useEffect, useRef, useState } from 'react';
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
import { CAT, CATEGORIES, Productapi, Productsapi } from '../../APIs/API';
import { useNavigate } from 'react-router-dom';
import Alert from '../../comonants/alert massege/alert';



export default function AddProducts() {


    const [form, setform] = useState({
        category: "0",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        stock:""
    });
    const dummyForm = {
        category: null,
        title: "xc",
        description: "fsg",
        price: 222,
        discount: 0,
        About: "About",
        stock:'0'
    }

    const [images, setimages] = useState([]);
    const [load, setload] = useState(false);
    const [disaple, setdisaple] = useState(true);
    const [disaple2, setdisaple2] = useState(true);
    const [seccessfully, setseccessfully] = useState(false);
    const [id, setid] = useState();
    const progres = useRef([]);
    const nav = useNavigate();
    // open image use ref



    // -----------------------test
    const ids  = useRef([]);
    const openImage = useRef(null);
    const j = useRef(-1)
    //  function handle images
    async function handleimages(e) {
        setimages((prev) => [...prev, ...e.target.files])
        const imagesasfiles = e.target.files;
        const data1 = new FormData();

        for (let index = 0; index < imagesasfiles.length; index++) {
            j.current++;
            data1.append("image", imagesasfiles[index]);
            data1.append("product_id", id);
            try {
                const res = await Axios.post("/product-img/add", data1, {
                    onUploadProgress: (ProgressEvent) => {
                        const { loaded, total } = ProgressEvent
                        const percent = Math.floor((loaded * 100) / total)
                        progres.current[j.current].setAttribute('percent', `${percent}%`)
                        if (percent % 10 === 0) {
                            progres.current[j.current].style.width = `${percent}%`

                        }

                    },
                });
                ids.current[j.current] = res.data.id;
            } catch (err) { console.log(err) }
        } 
    }
    // function submet
    useEffect(() => {
        setseccessfully(false);
        if (form.title != '' || images.length == 0 || form.price == "" || form.About == "") {
            setdisaple(false);
        } else {
            setdisaple(true);
        }
    }, [form.title, images])
    async function handleSubmet(e) {
        e.preventDefault();
        setload(true);
        try {
            let res = await Axios.post(`${Productapi}/edit/${id}`, form)
            setload(false)
            setseccessfully(true);
            nav('/dashboard/products')
        } catch (err) {
            console.log(err);
            setload(false)
        }
    }
    // handle submet form
    async function handleSubmetForm() {
        try {
            const res = await Axios.post(`${Productapi}/add`, dummyForm)
            setid(res.data.id)
        } catch (err) {
            console.log(err)
        }
    }
    // set ctegoury
    const [categories, setCategouries] = useState([]);
    const [nouser, setnouser] = useState(false);
    // get categories
    useEffect(() => {
        Axios.get(`${CATEGORIES}`)
            .then((data) => {
                setCategouries(data.data)
                if (categories.length === 0) {
                    setnouser(true)
                }
            })

            .catch((err) => console.log(err))
    }, [])
    // map for categories
    const showcat = categories.map((item, index) => {
        return (
            <option key={index} value={item.id} >{item.title}</option>
        )
    })
    // handle delete img
    async function handleDelete(img, index){
        const id1 = ids.current[index];
        setimages((prev)=>prev.filter((image) => image !== img));
        ids.current = ids.current.filter((i)=> i !==id1) ;
        j.current--;
        try{
            const res = await Axios.delete(`product-img/${id1}`);
            
       
        }catch(err){
            console.log(err);
        }
    }
   
    // map for images
    const showimages = images.map((img, index) => {
        return (
            <div key={index} style={{ display: 'flex', margin: '10px', alignItems: 'center', flexDirection: 'column', width: '100%', border: 'solid 1px gray' }}>
                <div style={{ display: 'flex', margin: '10px',justifyContent:'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', margin: '10px', alignItems: 'center' }}>
                        <img src={URL.createObjectURL(img)} style={{ width: '100px' }} ></img>
                        <div >
                            <p style={{ margin: '10px' }}>{img.name}</p>
                            <p style={{ margin: '10px' }}> {img.size / (1024 * 1024) > 1 ? (img.size / (1024 * 1024)).toFixed(2) + " MB" : (img.size / (1024)).toFixed(2) + " KB"}</p>
                        </div>
                    </div>
                    <div onClick={()=>{handleDelete(img, index)}} style={{marginRight:'60px',backgroundColor:' #2cefef' ,borderRadius:'5px' ,padding:'10px'}}>
                        <i  style={{color:'red' ,fontSize:'20px'}} className="far fa-trash-can"></i>
                    </div>

                </div>
                <div style={{ width: '100%' }}>
                    <div className='custom-progres'>
                        <span ref={(e) => { progres.current[index] = e }} className='inner-progresss'></span>
                    </div>

                </div>
            </div>
        )
    })


    // onchange
    function onchange(e) {
        setform({ ...form, [e.target.name]: e.target.value });
        setdisaple2(false);
        if (disaple2 !== false) {
            handleSubmetForm();
        }
    }
    return (
        <form onSubmit={handleSubmet} style={{ overflowY: 'scroll', height: "90vh" }}>
            {seccessfully ? <Alert /> : ''}
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ width: '100%' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5" style={{ color: '#fed000' }}>ADD PRODUCT</h2>
                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <div>
                                <lable for="cat">Categoury</lable>
                            </div>
                            <select value={form.category} name='category' id="cat" onChange={(e) => { onchange(e); form.category != "" && setdisaple2(false); }} style={{
                                border: '2px bointed yellow',
                                width: '100%',
                                height: '40px',
                                margin: '10px 0',
                                borderRadius: '5px'
                            }}>
                                <option disabled value="0" >select categoury</option>
                                {showcat}

                            </select>
                        </div>

                        <MDBInput disabled={disaple2} wrapperClass='mb-4' name='title' label='Title' size='lg' onChange={onchange} value={form.title} id='form1' required type='text' />
                        {form.title == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Title</p> : ''}
                        <MDBInput disabled={disaple2} wrapperClass='mb-4' name='description' label='description' size='lg' onChange={onchange} value={form.description} id='form1' required type='text' />
                        {form.description == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Write Description</p> : ''}

                        <MDBInput disabled={disaple2} name='price' wrapperClass='mb-4' label='Price After Discount' size='lg' onChange={onchange} value={form.price} id='form1' required type='number' />
                        {form.price == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Price</p> : ''}
                        <MDBInput disabled={disaple2} name='discount' wrapperClass='mb-4' label='Price Before Discount ' size='lg' onChange={onchange} value={form.discount} id='form1' required type='number' />

                        <MDBInput disabled={disaple2} name='stock' wrapperClass='mb-4' label='Stock' size='lg' onChange={onchange} value={form.stock} id='form1' required type='number' />
                        {form.stock == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The stock</p> : ''}



                        <MDBInput disabled={disaple2} name='About' wrapperClass='mb-4' label='About' size='lg' onChange={onchange} value={form.About} id='form1' required type='text' />
                        {form.About == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Write About The Product</p> : ''}
                        <MDBFile ref={openImage} style={{ margin: '20px 0' }} label='please upload the image : ' hidden multiple onChange={handleimages} id='customFile' />
                        <div disabled={disaple2} onClick={() => { openImage.current.click(); }} style={{ display: 'flex', border: disaple2 ? "2px dashed gray" : "2px dashed blue", justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column', height: '250px', margin: '10px', padding: '10px 0', cursor: 'pointer' }}>
                            <img src={require('./6323.jpg')} alt='Upload Here' style={{ maxWidth: '80%', height: '200px', cursor: 'pointer', filter: disaple2 && 'grayscale(1)' }}></img>
                            <p style={{ marginTop: '-10px', color: disaple2 ? 'gray' : 'blue', cursor: 'pointer' }}>Upload Images</p>
                        </div>

                        {/* {images.length==0 ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Upload The Image<code>(s)</code></p> : ''} */}
                        <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                            {showimages}
                        </div>

                        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
                            {load ? <span className="spinner-grow text-light" role="status"></span> : <h6 style={{ marginTop: '5px', letterSpacing: '2px' }}>ADD</h6>}
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </form>
    )
}