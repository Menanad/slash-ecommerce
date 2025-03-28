import { useEffect, useState } from "react";
import { Axios } from "../../comonants/axios/Axios";
import Table from "./table";
import { Link, useNavigate } from "react-router-dom";
import { Productapi, Productsapi } from "../../APIs/API";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3)
  // use navegate
  const nav = useNavigate();
  // data of categouries
  const [products, setproducts] = useState([]);
  const [nouser, setnouser] = useState(false);
  const [total, settotal] = useState();
  // get categories
  useEffect(() => {
    setLoading(true)
    const res = Axios.get(`${Productsapi}?limit=${limit}&page=${page}`)
      .then((data) => {
        setproducts(data.data.data)
        settotal(data.data.total)
        if (products.length === 0) {
          setnouser(true)
        }
      })

      .catch((err) => console.log(err))
      .finally(()=>setLoading(false))
  }, [ limit,page])
  const header = [
    { name: "images", key: "images" },
    { name: "Title", key: "title" },
    { name: "Description", key: "description" },
    { name: "Price", key: "price" },
    { name: "Rating", key: "rating" },
    { name: "Stock", key: "stock" },
    { name: "Created", key: "created_at" },
    { name: "Updated", key: "updated_at" },

    
  ]
  //  handle delete 
  async function handleDelete(id) {

    try {
      const res = await Axios.delete(`${Productapi}/${id}`)
        .then(setproducts((prev) =>
          prev.filter((item) =>
            item.id !== id
          )
        ))



    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div id='divoftable' style={{ overflow: 'auto', height: 'calc(100vh - 90px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '10px' }}>
        <h1 style={{ color: '#d22034 ' }}>Products Page </h1>
        <div className="btn btn-primary fas fa-circle-plus p-3 m-2" style={{ fontSize: '10px', alignContent: 'center', letterSpacing: '2px' }} onClick={() => nav("/dashboard/addproducts")}><Link style={{ color: 'white' }}> Add Products</Link></div>
      </div>
      {/* {products.length === 0 ? (!nouser ? <h1 style={{ width: '70vh' }}>Loading...</h1> : <h1 style={{ width: '100%' }}>There are no products yet.</h1>) :
        <Table header={header} data={products} delete={handleDelete}  id={"products"}/>
      } */}
      <Table searchLink={Productapi} total={total} loading={loading} setpage={setPage} setlimit={setLimit} limit={limit} header={header} data={products} delete={handleDelete} id={"products"} />
    </div>
  )
} 