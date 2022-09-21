import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from './Firebase';

const Signup = () => {
    const navigate = useNavigate()
    const[errorMsg,setErrorMsg]=useState("")
    const[ragisterData,setragisterData]=useState({
        emailaddress:"",
        businessname:"",
        phonenumber:"",
        password:"",
        confirmpassword:"",
    })

    const signupFromSubmit =()=>{
        if(!ragisterData.emailaddress || !ragisterData.businessname || !ragisterData.phonenumber || !ragisterData.password || !ragisterData.confirmpassword){
            setErrorMsg("fill all the fields");
            return;
        }
        setErrorMsg("");
        createUserWithEmailAndPassword(auth,ragisterData.emailaddress,ragisterData.password)
        .then(async(res)=>{
            const user =res.user;
            await updateProfile(user,{
                displayName:ragisterData.businessname,
            });
            navigate('login')
        }
        ).catch((err)=> {
            setErrorMsg(err.message);
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
                              <div className="input-group mb-3">
                                  <input type="email" name='emailaddress' onChange={inputHandler} className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address" />
                              </div>
                              <div className="input-group mb-3">
                                  <input type="Name" name='businessname' onChange={inputHandler} className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Business Name" />
                              </div>
                              <div className="input-group mb-3">
                                  <input type="text" name='phonenumber' onChange={inputHandler} className="form-control" id="exampleInputNumber" placeholder="Phone number" />
                              </div>
                              <div className="input-group mb-3">
                                  <input type="password" name='password' onChange={inputHandler} className="form-control" id="exampleInputPassword" placeholder="Password" />
                              </div>
                              <div className="input-group mb-3">
                                  <input type="password" name='confirmpassword' onChange={inputHandler} className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
                              </div>
                              <b className='errorMsg'>{errorMsg}</b >
                              <NavLink ><button type="submit" className="btn btn-primary" onClick={signupFromSubmit} >Register&nbsp; <i className="fa-solid fa-arrow-right" /></button></NavLink>
                              <div className="row mt-1">
                                  <div className="col mt-2 text-center">
                                      Already have account?  <NavLink  to="/Login" className="bottom-text">Login</NavLink>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
    </>
  )
}

export default Signup;