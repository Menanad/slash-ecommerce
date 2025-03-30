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
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../comonants/alert massege/alert';



export default function UpdateProduct() {


    const [form, setform] = useState({
        category: "0",
        title: "",
        description: "",
        price: "",
        discount: "",
        About: "",
        stock:""
    });


    const [images, setimages] = useState([]);
    const [load, setload] = useState(false);
    const [disaple, setdisaple] = useState(true);
    const [disaple2, setdisaple2] = useState(true);
    const [seccessfully, setseccessfully] = useState(false);
    const [idsFromServer, setIdsFromServer] = useState([]);
    const [id, setid] = useState();
    const progres = useRef([]);
    const nav = useNavigate();

    // open image use ref



    // -----------------------test
    const ids = useRef([]);
    const openImage = useRef(null);
    const [imagesFromServer, setImagesFromServer] = useState([]);
    const j = useRef(-1)
    // get id from path
    const idProduct = useParams().id
    const [productshow, setproductshow] = useState();
    // show data
    useEffect(() => {
        const res = Axios.get(`${Productapi}/${idProduct}`)
            .then((data) => {
                setform(data.data[0])
                setImagesFromServer(data.data[0].images);
            })
        console.log(form)
    }, [])
    //  function handle images
    async function handleimages(e) {
        setimages((prev) => [...prev, ...e.target.files])
        const imagesasfiles = e.target.files;
        const data1 = new FormData();

        for (let index = 0; index < imagesasfiles.length; index++) {
            j.current++;
            data1.append("image", imagesasfiles[index]);
            data1.append("product_id", idProduct);
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
        for (let i = 0; i < idsFromServer.length; i++) {
            try {
                await Axios.delete(`product-img/${idsFromServer[i]}`)
            } catch (err) {
                console.log(err);
            }
        }

        try {
            let res = await Axios.post(`${Productapi}/edit/${idProduct}`, form)
            setload(false)
            setseccessfully(true);
            nav('/dashboard/products')
        } catch (err) {
            console.log(err);
            setload(false)
        }
    }

    async function handleSubmetForm() {
        try {
            const res = await Axios.post(`product/${id}`, form)
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
    async function handleDelete(img, index) {
        const id1 = ids.current[index];
        setimages((prev) => prev.filter((image) => image !== img));
        ids.current = ids.current.filter((i) => i !== id1);
        j.current--;
        try {
            const res = await Axios.delete(`product-img/${id1}`);


        } catch (err) {
            console.log(err);
        }
    }
    console.log(idsFromServer);
    // handle delete img from server
    async function handleDeleteImageFromServer(index) {
        setImagesFromServer((prev) => prev.filter((img) => img.id !== index));
        setIdsFromServer((prev) => { return [...prev, index] })


    }

    // map for images
    const showimages = images.map((img, index) => {
        return (
            <div key={index} style={{ display: 'flex', margin: '10px', alignItems: 'center', flexDirection: 'column', width: '100%', border: 'solid 1px gray' }}>
                <div style={{ display: 'flex', margin: '10px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', margin: '10px', alignItems: 'center' }}>
                        <img src={URL.createObjectURL(img)} style={{ width: '100px' }} ></img>
                        <div >
                            <p style={{ margin: '10px' }}>{img.name}</p>
                            <p style={{ margin: '10px' }}> {img.size / (1024 * 1024) > 1 ? (img.size / (1024 * 1024)).toFixed(2) + " MB" : (img.size / (1024)).toFixed(2) + " KB"}</p>
                        </div>
                    </div>
                    <div onClick={() => { handleDelete(img, index) }} style={{ marginRight: '60px', backgroundColor: ' #2cefef', borderRadius: '5px', padding: '10px' }}>
                        <i style={{ color: 'red', fontSize: '20px' }} className="far fa-trash-can"></i>
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

    // --------------------------------------
    // map for images
    const showimages2 = imagesFromServer.map((img, index) => {
        return (
            <div key={index} style={{ display: 'flex', margin: '10px', alignItems: 'center', flexDirection: 'column', width: '100%', border: 'solid 1px gray' }}>
                <div style={{ display: 'flex', margin: '10px', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ display: 'flex', margin: '10px', alignItems: 'center' }}>
                        <img src={"https://back-end-e-commerce-production-85fa.up.railway.app/"+img.image} style={{ width: '100px' }} ></img>

                    </div>
                    <div onClick={() => { handleDeleteImageFromServer(img.id) }} style={{ marginRight: '60px', backgroundColor: ' #2cefef', borderRadius: '5px', padding: '10px' }}>
                        <i style={{ color: 'red', fontSize: '20px' }} className="far fa-trash-can"></i>
                    </div>

                </div>

            </div>
        )
    })

    // --------------------------------------


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
                        <h2 className="text-uppercase text-center mb-5" style={{ color: '#fed000' }}>UPDATE PRODUCT</h2>
                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <div>
                                <lable for="cat">Categoury</lable>
                            </div>
                            <select value={form.category} name='category' id="cat" onChange={(e) => { onchange(e) }} style={{
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

                        <MDBInput wrapperClass='mb-4' name='title' label='Title' size='lg' onChange={onchange} value={form.title} id='form1' required type='text' />
                        {form.title == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Title</p> : ''}
                        <MDBInput wrapperClass='mb-4' name='description' label='description' size='lg' onChange={onchange} value={form.description} id='form1' required type='text' />
                        {form.description == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Write Description</p> : ''}

                        <MDBInput name='price' wrapperClass='mb-4' label='Price After Discount' size='lg' onChange={onchange} value={form.price} id='form1' required type='number' />
                        {form.price == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The Price</p> : ''}
                        <MDBInput name='discount' wrapperClass='mb-4' label='Price Before Discount' size='lg' onChange={onchange} value={form.discount} id='form1' required type='number' />

                        <MDBInput   name='stock' wrapperClass='mb-4' label='Stock' size='lg' onChange={onchange} value={form.stock} id='form1' required type='number' />
                        {form.stock == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Input The stock</p> : ''}


                        <MDBInput name='About' wrapperClass='mb-4' label='About' size='lg' onChange={onchange} value={form.About} id='form1' required type='text' />
                        {form.About == '' ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Write About The Product</p> : ''}
                        <MDBFile ref={openImage} style={{ margin: '20px 0' }} label='please upload the image : ' hidden multiple onChange={handleimages} id='customFile' />
                        <div onClick={() => { openImage.current.click(); }} style={{ display: 'flex', border: "2px dashed blue", justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column', height: '250px', margin: '10px', padding: '10px 0', cursor: 'pointer' }}>
                            <img src={require('./6323.jpg')} alt='Upload Here' style={{ maxWidth: '80%', height: '200px', cursor: 'pointer' }}></img>
                            <p style={{ marginTop: '-10px', color: 'blue', cursor: 'pointer' }}>Upload Images</p>
                        </div>

                        {/* {images.length==0 ? <p style={{ color: 'red', marginTop: '-10px' }}>Please Upload The Image<code>(s)</code></p> : ''} */}
                        <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                            {showimages2}
                            {showimages}
                        </div>

                        <MDBBtn disabled={disaple} className='mb-4 w-100 gradient-custom-4' size='lg'>
                            {load ? <span className="spinner-grow text-light" role="status"></span> : <h6 style={{ marginTop: '5px', letterSpacing: '2px' }}>UPDATE</h6>}
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </form>
    )
}