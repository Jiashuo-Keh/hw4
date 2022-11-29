
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const middleware = [thunk];


export const initState = {
    name: '',
    truename:'',
    password:'',
    isnew:false,
    status:'',
    email:'jg125@rice.edu',
    phone:'1234',
    zip:'77030',
    justReg:false,
    password:'11',
    isAuthenticated:false,
    posts:[],
    searchedposts:[],
    friends:[],
    error:'',
    img:'',
    linkto:'',
    
}
export const reducer = (state = initState, action) => {
    const{type,payload}=action
    
    
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                name:payload.name,
                password:payload.password,
                isAuthenticated:true               
            };
        case 'LOGIN_FAIL':
            return{
                error:payload.error
            }
        case 'SIGNOUT':
            return{
                name:'',
                password:'',
                isAuthenticated:false
            }
        case 'LOGIN':
               return {
                    ...state,
                    name:payload.name,
                    password:payload.password,
                    isAuthenticated:true               
                };
        case 'REGISTER':
            return{
                ...state,
                justReg:true,
                password:payload.password,
                email:payload.email,
                phone:payload.phone,
                zip:payload.zip,
                name:payload.name
            };
        case 'CHECK_FRIENDS':
            return{
                ...state,
                friends:[payload,...state.friends]
            }


        case 'CHECK_PROFILE':
            return{
                ...state,
                truename:payload.truename,
                email:payload.email,
                phone:payload.phone,
                zip:payload.zip,
                password:payload.password,
                img:payload.img,
                linkto:payload.linkto
            }

        case 'UPDATE_STATUS':
            return {
                ...state,
                status:payload.status,
                name:payload.username
          };
          case 'UPDATE_ACCOUNT':
            return {
                ...state,
                linkto:payload.linkto
          };


          case 'UPDATE_STATUS2':
            return{
                ...state,
                status:payload.status
            }

        case 'UPDATE_AVATAR':
            return{
                ...state,
                img:payload.img               
            }

        case 'REFRESH':
        return{
            ...state,
            name:payload.name,
            friends:payload.friends,
            posts:payload.posts,
            searchedposts:payload.searchedposts
        };
        case 'SEARCH_POST':
            return{
                ...state,
                searchedposts:payload
            }
        case 'ADD_POST':
            return{
                ...state,
                posts:[payload,...state.posts],
                searchedposts:[payload,...state.posts]
            }
        case 'ADD_FRIENDS':
            return{
                ...state,
                posts:payload.posts,
                friends:payload.friends,
                searchedposts:payload.posts
            }
        case 'DELETE_FRIENDS':
            return{
                ...state,
                friends:payload.friends,
                posts:payload.posts,
                searchedposts:payload.posts
            }
        case 'UPDATE_INFO':
            return{
                ...state,
                truename:payload.truename,
                email:payload.email,
                phone:payload.phone,
                zip:payload.zip
            }
        case 'UPDATE_POST':
            return{
                ...state,
                posts:payload.posts,
                searchedposts:payload.posts
            }
        
        default:
            
            return state;
 
    }
}


const store=createStore(reducer,initState,composeWithDevTools(applyMiddleware(...middleware)))
export default store
