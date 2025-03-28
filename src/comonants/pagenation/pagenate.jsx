import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import "./pagenation.css"
// Example items, to simulate fetching from another resources.




export default function PaginatedItems( props){
// { itemsPerPage ,data })
const pageCount = props.pageCount;

  return (
    <>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e)=>props.setpage(e.selected+1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagenation"
        pageLinkClassName="pagination-tag-anchor" 
        previousLinkClassName="previousClassName"
        nextLinkClassName={"nextClassName"}
        activeLinkClassName='activeLinkClassName'
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
