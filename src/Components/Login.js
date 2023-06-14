import React,{useState} from 'react'
import { Modal} from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
  } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie'
import CryptoJs from 'crypto-js'


const Login = () => {


    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg,setMsg] = useState('')
    const [msg1,setMsg1] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const key = `${process.env.REACT_APP_KEY}`
    const [toggle, setToggle] = React.useState(false);
    const toggleShow = () => setToggle(!toggle);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError('')
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError('')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8888/login',{uname:username,pwd:password})
        .then(res => {
            if(res.data.flag){
                setMsg("Login Successful")
                setError('')
                const euname = CryptoJs.AES.encrypt(JSON.stringify(username),key).toString()
                Cookies.set('processid',euname)
                setMsg1("You will be redirected to Games Page in 2 seconds")
                toggleShow()
                setTimeout(() => {
                    navigate('/games')
                },2000)
            }else{
                setError('Invalid Password or Username')
            }
        })
        handleClose();
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <>
        <div className='d-flex justify-content-center align-items-center' style={{minWidth:"100vw",minHeight:"100vh",backgroundColor:"#020338"}}>
            <div className='login-div rounded'>
                <div className='d-flex login-outer text-center' style={{fontSize:"30px"}}>
                    <img alt='Login' className='login-img rounded' src={require('../Assets/login.jpg')}></img>
                    <div className='w-100 h-100 flex-column d-flex justify-content-center align-items-center'>
                        <div className='d-flex flex-column align-items-center login-form'>
                            <img src={require('../Assets/Logo.png')} className='mt-5' style={{width:"200px"}} alt="Logo"></img>
                            <p className='h1 text-dark mb-2' style={{fontFamily:"QuickSand"}}>Welcome</p>
                            <form onSubmit={handleSubmit}>
                                <div className='h-100 text-center d-flex flex-column justify-content-around align-items-center mt-5 px-5 w-100 '>
                                        <input required type={'text'} className='form-input text-dark text-center mb-5' placeholder='Username' onChange={handleUsernameChange}></input>
                                        <input required type={'password'} className='form-input text-center' placeholder='Password' onChange={handlePasswordChange}></input>
                                        <p className='h6 text-danger'>{error}</p>
                                        <p><p style={{cursor:"pointer"}} className='h6 text-start text-dark text-decoration-underline text-start' onClick={handleShow}>Forgot Password</p></p>
                                        <button className='login-button mt-3 border border-dark rounded rounded-5'>Login</button>
                                </div>
                            </form>
                        </div>
                            <p className='text-dark h6'>New Account ? <a href='/signup'>Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='text-center p-4'>
                <input className='form-input text-center text-dark mb-5' placeholder='Enter Mail'></input>
                <button className='login-button mt-3 h4 border border-dark rounded rounded-5'>Send reset link</button>
            </form>
        </Modal.Body>
      </Modal>
      <MDBModal staticBackdrop show={toggle} setShow={setToggle} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle className = 'd-flex justify-content-center w-100 text-success h4'>{msg}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody className='w-100 text-center h-100'>
                    <p className='h5'>{msg1}</p>
                </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>
  )
}

export default Login