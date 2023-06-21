import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
  } from 'mdb-react-ui-kit';



const SignUp = () => {
    const [uname,setUname] = React.useState('')
    const [fname,setFname] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [msg,setMsg] = React.useState('')
    const [msg1,setMsg1] = React.useState('')
    const [msg2,setMsg2] = React.useState('')
    const [pwd,setPwd] = React.useState('')
    const [toggle, setToggle] = React.useState(false);
    const toggleShow = () => setToggle(!toggle);

    const navigate = useNavigate()

    const Submitted = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8888/signup',{uname:uname,fname:fname,email:email,pwd:pwd})
        .then((res) => {
            console.log(res);
            if(res.data.flag){
                setMsg("Account Created Successfully !")
                setMsg1("Thank You for joining with us !")
                setMsg2("You will be redirected to Login in 2 seconds")
                toggleShow();
                setTimeout(() => {
                    toggleShow()
                    setTimeout(() => {
                        navigate('/login')
                    },500)
                },2000)
            }else{
                setMsg("Signup Falied!")
                setMsg1("Sorry for the inconvenience ! Please Try again after some time ! ")
                setMsg2("Make sure your username is unique !")
                toggleShow();
                setTimeout(() => {
                    toggleShow()
                    setTimeout(() => {
                        navigate('/')
                    },500)
                },2000)
            }
        })
    }

    const CheckUsername = (e) => {
        setUname(e.target.value)
        axios.post('https://playbonanza.onrender.com/checkusername',{uname:e.target.value})
        .then(res => {
            if(res.data.flag){
                document.getElementById('username').style.borderBottom = "3px solid green";
            }else{
                document.getElementById('username').style.borderBottom = "3px solid red";
            }
        })
    }

  return (
    <>
        <div className='d-flex justify-content-center align-items-center' style={{minWidth:"100vw",minHeight:"100vh",backgroundColor:"#020338"}}>
            <div className='login-div signup rounded'>
                <div className='d-flex login-outer text-center' style={{fontSize:"30px"}}>
                    <div className='w-100 h-100 flex-column d-flex justify-content-center align-items-center'>
                        <div className='d-flex flex-column align-items-center login-form'>
                            <img src={require('../Assets/Logo.png')} className='mt-4' style={{width:"180px"}} alt="Logo"></img>
                            <p className='h1 text-dark' style={{fontFamily:"QuickSand"}}>Hi There !</p>
                            <form onSubmit={Submitted}>
                                <div className='h-100 text-center d-flex flex-column justify-content-around align-items-center mt-5 px-5 w-100 '>
                                    <div className='d-flex' style={{gap:10}}>
                                        <input type={'text'} className='form-input text-dark text-center mb-5' placeholder='Full Name' onChange={(e) => {setFname(e.target.value)}}></input>
                                    </div>
                                        <input id='username' type={'text'} className='form-input rounded text-center mb-5' placeholder='Username' onChange={CheckUsername}></input>
                                        <input type={'text'} className='form-input text-center mb-5' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                                        <input type={'password'} className='form-input text-center' placeholder='Password' onChange={(e) => setPwd(e.target.value)}></input>
                                        <button className='login-button mt-5 border border-dark rounded rounded-5'>SignUp</button>
                                        <p className='h6 text-dark mt-4'>Already Have an Account ? <a href='/login'>Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <img alt='Login' className='login-img signup-img rounded' src={require('../Assets/login.jpg')}></img>
                </div>
            </div>
        </div>
        <MDBModal staticBackdrop show={toggle} setShow={setToggle} tabIndex='-1'>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle className = 'd-flex justify-content-center w-100 text-success h4'>{msg}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody className='w-100 text-center h-100'>
                    <p className='h4'>{msg1}</p>
                    <p className='h5'>{msg2}</p>
                </MDBModalBody>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </>
  )
}

export default SignUp