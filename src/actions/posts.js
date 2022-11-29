import {CHECK_FRIENDS} from "./types";
import {UPDATE_STATUS,UPDATE_STATUS2,UPDATE_AVATAR} from "./types";
import {ADD_FRIENDS} from "./types";
import {ADD_POST} from "./types"
import { LOGIN } from "./types";
import {REFRESH} from "./types"
import {DELETE_FRIENDS} from "./types"
import {SEARCH_POST} from "./types"
import {UPDATE_POST} from "./types"

export const checkFriend=()=>async(dispatch)=>{

    // api for (name) to get friends
    dispatch({
        type:CHECK_FRIENDS,
        name:''
    })

    
  }

  export const searchPost=(data)=>async(dispatch)=>{
    dispatch({
      type:SEARCH_POST,
      payload:data
    })
  }

  export const getStatus=()=>async(dispatch)=>{
    console.log("first load")
    fetch("http://localhost:8080/headline",{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
  }).then(res => res.json()).then(res =>
    {
        localStorage.setItem("status", res.headline);
        localStorage.setItem("name",res.username)
        dispatch({
          type:UPDATE_STATUS,
          payload:{username:res.username,headline:res.headline}
          
         })
      
    })
  }


  export const getavatar=()=>async(dispatch)=>{

    fetch("http://localhost:8080/avatar",{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
  }).then(res => res.json()).then(res =>
    {
      console.log("img:::"+res.avatar)
        dispatch({
          type:UPDATE_AVATAR,
          payload:{img:res.avatar}
          
         })
      
    })
  }




  export const updateStatus=(status)=>async(dispatch)=>{
    // 

    fetch("http://localhost:8080/headline",{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify({'headline':status})
  }).then(res => res.json()).then(res =>
    {
        localStorage.setItem("status", status);
        dispatch({
          type:UPDATE_STATUS2,
          payload:{status:status}
          
         })
      
    })

    
  }

  export const addPost=(name,content,title,baseurl)=>async(dispatch)=>{
    console.log("baseurl:"+baseurl)

    fetch("http://localhost:8080/article",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify({'text':content,'data':baseurl,'title':title})
  }).then(res => res.json()).then(res =>
    {
      var tmp={id:res.article.author,content:res.article.text,key:res.article.id,img:res.article.img ,title:res.article.title,date:res.article.date}

      dispatch({
        type:ADD_POST,
        payload:tmp
       })
      
    })
   
   }

   export const updatePost=(id,title,text,baseurl)=>async(dispatch)=>{
      var post=await fetch('http://localhost:8080/articles/'+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({text:text,title:title,'data':baseurl})
    }).then(res => res.json()).then(res =>
      {

        var posts=[]
        for(var i=0;i<res.articles.length;i++){
          var item={id:res.articles[i].author,key:res.articles[i].id,content:res.articles[i].text,title:res.articles[i].title,img:res.articles[i].img,date:res.articles[i].date}
          posts.push(item) 
        }
        console.log("length:"+posts.length)
        dispatch({
          type:UPDATE_POST,
          payload:{
            posts:posts
          }
         })
        
      })
   }

   export const deletefriends=(friends,posts)=>async(dispatch)=>{
    console.log(friends)
    console.log(friends.length)
    dispatch({
      type:DELETE_FRIENDS,
      payload:{friends:friends,posts:posts}
    })
   }

  export const addFriends=(friends,newPosts)=>async(dispatch)=>{
    console.log("friends:")
    for(var i=0;i<friends.length;i++){
      console.log(friends[i])
    }
    dispatch({
      type:ADD_FRIENDS,
      payload:{friends:friends,posts:newPosts}
     })
   }

   



   export const refresh=(tmp)=>async(dispatch)=>{
      
        dispatch({
         type:REFRESH,
         payload:tmp
        })

  }



   export const checkposts=(name)=>async(dispatch)=>{
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res =>
    {

        // 假设name:1
        var friends=[];
        for(var i=0;i<3;i++){
          var friendName=(Number(name)+i+1)%10
          var tmp={name:friendName,status:'A fun status!'}
          
          friends.push(tmp)
        }
  
        var posts=[]


          for(var i=0;i<res.length;i++){

            if(res[i]["userId"]==name){

              var item={id:res[i]["id"],content:res[i]["body"],title:res[i]["title"],img:'https://p.qqan.com/up/2021-2/16137992352635419.jpg'}
              posts.push(item)
            }
    
          }

          
        


        dispatch({
            type:LOGIN,
            payload:{friends:friends,posts:posts}
        })
  

  
    }
  );
  
  
      
    }
    

  