// imports
import React, { useEffect, useState } from 'react';
import { MDBTable, MDBBtn, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import { Axios } from '../../comonants/axios/Axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import PaginatedItems from '../../comonants/pagenation/pagenate';
import LoadingBage from '../Loadingpage';

import { MDBInputGroup, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import TransformDate from '../helpers/convertDate';


export default function Table(props) {


  // handleSearch
  const [search, setsearch] = useState("")
  const [filter, setfilter] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchDate, setSearchDate] = useState("")


  const filterDataByDate = props.data.filter((item)=>TransformDate(item.created_at)===searchDate)
 


  // handle pagination

  function handlesearch() {
    setSearchLoading(true)
    setLoading(true)
    Axios.post(`${props.searchLink}/search?title=${search}`)
      .then((data) => {
        console.log(data.data)
        setfilter(data.data)
      })
      .catch((err) => console.log(err))
      .finally(() => { setLoading(true); setSearchLoading(false) })
  }
  const [debouncedata, setdebounceData] = useState("");

  useEffect(() => {

    const debounce = setTimeout(() => { search.length > 0 && handlesearch(debouncedata) }, 800)
    return () => clearTimeout(debounce)
  }, [debouncedata])

  let total
  let pageCount
  if (search.length > 0) {
    total = filter.length
    pageCount = 1
  } else {
    total = props.total
    pageCount = total / props.limit;
  }
  const [page, setpage] = useState(1)
  props.setpage(page);


  //  const start = (page-1)*props.limit;
  //  const end = start + props.limit;
  //  const final = props.data.slice(start,end);
  //  console.log(final)


  // get current user
  const currentuser = props.currentuser || false;
  //show header 
  const headerShow = props.header.map((item) => {
    return (
      <th scope='col'>{item.name}</th>
    )
  })

 
  //  show data

  let showdatafinally = search.length > 0 ? 
  filter :searchDate.length>0 ?filterDataByDate :props.data;
 
   if (search.length>0 && searchDate.length>0){
    showdatafinally = filter.filter((item)=>TransformDate(item.created_at)===searchDate)
    total = showdatafinally.length
    pageCount = 1
   }
 
  const dataShow = showdatafinally.map((item, key) => {
    return (
      <tr key={key}>
        <td>{item.id}</td>
        {props.header.map((item2, index) => {
          return (
            <td key={key}>{
              item[item2.key] === "1995"
                ? "Admin" :
                item[item2.key] === "2001"
                  ? "User" :
                  item[item2.key] === "1996"
                    ? "Writer" :
                    item[item2.key] === "1999"
                      ? "Product Manger" :

                      item2.key === "images" ?
                        item[item2.key].map(image =>
                          <img style={{ maxWidth: '500px', maxHeight: '75px', border: '2px solid blue', padding: '3px', margin: '5px' }} src={"https://back-end-e-commerce-production-85fa.up.railway.app/"+image.image} alt="image" />
                        ) :
                        item[item2.key] === currentuser.name
                          ? item[item2.key] + " (you)" :
                          item2.key == "image" ?
                            <img src={ "https://back-end-e-commerce-production-85fa.up.railway.app/"+item[item2.key]} alt="image" style={{ maxHeight: '70px', maxWidth: '100px' }} /> :
                            item2.key === "updated_at" || item2.key === "created_at" ? TransformDate(item[item2.key]) :
                              item[item2.key]
            }</td>
          )
        })}
        <td>
          <MDBBtn disabled={item.id === currentuser.id ? "true" : ""} onClick={() => { props.delete(item.id) }} color='link' size='sm'>
            <i className='fas fa-times fa-2x'></i>
          </MDBBtn>
        </td>
        <td>
          <Link to={`/dashboard/${props.id}/${item.id}`}>
            <MDBBtn color='link' size='sm'>
              <i className="far fa-address-card fa-2x"></i>
            </MDBBtn>
          </Link>
        </td>
      </tr>
    )
  })

  // return data
  return (
    <>
      <div style={{ width: '95%', margin: '10px 0', }}>
        <MDBInputGroup>
          <MDBInput onChange={(e) => { setsearch(e.target.value); setdebounceData((prev) => !prev) }} label='Search' />
          <MDBBtn rippleColor='dark'>
            <MDBIcon icon='search' />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      <div style={{ width: '100%', display:'flex',justifyContent: 'center' }}>
         <input type="date"  onChange={(e)=>setSearchDate(e.target.value)} style={{width:'40%',marginBottom:'10px'}} /> 
      </div>
      <MDBTable>


        <MDBTableHead light className='headoftable'>
          <tr>
            <th scope='col'>ID</th>
            {headerShow}
            <th scope='col'>Delete</th>
            <th scope='col'>Update</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody style={{ backgroundColor: 'rgb(170, 220, 220)' }} >
          {props.loading || searchLoading ? <h1>Loading...</h1> : dataShow}
          {showdatafinally.length == 0 && !searchLoading && <h1 style={{ width: '100%' }}>there is no results</h1>}


        </MDBTableBody>
      </MDBTable>

      <div style={{ display: 'flex ', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <select style={{ width: '100px', height: '35px', borderRadius: '5px' }} onChange={(e) => props.setlimit(Number(e.target.value))}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <PaginatedItems setpage={setpage} pageCount={pageCount} />

      </div>

    </>
  )
}