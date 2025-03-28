import { useEffect, useState } from "react";
import { CAT, CATEGORIES } from "../../APIs/API";
import { Axios } from "../../comonants/axios/Axios";
import Table from "./table";
import { Link, useNavigate } from "react-router-dom";
import PaginatedItems from "../../comonants/pagenation/pagenate";
import { LoadingBage } from "../Loadingpage.js"
import { MDBBtn, MDBIcon, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
export default function Categories() {
  // loading
  const [loading, setLoading] = useState(false);
  const [total, settotal] = useState();
  // use navegate
  const nav = useNavigate();
  // data of categouries
  const [categories, setCategouries] = useState([]);
  const [nouser, setnouser] = useState(false);
  // limits and page state
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  // get categories
  useEffect(() => {
    setLoading(true)
    Axios.get(`${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategouries(data.data.data)
        settotal(data.data.total)

        if (categories.length === 0) {
          setnouser(true)
        }

      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [limit, page])
  const header = [
    { name: "Title", key: "title" },
    { name: "Image", key: "image" },
    { name: "Craeted", key: "created_at" },
    { name: "Updated", key: "updated_at" },
  ]
  //  handle delete 
  async function handleDelete(id) {

    try {
      const res = await Axios.delete(`${CAT}/${id}`)
        .then(setCategouries((prev) =>
          prev.filter((item) =>
            item.id !== id
          )
        ))


    } catch (err) {
      console.log(err)
    }
  }
  // lemit


  return (
    <div id='divoftable' style={{ overflow: 'auto', height: 'calc(100vh - 90px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '10px' }}>
        <h1 style={{ color: '#d22034 ' }}>Categories Page </h1>
        <div className="btn btn-primary fas fa-circle-plus p-3 m-2" style={{ fontSize: '10px', alignContent: 'center', letterSpacing: '2px' }} onClick={() => nav("/dashboard/addcategories")}><Link style={{ color: 'white' }}> Add Categories</Link></div>
      </div>
    

      {categories.length === 0 ? (!nouser ? <h1 style={{ width: '70vh' }}>Loading...</h1> : <h1 style={{ width: '100%' }}>There are no categories yet.</h1>) :
        <Table searchLink={CAT} total={total} loading={loading} setpage={setPage} setlimit={setLimit} limit={limit} header={header} data={categories} delete={handleDelete} id={"categories"} />
      }

    </div>

  )
}