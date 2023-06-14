import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import NavComp from '../Components/NavComp'
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper";
import spin from '../Assets/spin.png'
import scratch from '../Assets/scratch.png'
import card from '../Assets/card.png'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Games = () => {

    const [load,setLoad] = React.useState(true)  
    const navigate = useNavigate()
    setTimeout(() => {
        setLoad(false)
    },5000)
  return (
    <>
        {load?<Loader/>:
        <>
        <div className='d-flex' style={{width:"100vw",height:"100vh",backgroundColor:"#020338"}}>
        <NavComp />
        <div className='d-flex flex-column align-items-center justify-content-center mt-5 w-100' style={{width:"100vw"}}>
            <p className='text-center mb-5' style={{fontFamily:"QuickSand",fontSize:"4rem",color:'white'}}>Games Available</p>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: -30, 
                    depth: 150,
                    modifier: 3,
                    slideShadows: false,
                }}  
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper w-100" 
                >   
                <div className='d-flex flex-row flex-wrap justify-content-center align-items-center' >
                    <div>  
                    <SwiperSlide onClick={() => navigate('/games/casino')} className='rounded rounded-5' style={{width:'350px',height:'500px',gap:40}} >
                    <img style={{borderRadius:15,width:"380px",height:"350px"}} alt='Card' src={spin} />
                    <br></br>
                    <div className=' p-3 rounded-5' style={{background:'rgba(255,255,255.3)'}}>
                    <h5 className='text-dark text-center h4' style={{fontFamily:"QuickSand"}}>Casino</h5>
                    </div>
                </SwiperSlide>
                <SwiperSlide onClick={() => navigate('/games/riddle')} className='rounded rounded-5' style={{width:'350px',height:'500px',gap:40}} >
                    <img style={{borderRadius:15,width:"380px",height:"350px"}} alt='Card' src={card} />
                    <br></br>
                    <div className=' p-3 rounded-5' style={{background:'rgba(255,255,255.3)'}}>
                    <h5 className='text-dark text-center h4' style={{fontFamily:"QuickSand"}}>Card Riddle</h5>
                    </div>
                </SwiperSlide>
                </div>  
            </div>  
            </Swiper>
        </div> 
        </div>
        </>}
    </>
  )
}

export default Games







