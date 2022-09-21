import React, { useEffect,useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from './Firebase';

const Account = () => {
  const navigate = useNavigate();
  const[errorMsg,setErrorMsg]=useState("")
  const LogoutHandler = () => {
    signOut(auth).then(() => {
      setErrorMsg('Sign-out successful.')
    }).catch((error) => {
      setErrorMsg(error.message)
    });
    setErrorMsg('');
    localStorage.removeItem("login", false);
    navigate("login");
  };
  useEffect(() => {
    let login = localStorage.getItem("login");
    if (!login) {
      navigate("login");
    }
  });
  return (
    <>
      <div className="container-board">
        <div className="navbar-container">
          <div className="row ">
            <div className="col-sm-1 col-md-1 pt-2">
              <img
                src="img/avatar.webp"
                className="bankprofileAvatars"
                style={{ width: 60 }}
              />
            </div>
            <div className="col-sm-7 col-md-7 pt-2">
              <ul className="list-unstyled ">
                <li>
                  <h5>
                    <strong>NAME OF BUSINESS</strong>
                  </h5>
                </li>
                <li>
                  <span>Name of the bank account</span>
                </li>
              </ul>
            </div>
            <div className="col-sm-2 col-md-2 pt-2">
              <ul className="list-unstyled">
                <li>
                  <span>Total Balance:</span>
                </li>
                <li>
                  <h4>
                    <strong> OMR +5.00 </strong>
                  </h4>
                </li>
              </ul>
            </div>
            <div className="col-sm-2 col-md-2 pt-4">
              <ul className="list-unstyled d-flex ">
                <li>
                  <NavLink to="/TransferBank">
                    <button type="submit" className="btn btn-primary add-money">
                      <img src="img/top-up.png" style={{ width: 20 }} />{" "}
                      &nbsp;To Bank
                    </button>
                  </NavLink>
                </li>
                &nbsp;
                <li>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={LogoutHandler}
                  >
                    <img src="img/turn-off.png" style={{ width: 16 }} />
                  </button>
                  <b className='errorMsg'>{errorMsg}</b >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="banner">
          <img src="img/payobanner.png" className="d-block w-100" alt="..." />
        </div>
        <div className="container-board">
          <div className="row pt-3">
            <div className="col text-start">
              <h5>Recent Payments</h5>
            </div>
            <div className="col text-end">
              <a href="account.html">
                <i className="fa-solid fa-arrows-rotate" />
              </a>
            </div>
          </div>
           <div className="row pt-3">
            <div className="col-2 border pt-4 text-center">
                <i className="fa-solid fa-building-columns " />
            </div>
            <div className="col-6 border pt-3">
                <ul className="list-unstyled ">
                <li>Money Received from ABHINANDAN</li>
                <li><span>13 Sept, 3:00AM</span></li>
                </ul>
            </div>
            <div className="col-4 border pt-3  text-end">
                <strong>OMR</strong>&nbsp;+4500.00
            </div>
            <br />
            <div className="col-2 border pt-4 text-center">
                <i className="fa-solid fa-building-columns " />
            </div>
            <div className="col-6 border pt-3">
                <ul className="list-unstyled ">
                <li>Sent to PAANI POORI RESTAURANT</li>
                <li><span>10 Sept, 6:30PM</span></li>
                </ul>
            </div>
            <div className="col-4 border pt-3  text-end">
                <strong>OMR</strong>&nbsp;-60.00
            </div>
            <br />
            <div className="col-2 border pt-4 text-center">
                <i className="fa-solid fa-building-columns " />
            </div>
            <div className="col-6 border pt-3">
                <ul className="list-unstyled ">
                <li>Money Received from CODESOFTIC</li>
                <li><span>01 Sept, 9:00PM</span></li>
                </ul>
            </div>
            <div className="col-4 border pt-3  text-end">
                <strong>OMR</strong>&nbsp;+500000.00
            </div>
            <br />
            <div className="col-2 border pt-4 text-center">
                <i className="fa-solid fa-building-columns " />
            </div>
            <div className="col-6 border pt-3">
                <ul className="list-unstyled ">
                <li>Money Received from ABHINANDAN</li>
                <li><span>28 Aug, 5:00PM</span></li>
                </ul>
            </div>
            <div className="col-4 border pt-3  text-end">
                <strong>OMR</strong>&nbsp;+80000.00
            </div>
            </div>
           <div className="banner">
          <img src="img/payobanner.png" className="d-block w-100" alt="..." />
        </div>
       </div>
      </div>
    </>
  );
};

export default Account;
