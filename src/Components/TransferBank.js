import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase';
import axios from 'axios';

const TransferBank = () => {
  const [showAccountDetail,setShowAccountDetail]=useState([]);
  
  console.log(showAccountDetail,'===================')
  useEffect(() => {
    GetAccountDetails();
  },[])

  const GetAccountDetails= async ()=>{
    // try {
    // const result = await axios.get("http://localhost:3001/account")
    // setShowAccountDetail(result.data)
    // } catch (error){
    //     alert(error,"No Data Found")
    // }
    const AccountColl = collection(db, "accounts")
    getDocs(AccountColl)
    .then((res)=>{
        const acc = res.docs.map(doc =>({
          data: doc.data(),
          id:doc.id,
        }))
        setShowAccountDetail(acc);
    }).catch((err)=> {
        console.log(err.message);
    });   
    };
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-sm-2 col-md-4">
          </div>
          <div className="col-sm-8 col-md-4">
            <form>
              <div className="section p-4 rounded-3 bg-white shadow-lg">
                <h4 className="form-heading mb-4 text-center">
                  Wallet to bank
                </h4>
                <div className="row py-2 pay">
                  <div className="col">
                    <h5>Transfer to</h5>
                  </div>
                </div>
                <div className="row py-2 pay">
                  <div className="col">
                    <h6>Recent Bank Transfers</h6>
                  </div>
                  <br />
                  {/* ------------------------start to map -----------------------*/}
                  <div className="container  border rounded">
                  {
                    showAccountDetail.map((data)=>{
                      return(
                  <NavLink to="/paymentprocess" className="text-dark" key={data.id}>
                    <div className="row p-2 pay ">
                      <div className="col-2">
                        <img
                          src="img/avatar.webp"
                          className="bankprofileAvatars"
                          style={{ width: 52 }}
                        />
                      </div>
                      <div className="col-8 ps-4">
                        <h6> {data.data.accontDteails.BusinessName} </h6>
                          <span>{data.data.accontDteails.AccountNumber}</span>
                      </div>
                      <div className="col-2 pt-2">
                        <img
                          src="img/SBI-logo.svg.png"
                          className="bankprofileAvatars"
                          style={{ width: 35 }}
                        />
                      </div>
                    </div>
                    </NavLink>
                    )
                  })
                  }
                  </div> 
                </div>
                <div className="row mt-1">
                  <div className="col mt-2 pt-2 text-center">
                    <button type="submit" className="btn btn-primary">
                    <NavLink to="/addaccount" className="text-white">
                      <i className="fa-solid fa-building-columns transfer" />
                        &nbsp; Add New Account
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferBank;