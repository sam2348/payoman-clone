import React, { useState,useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./LoadingSpinner";



import { auth } from './Firebase';

const Login = () => {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    const[emailErrorMsg,setEmailErrorMsg]=useState('')
    const [isLoading, setIsLoading] = useState(false);
    const[passwordErrorMsg,setPasswordErrorMsg]=useState('')
    const[ragisterData,setragisterData]=useState({
        emailaddress:"",
        password:"",
    })
    const LoginHandler =()=>{
        if(!ragisterData.emailaddress || !ragisterData.password ){
            setEmailErrorMsg('enter your email address')
            setPasswordErrorMsg('enter your password')
        }
        let regEmail = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let regPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regEmail.test(ragisterData.emailaddress)) {
            setEmailErrorMsg("enter vaild email address");
            return;
        }if (regEmail.test(ragisterData.emailaddress)){
            setEmailErrorMsg(" ");
        }
        if(!regPass.test(ragisterData.password)){
            setPasswordErrorMsg("enter vaild password");
            return;
        }if(regPass.test(ragisterData.password)){
            setPasswordErrorMsg(" ");
        }
        setIsLoading(true);
        signInWithEmailAndPassword(auth,ragisterData.emailaddress,ragisterData.password)
        .then(()=>{
          localStorage.setItem('login',true)
          navigate('/')
          setIsLoading(false)
        }
        ).catch((err)=> {
            toast.error(err.message);
            setIsLoading(false);
        });
        
    };
    const inputHandler=(event)=>{
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
      const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
  return (
    <div>
        {isLoading ? <LoadingSpinner /> : <>
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
                                  name='emailaddress' onChange={inputHandler} 
                                  className="form-control" id="exampleInputNumber1" placeholder="Enter phone number" />
                              </div>
                              <span className='errorMsg '>{emailErrorMsg}</span >
                              <div className="input-group mb-1 mt-2">
                                  <input type={passwordShown ? "text" : "password"}
                                  name='password' onChange={inputHandler} 
                                  className="form-control" id="exampleInputPassword1" placeholder="Enter password" />
                              </div>
                              <span className='eye'><i className='fas fa-eye' onClick={togglePasswordVisiblity}></i></span>
                              <span className='errorMsg '>{passwordErrorMsg}</span >
                              <div className="input-group ">
                                  <div className="col-sm text-end">
                                      <NavLink to="/forgetpassword">Forgot Password?</NavLink>
                                  </div>
                              </div>
                              <br />
                              <button type="button" className="btn btn-primary" 
                               onClick={LoginHandler} disabled={isLoading}
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
         </>}
    </div>
  )
}

export default Login