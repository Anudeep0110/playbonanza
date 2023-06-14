import React,{useState,useEffect} from "react";
import Footer from "./Footer";
import NavComp from "./NavComp";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import axios from "axios";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Riddle = () => {

    const [toggle, setToggle] = React.useState(false);
    const navigate = useNavigate()
    const toggleShow = () => setToggle(!toggle);
    //eslint-disable-next-line
    const [rewards,setRewards] = useState([
      "Lenskart Coupon worth 500/-",
      "70 coins",
      "Amazon Gift Card",
      "Flipcart Gift Card",
      "10 coins",
      "won uber pass",
      "won Spotify Subsription for 3 months",
      "100 coins"
    ])


    const [text,setText] = useState(['A','A','B','C','D','E'])

    function shuffleArray(array) {
      const newArray = [...array]; 
    
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; 
      }
    
      return newArray;
    }

    const texts = shuffleArray(text)
    console.log(texts);
    const [cards, setCards] = useState([
      { id: 1, text: texts[0], flipped: false, matched: false },
      { id: 2, text: texts[1], flipped: false, matched: false },
      { id: 3, text: texts[2], flipped: false, matched: false },
      { id: 4, text: texts[3], flipped: false, matched: false },
      { id: 5, text: texts[4], flipped: false, matched: false },
      { id: 6, text: texts[5], flipped: false, matched: false },
    ]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win,setwin] = useState(false)
    const [wish,setWish] = useState('Better Luck Next Time')
    const [msg,setmsg] = useState('Come Tomorrow to play again')
    
    useEffect(() => {
      checkMatchedPairs();
      //eslint-disable-next-line
    }, [flippedCards]);
  
    const handleFlip = (card) => {
      if (!gameOver && !card.flipped && flippedCards.length < 2) {
        const updatedCards = cards.map((c) =>
          c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(updatedCards);
        setFlippedCards([...flippedCards, card]);
      }
    };
  
    const checkMatchedPairs = () => {
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.text === card2.text) {
            setTimeout(async () => {
            setWish("Congratulations !")
            const winner = rewards[Math.floor(Math.random() * rewards.length)];
            setmsg(`You have won ${winner}`)

            //Insert into Database
            const key = `${process.env.REACT_APP_KEY}`
            const ubytes = CryptoJS.AES.decrypt(Cookies.get('processid'),key);
            const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8))
            setwin(true)
            let type,win;
              if(winner.includes('coins')){
                type="coins"
                win = parseInt(winner.split(' ')[0])
              }else{
                type="vouchers";
                win = winner;
              }
              await axios.post('https://playbonanza.onrender.com/casino',{uname:uname,win:win,type:type}) 
            }, 0);
          }
          setTimeout(() => {
              navigate('/games')
          },2000)
      toggleShow()
      setGameOver(true)
      }
    };
  

  return (
    <>
    <NavComp />
        <div className="d-flex flex-column align-items-center" style={{width:"100vw",minHeight:"100vh",backgroundColor:'#020338',gap:40}}>
            <div className="w-100 text-center text-white mb-5" style={{marginTop:'120px'}}>
                <h1>Flip the Matching Card</h1>
            </div>

            <div className="d-flex flex-wrap w-100 justify-content-around gap-5"> 

            <div className="flip-card-container d-flex flex-wrap">
              {cards.map((card,index) => (
                  <div
                  key={card.id}
                  className={`flip-card ${card.flipped ? 'flipped' : ''} ${
                      card.matched ? 'matched' : ''
                  } rounded rounded-5`}
                  onClick={() => handleFlip(card)}
                  >
                  <div className="flip-card-inner">
                      <div className="flip-card-front">
                      <img src={require(`../Assets/emoji${index+1}.jpg`)} alt="EMOJIS"  className="rounded rouned-5" style={{objectFit:"cover",height:"100%"}}></img>
                      </div>
                      <div className="flip-card-back">
                      <h2 className="card-text">{card.text}</h2>
                      </div>
                  </div>
                  </div>
              ))}
            </div>
                <div className="d-flex flex-column  text-white justify-content-center align-items-center h-100" style={{gap:30}}>
                    <p className="h1">Welcome to the Flip the Match Card Game!</p>
                    <p className="h2">Game Instructions:</p>
                    <ul className="d-flex flex-column justify-content-center align-items-start" style={{listStyle:"square"}}>
                        <li>Choose any two cards from the four available cards.</li>
                        <li>Make Sure the signs on the Cards Same</li>
                        <li>If you find a winning combination, you win!</li>
                        <li>Your account will be updated with the rewards you've won.</li>
                    </ul>
                    <p className="h2">Prize Pool:</p>
                    <ul className="d-flex flex-column justify-content-center align-items-start" style={{listStyle:"square"}}>
                        <li>Offers: Exclusive discounts, freebies, and special deals.</li>
                        <li>Coins: Collectible coins to unlock bonuses or levels.</li>
                        <li>Coins: Collectible coins to unlock bonuses or levels.</li>
                    </ul>
                </div>
            </div>
            <Footer />
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
                    <p className='h6'>You will be redirected to Games in 2 seconds</p>
                </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        {win && <Confetti/>}
    </>
  )
}

export default Riddle