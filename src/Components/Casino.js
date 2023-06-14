import WheelComponent from "react-wheel-of-prizes";
import React from "react";
import Footer from "./Footer";
import NavComp from "./NavComp";
import Loader from "./Loader";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import axios from "axios";
import Confetti from "react-confetti";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';


function Spinner(params) {

  const [toggle, setToggle] = React.useState(false);
  const [flag,setFlag] = React.useState(false);
  const [wish,setWish] = React.useState('Better Luck Next Time')
  const [msg,setmsg] =  React.useState('Come Tomorrow to play again')
  const toggleShow = () => setToggle(!toggle);

  const segments = [
    "better luck next time",
    "70 coins",
    "Amazon Gift Card",
    "better luck next time",
    "10 coins",
    "won uber pass",
    "better luck next time",
    "100 coins"
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#EC3F3F",
    "#34A24F",
    "#FF9000",
    "yellow"
  ];


  const onFinished = async (winner) => {
    setFlag(true)
    toggleShow()
    const key = `${process.env.REACT_APP_KEY}`
    const ubytes = CryptoJS.AES.decrypt(Cookies.get('processid'),key);
    const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
    let type,win;
    if(winner!=="better luck next time"){
      if(winner.includes('coins')){
        type="coins"
        win = parseInt(winner.split(' ')[0])
      }else{
        type="vouchers";
        win = winner;
      }
      await axios.post('https://playbonanza.onrender.com/casino',{uname:uname,win:win,type:type})
      .then(res => {
        console.log(res);
      }) 
      setWish("Congratulations !")
      setmsg(`You have won ${winner}`)  
    }
  };
  
  return (
    <>
    <div className=" text-white d-flex flex-column justify-content-center align-items-start flex-wrap" style={{minHeight:'100vh',width:'100vw',paddingTop:100}}>
    {flag && <Confetti/>} 
      <div style={{width:"100vw"}}><p className="h1 text-center mt-5 ">Spin The Wheel</p></div> 
      <div className="d-flex justify-content-between flex-wrap" style={{width:"100vw"}}>
        <div className="d-flex border border-5 justify-content-center align-items-center flex-wrap">
      <div className="d-flex mt-5 align-items-center" style={{width:"600px"}}>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="white"
          contrastColor="black"
          buttonText="Spin"
          isOnlyOnce={true}
          size={window.screen.width<=600?200:250}
          upDuration={500}
          downDuration={900}
          fontFamily="Arial"
          />
      </div>  
      </div> 
      <div className=" d-flex flex-column px-5 align-items-start" style={{gap:20}}>
        <div className="d-flex justify-content-center" style={{width:"100%"}}>
        <img src={require('../Assets/Logo.png')} alt="Logo" style={{width:"200px"}} className="text-center"></img>
        </div>
            <p className="h1">Welcome to the Spin the Wheel Game!</p>
            <p className="h3">Get ready for an exciting and thrilling experience as you spin the wheel and try your luck to win amazing prizes. Are you feeling lucky today? Give it a spin and see what fortune awaits!</p>
            <p className="h2">How to Play:</p>
            <ul className="d-flex flex-column justify-content-center align-items-start" style={{listStyle:"square"}}>
                <li>Click on the "Spin" button to start spinning the wheel.</li>
                <li>The wheel will gradually slow down and stop at a random segment.</li>
                <li>The prize or reward associated with the selected segment will be displayed.</li>
                <li>Enjoy your winnings and feel free to spin again for more chances to win!</li>
            </ul>
            <p className="h3">Good luck and have fun playing the Spin the Wheel Game!</p>
      </div>
      </div>
    </div>
      <MDBModal staticBackdrop show={toggle} setShow={setToggle} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
            <MDBModalHeader>
            <MDBModalTitle className = 'd-flex justify-content-center w-100 text-success h4'>{wish}</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className='w-100 text-center h-100'>
            <p className='h5'>{msg}</p>
            </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
    </>
  );
}



const Casino = () => {
  //eslint-disable-next-line
    const [size,setSize] = React.useState(250)
    const [load,setLoad] = React.useState(true);
    setTimeout(() => {
      setLoad(false)
    },5000)
  return (
    <>
    {load?<Loader />:
        <div style={{width:"100vw",backgroundColor:"#020338"}}>
            <NavComp/>
            <Spinner size = {size}/>
            <Footer/>
        </div>
    }
    </>
  )
}

export default Casino



