// imports
import React, { useEffect, useState } from 'react';
import { USER, users } from '../../APIs/API';
import { Axios } from '../../comonants/axios/Axios';
import { Link, useNavigate } from 'react-router-dom';
import Table from './table';
export default function Users() {

  const [user, setUsers] = React.useState([]);
  const [deleted, setdeleted] = useState(true);
  const [currentuser, setcurrentuser] = useState("");
  const [nouser, setnouser] = useState(false);
  const [counter, setcounter] = useState('');

  const [page,setPage]=useState(1)
  const [limit, setlimit] = useState(3)
  const [total, settotal] = useState()
  const [loading, setloading] = useState(false)
//  use navegate
const nav=useNavigate();
  // get current user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((data) =>{ setcurrentuser(data.data)})
  }, [])



  useEffect(() => {
    setloading(true)
    Axios.get(`${users}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data)
        settotal(data.data.total)
        setcounter(data.data.length)
        if (data.data.length <= 1) {
          setnouser(true)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setloading(false))
  }, [deleted, limit,page])

  const header = [

    { name: "User Name", key: "name" },
    { name: "Email", key: "email" },
    { name: "Role", key: "role" },
    { name: "Created", key: "created_at" },
    { name: "Last Log_In", key: "updated_at" },

  ]
  //  handle delete 
  async function handleDelete(id) {
    if (currentuser.id != id) { 
      try {
        const res = await Axios.delete(`${USER}/${id}`)
          .then(setUsers((prev) =>
            prev.filter((item) =>
              item.id != id
            )
          ))
          .then(setcounter((prev) => prev - 1))

      } catch (err) {
        console.log(err)
      }
    }
  }




  return (
    // page of users
    <div id='divoftable' style={{ overflow: 'auto', height: 'calc(100vh - 90px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginBottom: '10px' }}>
        <h1 style={{ color: '#d22034 ' }}>Users Page {counter}</h1>
        <div className="btn btn-primary fas fa-circle-plus p-3 m-2" style={{ fontSize: '10px', alignContent: 'center', letterSpacing: '2px' }} onClick={()=>nav("/dashboard/adduser")}><Link style={{ color: 'white' }}> Add User</Link></div>
      </div>

      {user.length === 0 ? (!nouser ? <h1 style={{ width: '70vh' }}>Loading...</h1> : <h1 style={{ width: '100%' }}>There are no users yet.</h1>) :
        <Table searchLink={USER} loading={loading} total={total} setpage={setPage} limit={limit} setlimit={setlimit} header={header} data={user} delete={handleDelete} currentuser={currentuser} id={"users"} />
      }
    </div> 
  )
}                                                                           