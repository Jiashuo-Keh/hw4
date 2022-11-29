import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginSuccess,loginFail } from '../../actions/auth';
import "../../css/login.css";
import axios from 'axios';

import { Button } from "bootstrap";
const Login = (loginSuccess,loginFail) => {
  useEffect(() => {});




  const [name,setName]=useState("111");
  const[password,setPassword]=useState("")


  const thirdAuth=async(e)=>{
    e.preventDefault()
    const user=await fetch('http://localhost:8080/auth/google', {
  method: 'GET',
  credentials: 'include' ,
  headers: { 'Content-Type': 'application/json' },

}).then(() => {
  console.log("in")
})
  }


  const onSubmit = async(e) => {
    e.preventDefault();
    var result=await login(name,password)
    console.log(result)
    if(result==1){
      console.log("login")
      localStorage.setItem("name", name);
      localStorage.setItem("status", "a fun status!");
      window.location.href = "/main";
      loginSuccess(name,password)
    }else{
      // loginFail("User does not exist")
      window.alert("Name or password is wrong");
    }
    
  };

  return (
    <section>

      <div className='whole'>
        <div className='logbox'>
          <p className='lead'>Sign Into Your Account</p>
          <form className='form' onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                className='inputs'
                type='name'
                placeholder='Name'
                name='name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength='6'
              />
            </div>
            <br />
            <button
              type='submit'
              data-testid='button1'
              className='btn btn-primary'

            >Submit</button>
          </form>

        </div>
        <p className='my-1'>
          Don't have an account? <a href='/register'>Sign Up</a>
        </p>
        
        <p>Sign in
          <a class="button google" href='http://localhost:8080/auth/google'>Sign in with Google</a>
        </p>
      </div>

    </section>
  );
};




export   const  login=async (curname,curpassword)=>{

  const para={
    "username":curname,
    "password":curpassword
}


const user=await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify(para)
}).then(res => {
    for (let entry of res.headers) { // <-- response header iterable
      console.log(entry);
    }
    console.log(document.cookie)
    return res.json();
})


if (user.result=="success") {
  console.log("success")
        return 1;
    }
    return 2


}



Login.propTypes = {
  loginSuccess:PropTypes.func.isRequired,
  loginFail:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps,{ loginSuccess,loginFail })(Login);


