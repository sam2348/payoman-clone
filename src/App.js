import React, { useState } from "react";
import Account from "./Components/Account";
import AddAccount from "./Components/AddAccount";
import TransferBank from "./Components/TransferBank";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgetPassword from "./Components/ForgetPassword";
import PaymentProcess from "./Components/PaymentProcess";
import PasswordReset from "./Components/PasswordReset";
import { Routes,Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/paymentprocess' element={ < PrivateRoute Component={PaymentProcess} />} />
        <Route path='/transferbank' element={ < PrivateRoute Component={TransferBank} />} />
        <Route path='/addaccount' element={ < PrivateRoute Component={AddAccount} />} />
        <Route path='/' element={< PrivateRoute Component={Account} />} />
        <Route path='/*' element={ < Navigate to="/" />} />
        <Route path='/forgetpassword' element={ < ForgetPassword/> } />
        <Route path='/passwordreset' element={ < PasswordReset/> } />
        <Route path='/signup' element={ < Signup />} />
        <Route path='/login' element={ < Login />} />
      </Routes>
    </>
  );
}

export default App;
