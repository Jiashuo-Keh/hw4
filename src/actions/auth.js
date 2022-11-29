import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";
import {REGISTER,LOGIN,SIGNOUT} from "./types";


export const loginSuccess=(name,password)=>async(dispatch)=>{
  dispatch({
    type:LOGIN_SUCCESS,
    payload:{name:name,password:password}
})}

export const loginFail=(error)=>async(dispatch)=>{
  dispatch({
    type:LOGIN_FAIL,
    payload:{error:error}
})}

export const signOut=()=>async(dispatch)=>{
  console.log("signout")
  fetch("http://localhost:8080/logout", {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json'},
}).then(res => res.json()).then(res => {
  localStorage.setItem("status", '');
  localStorage.setItem("name",'')
  dispatch({
    type:SIGNOUT
  })
})}


export const register=(name,zip,dob,email,password,justReg)=>async(dispatch)=>{
  let user={
    "username":name,
    "email":email,
    "dob":dob,
    "zipcode":zip,
    "password":password            
}
  fetch("http://localhost:8080/register",{
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    credentials:'include',
    body: JSON.stringify(user)
}).then(res => res.json()).then(res =>
  {
    var hasRegistered=false;
    if(res.result!="success"){
      window.alert("Name or password is wrong");
    }
    else{
      var tmp={name:name,zip:zip,dob:dob,email:email,password:password,justReg:true}
      dispatch({
          type:REGISTER,
          payload:{name:name,zip:zip,dob:dob,email:email,password:password,justReg:true}
  
      })
      localStorage.setItem("name",name)
      localStorage.setItem("status", "a fun status!");
      window.location.href="/main" 
    }
  })
  }


