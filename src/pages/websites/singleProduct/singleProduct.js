import { MDBContainer, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router-dom";
import { Axios } from "../../../comonants/axios/Axios";
import { CART, Productapi } from "../../../APIs/API";
import SkeletonComp from "../homePagesComp/component/Skeltoncomp";
import PlusMunis from "./plusMinus";
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
export default function SingleProduct() {

    const [product, setproduct] = useState([])
    const [images, setImages] = useState([])
    const { id } = useParams()
    const [loading, setloading] = useState(true)
    const [check, setcheck] = useState(false)
    const [count, setCount] = useState(1)


    useEffect(() => {
        const getitem1 = JSON.parse(localStorage.getItem("product")) || []
        const productExist1 = getitem1.findIndex((pro) => pro.id == id)

        if (productExist1 != -1) {
            setCount(getitem1[productExist1].count)
            setcheck(true)
        } else {
            setcheck(false)
        }


    }, [count])

    // check stock
    const [stockLoading, setStockLoading] = useState(false)
    const checkStock = async () => {
        try {
            setStockLoading(true)
            await Axios.post(`${CART}/check`, {
                product_id: product.id,
                count: count,
            }).then(() => handleSave())
            toast.success('Added successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,

            });
            return true
        } catch (err) {
            console.log(err)
            toast.error('This quantity is not currently available. The maximum quantity will be added automatically', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,

            });
            return false
        } finally {
            setStockLoading(false)
        }
    }

    useEffect(() => {
        Axios.get(`${Productapi}/${id}`)
            .then((data) => {
                setImages(data.data[0].images
                    .map((img) => {
                        return { original: `https://back-end-e-commerce-production-2a6c.up.railway.app/${img.image}`, thumbnail: `https://back-end-e-commerce-production-2a6c.up.railway.app/${img.image}` }
                    })
                )
                setproduct(data.data[0])
            })
            .catch((err) => console.log(err))
            .finally(() => {

                setloading(false)
            })
    }, [])


    let array = []
    function stars() {
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(product.rating)) {
                array.push(<MDBIcon fas icon="star" />)
            } else {
                array.push(<MDBIcon far icon="star" />)
            }
        }
    }
    stars()
    console.log([product])



    function handleSave() {
        setStockLoading(true)

        const getitem = JSON.parse(localStorage.getItem("product")) || []
        const productExist = getitem.findIndex((pro) => pro.id == id)
        if (productExist != -1) {
            if (getitem[Number(productExist)].count) {

                getitem[Number(productExist)].count = count
            } else {
                getitem[Number(productExist)].count = count
            }
        } else {

            product.count = count


            getitem.push(product)


        }
        localStorage.setItem("product", JSON.stringify(getitem))
        setcheck(true)

    }

    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
            {loading ?
                <MDBContainer style={{ display: 'flex', justifyContent: 'space-around', margin: '10px', flexWrap: 'wrap', padding: '10px' }}>
                    <div className="col-lg-5 col-md-6 col-12">
                        <SkeletonComp width={'100%'} height={'300px'} margin={'10px'} count={1} />
                    </div>
                    <div style={{ color: 'black', padding: '20px' }} className="col-lg-7 col-md-6 col-12">
                        <SkeletonComp count={1} margin={'5px'} width={'50%'} height={'20px'} />
                        <SkeletonComp width={'100%'} count={1} margin={'5px'} height={'20px'} />
                        <SkeletonComp width={'300px'} height={'20px'} count={1} margin={'5px'} />

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <hr style={{ width: '100%' }} />
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <div className="  text-warning">
                                <SkeletonComp width={'50px'} count={1} margin={'5px'} height={'10px'} />
                            </div>
                            <div style={{ cursor: 'pointer', padding: '5px', border: '2px solid #bae8e8', borderRadius: '10px' }}>
                                <SkeletonComp count={1} margin={'5px'} width={'20px'} height={'20px'} />
                            </div>
                        </div>
                        <div className="mb-2 d-flex " >
                            <SkeletonComp count={1} margin={'5px'} width={'100px'} height={'20px'} />
                        </div>
                        <div >
                            <h4 style={{ display: 'inline' }} className="small">
                                <a href="#!" className="text-muted">
                                    <SkeletonComp count={1} margin={'5px'} width={'20px'} height={'20px'} />
                                </a>
                            </h4>
                            <h4 style={{ display: 'inline', fontSize: '15px' }} className=" text-danger">
                                <SkeletonComp count={1} margin={'5px'} width={'50px'} height={'20px'} />
                            </h4>
                        </div>
                    </div>
                </MDBContainer>
                :
                <MDBContainer style={{ display: 'flex', justifyContent: 'space-around', margin: '10px', flexWrap: 'wrap', padding: '10px' }}>
                    <div style={{ maxHeight:'70vh'}} className="col-lg-5 col-md-6 col-12">
                        <ImageGallery items={images} />
                    </div>
                    <div style={{ color: 'black', padding: '20px' }} className="col-lg-7 col-md-6 col-12">
                        <h1 >{product.title}</h1>
                        <h6 className="text-muted">{product.description}</h6>
                        <h5>{product.About}</h5>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <hr style={{ width: '100%' }} />
                        </div>
                        <div style={{ alignItems: 'center', flexWrap: 'wrap' }} className="d-flex justify-content-between mb-2">

                            <div className="  text-warning">
                                <span>Rated: </span> 
                                {array}
                            </div>
                          {product.stock!=0 && <div>
                                <PlusMunis setStockLoading={(data) => setStockLoading(data)} id={id} count={count} setCount={(data) => setCount(data)} />
                            </div>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div className="mb-2 d-flex " >
                                <h3 style={{ textAlign: 'start', width: '100%' }} className="text-dark mb-0"><span className="text-danger small">EGP </span>{product.price}</h3>
                            </div>
                            {product.discount != 0 &&
                                <div >
                                    <h4 style={{ display: 'inline' }} className="small">
                                        <a href="#!" className="text-muted">
                                            Was:
                                        </a>
                                    </h4>
                                    <h4 style={{ display: 'inline', fontSize: '15px' }} className=" text-danger">

                                        <s><s>EGP</s>{product.discount} </s>
                                    </h4>
                                </div>}
                        </div>
                      { product.stock!=0?  <div onClick={checkStock} style={{ cursor: 'pointer', width: '100%', padding: '5px', border: '2px solid #bae8e8', borderRadius: '10px', textAlign: 'center' }}>
                            { stockLoading ?
                                <MDBSpinner color='primary' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </MDBSpinner> :
                                check ?
                                    <MDBIcon className="text-warning" style={{ fontSize: '25px' }} fas icon="check" /> :

                                    <i style={{ fontSize: '25px' }} className="fas fa-cart-plus"></i>
                            }
                        </div> :
                        <div style={{ cursor: 'unset', width: '100%', padding: '5px', border: '2px solid #bae8e8', borderRadius: '10px', textAlign: 'center' }}>
                             <i  style={{ fontSize: '25px' }} className="fas fa-ban text-muted"><span style={{fontSize:'22px'}} className="text-muted"> Is not available now</span></i>
                        </div>
                        }
                    </div>
                </MDBContainer>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Flip}

            />

        </div>
    )
}