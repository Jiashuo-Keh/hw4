import Profile,{getProfile} from './Profile'
import {reducer} from '../../store'

it('should fetch the logged in user\'s profile username',async()=>{
    expect(await getProfile("Antonette")).toStrictEqual(
        {
            "email":"Shanna@melissa.tv",
            "phone":"010-692-6593 x09125",
            "zip":"90566-7771",
            "truename":"Ervin Howell",
            "password":"Victor Plains"
       }    )})

it('fetch profile',()=>{


        expect(reducer({
            truename:'',
            email:'',
            phone:'',
            zip:'',
            password:''
      }, { type: 'CHECK_PROFILE',
      payload: {
        truename:"Jiashuo",
        email:"jg125@rice.edu",
        phone:"123-123-1234",
        zip:"77030",
        password:"123"
      }
       })).toEqual(
          {
            truename:"Jiashuo",
            email:"jg125@rice.edu",
            phone:"123-123-1234",
            zip:"77030",
            password:"123"
          }
      )
      
      
      })


      it('update profile info',()=>{


        expect(reducer({
            truename:'',
            email:'',
            phone:'',
            zip:''
      }, { type: 'UPDATE_INFO',
      payload: {
        truename:'Jiashuo',
        email:'jg125@rice.edu',
        phone:'123-123-1234',
        zip:'77030'
      }
       })).toEqual(
          {
            truename:'Jiashuo',
            email:'jg125@rice.edu',
            phone:'123-123-1234',
            zip:'77030'
          }
      )
      
      
      })


