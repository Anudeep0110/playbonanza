import React, { useState, useEffect } from "react";
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
  const [isToggle, setIsToggle] = useState(false);
  const navigate = useNavigate();

  const toggleShow = () => {
    setIsToggle(!isToggle);
  };

  const rewards = [
    "Lenskart Coupon worth 500/-",
    "70 coins",
    "Amazon Gift Card",
    "Flipkart Gift Card",
    "10 coins",
    "won uber pass",
    "won Spotify Subscription for 3 months",
    "100 coins",
  ];

  const texts = ['A', 'A', 'B', 'C', 'D', 'E'];

  function shuffleArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  const shuffledTexts = shuffleArray(texts);
  console.log(shuffledTexts);
  const [cards, setCards] = useState(
    [
      { id: 1, text: shuffledTexts[0], flipped: false, matched: false },
      { id: 2, text: shuffledTexts[1], flipped: false, matched: false },
      { id: 3, text: shuffledTexts[2], flipped: false, matched: false },
      { id: 4, text: shuffledTexts[3], flipped: false, matched: false },
      { id: 5, text: shuffledTexts[4], flipped: false, matched: false },
      { id: 6, text: shuffledTexts[5], flipped: false, matched: false },
    ]
  );
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [wish, setWish] = useState('Better Luck Next Time');
  const [msg, setMsg] = useState('Come back tomorrow to play again');

  useEffect(() => {
    checkMatchedPairs();
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
        setTimeout(() => {
          setWish("Congratulations!");
          const winner = rewards[Math.floor(Math.random() * rewards.length)];
          setMsg(`You have won ${winner}`);

          // Insert into Database
          const key = process.env.REACT_APP_KEY;
          const ubytes = CryptoJS.AES.decrypt(Cookies.get('processid'), key);
          const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));
          setWin(true);

          let type, win;
          if (winner.includes('coins')) {
            type = "coins";
            win = parseInt(winner.split(' ')[0]);
          } else {
            type = "vouchers";
            win = winner;
          }

          axios.post('http://localhost:8888/win', { uname: uname, win: win, type: type })
            .then(res => {
              console.log(res);
            });
        }, 0);
      } else {
        const key = process.env.REACT_APP_KEY;
        const ubytes = CryptoJS.AES.decrypt(Cookies.get('processid'), key);
        const uname = JSON.parse(ubytes.toString(CryptoJS.enc.Utf8));

        axios.post('http://localhost:8888/lose', { uname: uname })
          .then(res => {
            console.log(res);
          });
      }

      setTimeout(() => {
        navigate('/games');
      }, 2000);

      toggleShow();
      setGameOver(true);
    }
  };

  return (
    <>
      <NavComp />
      <div className="d-flex flex-column align-items-center" style={{ width: "100vw", minHeight: "100vh", backgroundColor: '#020338', gap: 40 }}>
        <div className="w-100 text-center text-white mb-5" style={{ marginTop: '120px' }}>
          <h1>Flip the Matching Card</h1>
        </div>

        <div className="d-flex flex-wrap w-100 justify-content-around gap-5">
          <div className="flip-card-container d-flex flex-wrap">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`flip-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''} rounded rounded-5`}
                onClick={() => handleFlip(card)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={require(`../Assets/emoji${index + 1}.jpg`)} alt="EMOJIS" className="rounded rouned-5" style={{ objectFit: "cover", height: "100%" }}></img>
                  </div>
                  <div className="flip-card-back">
                    <h2 className="card-text">{card.text}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex flex-column text-white justify-content-center align-items-center h-100" style={{ gap: 30 }}>
            <p className="h1">Welcome to the Flip the Match Card Game!</p>
            <p className="h2">Game Instructions:</p>
            <ul className="d-flex flex-column justify-content-center align-items-start" style={{ listStyle: "square" }}>
              <li>Choose any two cards from the four available cards.</li>
              <li>Make sure the signs on the cards are the same.</li>
              <li>If you find a winning combination, you win!</li>
              <li>Your account will be updated with the rewards you've won.</li>
            </ul>
            <p className="h2">Prize Pool:</p>
            <ul className="d-flex flex-column justify-content-center align-items-start" style={{ listStyle: "square" }}>
              <li>Offers: Exclusive discounts, freebies, etc.</li>
              <li>Coins: Virtual currency that can be used for in-app purchases.</li>
            </ul>
            <p className="h2">Good luck!</p>
          </div>
        </div>
        <Footer />
      </div>

      <MDBModal show={isToggle} getOpenState={(e) => toggleShow(e)} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{wish}</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>{msg}</MDBModalBody>
            <MDBBtn onClick={toggleShow}>Close</MDBBtn>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Riddle;

