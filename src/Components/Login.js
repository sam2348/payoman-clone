import React, { useState,useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './Firebase';

const Login = () => {
    const navigate = useNavigate()
    const[emailErrorMsg,setEmailErrorMsg]=useState('')
    const[passwordErrorMsg,setPasswordErrorMsg]=useState('')
    const[errorMsg,setErrorMsg]=useState('')
    const[ragisterData,setragisterData]=useState({
        emailaddress:"",
        password:"",
    })
    const LoginHandler =()=>{
        
        var regExx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(ragisterData.emailaddress)) {
            setEmailErrorMsg("enter vaild email address");
            return;
        }else if(!regExx.test(ragisterData.password)){
            setPasswordErrorMsg("enter vaild password");
            return;
        }
        setEmailErrorMsg(" ");
        setPasswordErrorMsg(" ");
        signInWithEmailAndPassword(auth,ragisterData.emailaddress,ragisterData.password)
        .then(()=>{
          localStorage.setItem('login',true)
          navigate('/')
        }
        ).catch((err)=> {
            toast.error(err.message);
            
        });
        
    };
    const emailInputHandler=(event)=>{
        // var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // if (!regEx.test(event.target.value)) {
        //     setErrorMsg("enter vaild email address");
            
        // }
        setragisterData((prev)=>({
            ...prev,
            [event.target.name]: event.target.value,
        })) 
    }
    const passwordInputHandler=(event)=>{
        // var regExx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // if (!regExx.test(event.target.value)) {
        //     setErrorMsg("enter vaild password");
            
        // }
        setragisterData((prev)=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
      useEffect(() => {
        let login = localStorage.getItem('login');
        if(login){
          navigate('/')
        }
      })
  return (
    <div>
        <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-2 col-md-4">  
                  </div>
                  <div className="col-sm-8 col-md-4">
                      <form>
                          <div className="section p-4 bg-white border shadow-lg rounded-3">
                              <div className="logo text-center">
                                  <img src="img/payoman-logo1.png" style={{ width: 300 }} />
                              </div>
                                <h5 className="form-heading mb-4 p-2 text-center">Login to payoman</h5>
                              <div className="input-group mb-1">
                                  <input type="text" 
                                  name='emailaddress' onChange={emailInputHandler} 
                                  className="form-control" id="exampleInputNumber1" placeholder="Enter phone number" />
                              </div>
                              <span className='errorMsg '>{emailErrorMsg}</span >
                              <div className="input-group mb-1 mt-2">
                                  <input type="password" 
                                  name='password' onChange={passwordInputHandler} 
                                  className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
                              </div>
                              <span className='errorMsg '>{passwordErrorMsg}</span >
                              <div className="input-group ">
                                  <div className="col-sm text-end">
                                      <NavLink to="/forgetpassword">Forgot Password?</NavLink>
                                  </div>
                              </div>
                              <br />
                              <button type="button" className="btn btn-primary" 
                               onClick={LoginHandler} 
                              > Login&nbsp; <i className="fa-solid fa-right-to-bracket" /></button>
                              < ToastContainer />
                              <div className="row mt-1">
                                  <div className="col mt-2 pt-2 text-center">
                                      Don't have account?  <NavLink to="/signup" className="bottom-text">Register now</NavLink>
                                  </div>
                              </div>
                        </div>
                    </form>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Login