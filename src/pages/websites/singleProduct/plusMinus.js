import { MDBIcon, MDBInput } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import { Axios } from "../../../comonants/axios/Axios"
import { CART } from "../../../APIs/API"
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
export default function PlusMunis(props) {


    const getitem = JSON.parse(localStorage.getItem("product")) || []
    const productExist = getitem.findIndex((pro) => pro.id == props.id)
    let countget
    if (productExist != -1) {
        countget = getitem[productExist].count

    } else {
        countget = 1
    }
    const [count, setCount] = useState(countget)
    useEffect(() => {
        props.setCount(count)

        if (productExist != -1) {

            const checkStock = async () => {
                try {
                    props.setStockLoading(true)
                    await Axios.post(`${CART}/check`, {
                        product_id: props.id,
                        count: count,
                    })
                        .then(() => {
                            getitem[productExist].count = count
                            localStorage.setItem("product", JSON.stringify(getitem))
                        })
               

                    console.log("done stock")
                    return true
                } catch (err) {
                    getitem[productExist].count = getitem[productExist].stock
                    localStorage.setItem("product", JSON.stringify(getitem))
                    setCount(getitem[productExist].stock)
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
                    })
                        console.log(err)


                    return false
                    } finally {
                        props.setStockLoading(false)
                    }
                }
                checkStock()

            }
        }, [count])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px', margin: '5px', justifyContent: 'space-around' }}>
                <div onClick={() => { count > 1 && setCount(count - 1) }} className={count <= 1 && "text-muted"} style={{ cursor: 'pointer', padding: '5px' }}    ><MDBIcon fas icon="minus" /></div>
                <div style={{ padding: '5px' }}>
                    <MDBInput min={"1"} style={{ minWidth: '50px', maxWidth: '100px', textAlign: 'center' }} value={count} onChange={(e) => { (Number(e.target.value >= 1)) ? setCount(Number(e.target.value)) : setCount(1) }} id="typeNumber" type="number" />
                </div>
                <div onClick={() => setCount(count + 1)} style={{ cursor: 'pointer', padding: '5px' }}><MDBIcon fas icon="plus" /></div>
            </div>

        </div>
    )

}