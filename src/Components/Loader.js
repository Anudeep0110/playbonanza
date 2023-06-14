import React from 'react'
import {Triangle} from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"100vh",width:"100vw",backgroundColor:"#020338"}}>
        <Triangle
        height="100"
        width="100"
        color="#fff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />
    </div>
  )
}

export default Loader