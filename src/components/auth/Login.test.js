
// import userEvent from '@testing-library/user-event'
import Login,{login} from './Login'
// import React, { Component } from "react";
// import { shallow, mount,configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import {reducer} from '../../store'



it('should log in a previously registered user',async()=>{
    expect(await login("Antonette","Victor Plains")).toBe(1)
    expect(reducer({
        name: '',
        password:'',
        isAuthenticated:false,

    }, { type: 'LOGIN',payload:{name:"Antonette",password:"Victor Plains"} })).toEqual(
        {
            name: 'Antonette',
            password:'Victor Plains',
            isAuthenticated:true
        }
    )
})

it('should not log in an invalid user',async()=>{
    expect(await login("Antonette1","Victor Plains")).toBe(3)
    expect(reducer({
        error:''
    }, { type: 'LOGIN_FAIL',payload:{error:"User does not exist"} })).toEqual(
        {
            error:"User does not exist",
        }
    )
    expect(await login("Antonette","Victor Plains11")).toBe(2)
    expect(reducer({
        error:'',
    }, { type: 'LOGIN_FAIL',payload:{error:"Name or password is wrong"} })).toEqual(
        {
            error:"Name or password is wrong",
        }
    ) 
    
})

it('should log out a user',async()=>{
    expect(reducer({
        name: 'Antonette',
        password:'Victor Plains',
        isAuthenticated:true
    }, { type: 'SIGNOUT',payload:{error:"User does not exist"} })).toEqual(
        {
            name: '',
            password:'',
            isAuthenticated:false
        }
    )
})

it('should register successfully',()=>{
    expect(reducer({
        justReg: false,
        password:'',
        email:'',
        phone:'',
        zip:'',
        name:''
    }, { type: 'REGISTER',payload:{
        justReg: true,
        password:'Victor Plains',
        email:'jg125@rice.edu',
        phone:'123-123-1234',
        zip:'77030',
        name:'Jiashuo'
    } })).toEqual(
        {
            justReg: true,
            password:'Victor Plains',
            email:'jg125@rice.edu',
            phone:'123-123-1234',
            zip:'77030',
            name:'Jiashuo'
        }
    )

})



// it('should form works successfully',async()=>{

//     render(<Login/>)

//     const spy=jest.spyOn(Storage.prototype, 'setItem');
//     const nameInput=screen.getByPlaceholderText(/Name/i)
//     const passwInput=screen.getByPlaceholderText(/Password/i)
//     fireEvent.change(nameInput,{target:{value:"Antonette"}})
//     fireEvent.change(passwInput,{target:{value:"Victor Plains"}})
//     const submitBtn=screen.getByTestId("button1")


//     fireEvent.click(submitBtn)
//     expect(nameInput.value).toMatch("Antonette");
//     expect(passwInput.value).toMatch("Victor Plains")


    // await user.click(screen.getByTestId(/button1/i)).then(()=>{
    //     expect(spy).toHaveBeenCalled();
    //     expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
    // }, (reason)=>{
    //     console.log(`promise rejected ${reason}`)
    //     expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
    // })

// })

