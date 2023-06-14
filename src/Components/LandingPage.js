import React from 'react'
import {Parallax , Background} from 'react-parallax'
import { Fade } from 'react-awesome-reveal'
import NavComp from './NavComp'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const LandingPage = () => {
    const navigate = useNavigate()
    const Play = () => {
        if(Cookies.get('processid')){
            navigate('/games')
        }else{
            navigate('/login')
        }
    }
  return (
    <>
        <Parallax strength={500}>
            <Background className='content'>
                <div className='content glassy-background' style={{backgroundColor:"#020838"}}></div>
            </Background>
                <NavComp/>
                <div className='content text-center' style={{fontSize:"30px"}}>
                    <Fade className='circle' cascade direction='left' duration={3000}>
                    <div></div>
                    </Fade>
                    <div className='dashboard-text d-flex flex-column justify-content-center align-items-center' style={{position:"absolute",top:0}}>
                        <Fade cascade damping={.2} duration={3000}>
                        <div className='dashboard-title'>PLAY BONANZA</div>
                        <div className='dashboard-body'>Experience the ultimate gaming Bonanza! Join us for a thrilling adventure filled with exciting games, amazing prizes, and valuable coupons. Earn coins as you play and redeem them for fantastic gifts and rewards. Don't miss out on this epic gaming experience!</div>
                        <button className='text-white border rounded rounded-5 dashboard-button' onClick={Play}>Play</button>
                        </Fade>
                    </div>
                    <Fade className='circle right-corner' cascade direction='up' duration={3000}>
                    <div></div>
                    </Fade>
                </div>
        </Parallax>
        <Parallax strength={500}>
            <Background>
                <div className='content' style={{width:"100vw",minHeight:"100vh",backgroundColor:"#020838"}}></div>
            </Background>
                <div className='dashboard-text d-flex align-items-center flex-column'>
                        <Fade cascade duration={2000}>
                            <div className='dashboard-body win-prizes' style={{marginTop:150}}>Win Exciting Prizes !</div>
                        </Fade>
                        <div className='d-flex flex-wrap justify-content-evenly align-item-center' style={{width:"100vw"}}>
                            <Fade cascade direction='left' duration={2000}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <img alt='GiftCard' src={require('../Assets/giftcard.png')}></img>
                                    <div className='h2 text-white px-4 py-2 rounded' style={{fontFamily:"QuickSand",backgroundColor:"rgba(255,255,255,.4)"}}>Gift Cards</div>
                                </div>
                            </Fade>
                            <Fade cascade duration={4000}>
                                <div className='d-flex flex-column align-items-center'>
                                    <img alt='Coupons' src={require('../Assets/coupon.png')}></img>
                                    <div className='h2 text-white px-4 py-2 rounded' style={{fontFamily:"QuickSand",backgroundColor:"rgba(255,255,255,.4)"}}>Exciting Coupons</div>
                                </div>
                            </Fade>
                            <Fade cascade direction='right' duration={2000}>
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <img alt='Coins' src={require('../Assets/dashboard.png')}></img>
                                    <div className='h2 text-white px-4 py-2 rounded' style={{fontFamily:"QuickSand",backgroundColor:"rgba(255,255,255,.4)"}}>Reedem Coins</div>
                                </div>
                            </Fade>
                        </div>
                </div>
        </Parallax>
        <Parallax strength={500}>
            <Background>
                <div className='content' style={{width:"100vw",maxHeight:"100vh",backgroundColor:"#020838"}}></div>
            </Background>
                <div className='dashboard-text d-flex align-items-center flex-column'>
                        <Fade className='d-flex flex-column justify-content-evenly' cascade duration={2000} damping={.2}>
                            <div className='dashboard-body win-prizes' style={{marginTop:150}}>About Our Website</div>
                            <div className='dashboard-body win-prizes mt-5 mx-5 px-5' style={{fontSize:"30px",textIndent:100}}>Experience the thrill of gaming at Play Bonanza, the ultimate destination for an exhilarating gaming experience. Explore a wide range of captivating games, from action-packed adventures to mind-bending puzzles. As you play, unlock exciting coupons and valuable gift cards, transforming your gaming skills into fantastic rewards. Join us now and embark on a gaming journey like no other!</div>
                            <button className='text-white border rounded rounded-5 dashboard-button' onClick={Play}>Login</button>
                        </Fade>
                </div>
                <div style={{width:"100vw",position:"relative",bottom:0,left:0,backgroundColor:"#020338"}}>
                    <Footer/>
                </div>
        </Parallax>
    </>
  )
}

export default LandingPage















// <Fade cascade duration={3000} damping={.5}>
// <div className='dashboard-body win-prizes' style={{marginTop:150}}>Win Exciting Prizes !</div>
// <div className='d-flex justiy-content-center align-items-center'>
//     <Fade className='w-100 h-100' cascade direction='left' duration={3000}>
//     <img className='me-5' alt='giftcard' src={require('../Assets/giftcard.png')}></img>
//     </Fade>
//     <Fade cascade direction='right' duration={3000}>
//         <div>
//             <p className='h1 text-white' style={{fontFamily:"QuickSand",fontWeight:800}}>Gift Cards</p>
//             <div className='dashboard-body amazon'>Embark on an exhilarating gaming adventure where you can play captivating games and unlock the opportunity to earn enticing gift cards for popular platforms like Amazon and Flipkart. Start playing now to turn your gaming skills into valuable rewards!</div>
//         </div>
//     </Fade>
// </div>
// <div className='d-flex justiy-content-center align-items-center'>
//     <Fade cascade direction='left' duration={3000}>
//         <div>
//             <p className='h1 text-white' style={{fontFamily:"QuickSand",fontWeight:800}}>Exciting Coupons</p>
//             <div className='dashboard-body amazon'>Embark on an exhilarating gaming adventure where you can play captivating games and unlock the opportunity to earn enticing gift cards for popular  skills into valuable rewards!</div>
//         </div>
//     </Fade>
//     <Fade className='h-100 w-100' cascade direction='right' duration={3000}>
//         <img alt='giftcard' src={require('../Assets/coupon.png')}></img>
//     </Fade>
// </div>
// </Fade>  