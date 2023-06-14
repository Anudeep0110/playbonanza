import React from 'react'
import Av1 from '../Assets/av1.jpg'
import NavComp from './NavComp'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom'
import {RiCoupon3Fill} from 'react-icons/ri'
import {CiShoppingTag,CiMoneyBill} from 'react-icons/ci'
import {RiCoinsFill} from 'react-icons/ri'
import {TiTags} from 'react-icons/ti'
import {CgGames} from 'react-icons/cg'
import {GiLaurelsTrophy} from 'react-icons/gi'
import {SiRiotgames} from 'react-icons/si'
import {TbBrandMailgun} from 'react-icons/tb'

const Profile = () => {

    const navigate = useNavigate()

    const [load,setLoad] = React.useState(true) 
    const [fname,setFname] = React.useState('');
    const [uname,setUname] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [coins,setCoins] = React.useState(0);
    const [vouchers,setVouchers] = React.useState([]);
    const [played,setPlayed] = React.useState(0)
    const [wins,setWins] = React.useState(0)
    const [loses,setLoses] = React.useState(0)


    React.useEffect(() => {
        if(Cookies.get('processid')===undefined){
            navigate('/login')
        }
        const key = `${process.env.REACT_APP_KEY}`
        const ubytes = CryptoJS.AES.decrypt(Cookies.get('processid'),key);
        const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
        axios.post('https://playbonanza.onrender.com/profile',{uname:uname})
        .then(res => {
            setFname(res.data.data.fullname)
            setUname(res.data.data.username)
            setEmail(res.data.data.email)
            setCoins(res.data.data.coins)
            setWins(res.data.data.wins)
            setPlayed(res.data.data.played)
            setLoses(res.data.data.loses)
            setVouchers(res.data.data.vouchers)

        })
        //eslint-disable-next-line
    },[])
    
            setTimeout(() => {
                setLoad(false)
            },3000)
  return (
    <>
    {load?<Loader/>:
        <>
        <NavComp />
        <div className='d-flex flex-wrap justify-content-center text-white'  style={{width:'100vw',minHeight:'100vh',background:'#020338',gap:50,paddingTop:'150px',fontFamily:"QuickSand"}}>
                <div className='d-flex flex-column' style={{gap:20}}>
                <div className='p-4 rounded rounded-5' style={{minHeight: 'fit-content',background:'rgba(255,255,255,.4)'}}> 
                    <div className='d-flex px-3'>
                        <img src={Av1} alt="User Avatar" style={{width:'100px'}} className='rounded rounded-5'></img>
                        <div className='d-flex p-3 flex-column'>
                            <p className='h2'>{fname}</p>
                            <p className='h6 d-flex' style={{gap:10,fontFamily:"Zilla Slab "}}><TbBrandMailgun />{uname}</p>
                        </div>
                    </div>

                    <div className='m-4'>
                        <p className='h6' style={{gap:10,fontFamily:"Inconsolata"}}>{email}</p>
                    </div>

                    <div className='d-flex flex-column m-4' style={{gap:10,fontFamily:"Zilla Slab "}}>
                        <p className='h4' style={{color:"orange",fontFamily:"Titillium Web"}}>Coins Info</p>
                        <p className='h5 d-flex'><RiCoinsFill className='me-2'/>Redeem Coins : {coins}</p>
                        {/* <p className='h5 d-flex'><CiMoneyBill className='me-2'/>Coupons : {Coupons.length}</p> */}
                        <p className='h5 d-flex'><TiTags className='me-2'/>Vouchers : {vouchers.length}</p>
                    </div>
                </div>
                <div className='p-4 rounded rounded-5' style={{minHeight: 'fit-content',background:'rgba(255,255,255,.4)'}}> 
                    <div className='d-flex flex-column m-4' style={{gap:10}}>
                        <p className='h4' style={{color:"orange",fontFamily:"Titillium Web"}}>GamePlay Info</p>
                        <p className='h5 d-flex'><CgGames className='me-2'/>Games Played : {played}</p>
                        <p className='h5 d-flex'><GiLaurelsTrophy className='me-2'/>Wins : {wins}</p>
                        <p className='h5 d-flex'><SiRiotgames className='me-2'/>Loses : {loses}</p>
                    </div>
                </div>
                </div>


                <div className='d-flex flex-column p-4 rounded rounded-5 profile' style={{minHeight: 'fit-content', marginBottom: 'auto',background:'rgba(255,255,255,.4)'}}>
                    <div className="">
                        <p className='h2 text-center'>My Rewards</p>
                    </div>
                    <div className='mt-3'>
                        <div className='h3 mb-4 d-flex' style={{color:"orange"}}>My Vouchers <RiCoupon3Fill className='ms-3 h1'/></div>
                        <div className='d-flex flex-column gap-3'>
                            {vouchers.map((item,index) => {
                                return(
                                    <div className="h4 d-flex"><CiShoppingTag className='me-3'/>{item}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
        </div>
        </>}
    </>
  )
}

export default Profile