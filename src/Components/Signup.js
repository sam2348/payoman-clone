import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection } from 'firebase/firestore';
import LoadingSpinner from "./LoadingSpinner";
import { db } from './Firebase';

import { auth } from './Firebase';

const Signup = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const[emailErrorMsg,setEmailErrorMsg]=useState('')
    const[businessErrorMsg,setBusinessErrorMsg]=useState('')
    const[phoneErrorMsg,setPhoneErrorMsg]=useState('')
    const[passwordErrorMsg,setPasswordErrorMsg]=useState('')
    const[confirmPasswordErrorMsg,setConfirmPasswordErrorMsg]=useState('')
    const[ragisterData,setragisterData]=useState({
        emailaddress:"",
        businessname:"",
        phonenumber:"",
        password:"",
        confirmpassword:"",
    })
   
    const signupFromSubmit =(e)=>{
        e.preventDefault();
        if(!ragisterData.emailaddress || !ragisterData.businessname || !ragisterData.phonenumber || !ragisterData.password || !ragisterData.confirmpassword){
            setBusinessErrorMsg("enter your business name");
            setConfirmPasswordErrorMsg('enter confirm password')
            setEmailErrorMsg('enter your email address')
            setPhoneErrorMsg('enter your number')
            setPasswordErrorMsg('enter your password')
        }
        let regEmail = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let regphone = /^[0-9]{10}$/;
        let regPass =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!regEmail.test(ragisterData.emailaddress)) {
            setEmailErrorMsg("enter vaild email address");
            return;
        }if (regEmail.test(ragisterData.emailaddress)){
            setEmailErrorMsg(" ");
        }if (!ragisterData.businessname) {
            setBusinessErrorMsg("enter vaild name");
            return;
        }if (ragisterData.businessname){
            setBusinessErrorMsg(" ");
        }if (!regphone.test(ragisterData.phonenumber)) {
            setPhoneErrorMsg("enter vaild number");
            return;
        }if (regphone.test(ragisterData.phonenumber)) {
            setPhoneErrorMsg("");
        }if(!regPass.test(ragisterData.password)){
            setPasswordErrorMsg("enter vaild password");
            return;
        }if(regPass.test(ragisterData.password)){
            setPasswordErrorMsg(" ");
        }if (ragisterData.password !== ragisterData.confirmpassword) {
            setConfirmPasswordErrorMsg("password not match");
            return;
        }if (ragisterData.password === ragisterData.confirmpassword) {
            setConfirmPasswordErrorMsg("");
        }  
        setIsLoading(true)
        createUserWithEmailAndPassword(auth,ragisterData.emailaddress,ragisterData.password)
        .then(async(res)=>{
            const user =res.user;
            await updateProfile(user,{
                displayName:ragisterData.businessname,
            });
            const AccountColl = collection(db, "signupData")
            addDoc(AccountColl, {ragisterData})
            .then((res)=>{
                console.log(res);
            }).catch((err)=> {
                console.log(err.message);
            }); 
            navigate('login');
            setIsLoading(false)
        }).catch((err)=> {
            toast.error(err.message);
            setIsLoading(false)
        });   
    };
    const inputHandler=(event)=>{
        setragisterData((prev)=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
  return (
    <>      
           {isLoading ? <LoadingSpinner /> : <>
            <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-2 col-md-4">
                  </div>
                  <div className="col-sm-8 col-md-4">
                      <form>
                          <div className="section p-4 rounded-3 bg-white border shadow-lg rounded-3">
                              <div className="logo text-center">
                                  <img src="img/payoman-logo1.png" style={{ width: 300 }} />
                              </div>
                              <h5 className="form-heading mb-4 p-2 text-center">Register your account</h5>
                              <div className="input-group mb-1">
                                  <input type="email" name='emailaddress' onChange={inputHandler} className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" />
                              </div>
                              <span className='errorMsg '>{emailErrorMsg}</span >
                              <div className="input-group mb-1">
                                  <input type="Name" name='businessname' onChange={inputHandler} className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Business Name" />
                              </div>
                              <span className='errorMsg '>{businessErrorMsg}</span >
                              <div className="input-group mb-1">
                                  <input type="text" maxLength={10} name='phonenumber' onChange={inputHandler} className="form-control" id="exampleInputNumber" placeholder="Phone number" />
                              </div>
                              <span className='errorMsg '>{phoneErrorMsg}</span >
                              <div className="input-group mb-1">
                                  <input type="password" name='password' onChange={inputHandler} className="form-control" id="exampleInputPassword" placeholder="Password" />
                              </div>
                              <span className='errorMsg '>{passwordErrorMsg}</span >
                              <div className="input-group mb-1">
                                  <input type="password" name='confirmpassword' onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
                              </div>
                              <span className='errorMsg '>{confirmPasswordErrorMsg}</span >
                              <button type="button" className="btn btn-primary mt-2" onClick={signupFromSubmit} disabled={isLoading} >Register&nbsp; <i className="fa-solid fa-arrow-right" /></button>
                              <ToastContainer />
                              <div className="row mt-1">
                                  <div className="col mt-2 text-center">
                                      Already have account?  <NavLink  to="/login" className="bottom-text">Login</NavLink>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
       </>}
    </>
  )
}

export default Signup;