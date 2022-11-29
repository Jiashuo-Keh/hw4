import {UPDATE_INFO} from "./types";
import {CHECK_PROFILE} from './types'
import {UPDATE_ACCOUNT} from "./types"

export const updateInfo=(name,email,phone,zip,password)=>async(dispatch)=>{

    var tmp={truename:name,email:email,phone:phone,zip:zip,password:password}

    if(email.length!=0){
        fetch("http://localhost:8080/email",{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include',
            body: JSON.stringify({'email':email})
        })
    }

    if(phone.length!=0){
        fetch("http://localhost:8080/dob",{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include',
            body: JSON.stringify({'dob':phone})
        })
    }

    if(zip.length!=0){
        fetch("http://localhost:8080/zipcode",{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include',
            body: JSON.stringify({'zip':zip})
        })
    }

    if(password.length!=0){
        fetch("http://localhost:8080/password",{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials:'include',
            body: JSON.stringify({'password':password})
        })
    }


    // api for (name) to get friends
    dispatch({
        type:UPDATE_INFO,
        payload:tmp
    })
    
  }

export const checkprofile=(temp)=>dispatch=>{
    dispatch({
        type:CHECK_PROFILE,
        payload:{email:temp["email"],img:temp["img"],phone:temp["phone"],zip:temp["zip"],truename:temp["truename"],password:temp["password"],linkto:temp["linkto"]}
    })}


export const updateAccount=(temp)=>dispatch=>{
        dispatch({
            type:UPDATE_ACCOUNT,
            payload:{linkto:temp["linkto"]}
        })}