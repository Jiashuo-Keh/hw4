import React, { Fragment , useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFriend,addFriends,deletefriends } from '../../actions/posts';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../../css/main.css' 
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Friends = ({ friends,posts, checkFriend,addFriends,deletefriends }) => {

  // useEffect(() => {
  // },[friends]);

    const add=async(e)=>{
      e.preventDefault();
      var friendName=document.getElementById('addfriends').value;
      var temp=await afterAdd(friends.length,friendName,friends,posts)
      if(temp.friends.length!=0){
        addFriends(temp["friends"],temp["posts"])
      }
      
      
    }

    const deleteFriend=async(name)=>{
      console.log("delete name"+name)
      console.log("length:"+friends.length)
      var tmp=await afterDelete(name,friends,posts)
      deletefriends(tmp["friends"],tmp["posts"])
    }



    const friend = friends.map((fri) => (
        <tr key={fri.name}>
          <td>
            
          <img className='perimgage' style={{width:50,height:50}} src={fri.img}  alt=""></img>
          <Button variant="outline-secondary" onClick={()=>deleteFriend(fri.name)} style={{float:"right"}}>x</Button>
          <ul>
            <span>{fri.name}</span>
            <br/>
            <span>{fri.status}</span>
          </ul>
          </td>
        </tr>
      ));


    return (
        <Fragment>

<div className='friends'>
<Card className='carddown' style={{ width: '18rem'  }}>
{/*  User with id 1 follows users with ids 2, 3, and 4. The user with id 10 follows users with ids 1, 2, and 3. */}
<div style={{overflowY: 'auto',height:350}}>
          <table className="table">
            <tbody>{friend}</tbody>
          </table>
          </div>



{/* list */}
<Card.Body>
<InputGroup className="mb-3">
  <Form.Control
    placeholder="Add Friends"
    id="addfriends"
  />
  {/* 随机编个add进去 */}
  <button  onClick={add}>Add</button>
</InputGroup>
</Card.Body>
</Card>
</div>
       </Fragment>
      );
}

   export const afterDelete=async(name,friends,posts)=>{
    var tmp=[]
    
      // update friends
  var fris=await fetch('http://localhost:8080/following/'+name, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(res => {
      return res.json();
  })

  console.log("deleted name:"+name)
  var id=0
  for(var i=0;i<fris.following.length;i++){
    var item={id:id++,name:fris.following[i].username,status:fris.following[i].headline,img:fris.following[i].avatar}
    tmp.push(item)
  }
    var deletedPosts=[]


    var post=await fetch('http://localhost:8080/articles/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(res => {
        return res.json();
    })



    for(var i=0;i<post.articles.length;i++){
      
      var item={id:post.articles[i].author,key:post.articles[i].id,content:post.articles[i].text,title:post.articles[i].title,img:post.articles[i].img,date:post.articles[i].date}
      deletedPosts.push(item) 

    }
      return {friends:tmp,posts:deletedPosts}
   }

export const afterAdd=async(id,name,friends,posts)=>{

  var id=0

  // update friends
  var hasUser=await fetch('http://localhost:8080/following/'+name, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(res => {
      return res.json();
  })


  if(hasUser.result=="-1"){
    window.alert("The user has already been followed!")
  }else if(hasUser.result=="0"){
    window.alert("The user does not exist")
  }else{
    friends=[]
    for(var i=0;i<hasUser.following.length;i++){
      var tmp={id:id++,name:hasUser.following[i].username,status:hasUser.following[i].headline,img:hasUser.following[i].avatar}
      friends.push(tmp)
    }

    var postList=await fetch('http://localhost:8080/articles/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(res => {
        return res.json();
    })
  }
  // update posts


  
    console.log("articles"+postList.articles)
  var newPosts=[]
  for(var i=0;i<postList.articles.length;i++){
    var item={id:postList.articles[i]["author"],
      key:postList.articles[i]["id"],
      content:postList.articles[i]["text"],
      title:postList.articles[i]["title"],
      img:postList.articles[i]["img"],
      date:postList.articles[i].date}

    newPosts.push(item)
  }
  console.log("articles"+newPosts)
  return {friends:friends,posts:newPosts}


}

Friends.propTypes = {
    checkFriend: PropTypes.func.isRequired,
    deletefriends:PropTypes.func.isRequired,
    addFriends:PropTypes.func.isRequired,
    posts:PropTypes.array
  };
  
  const mapStateToProps = (state) => ({
    posts:state.posts
  });

  
export default connect(mapStateToProps,{ checkFriend,addFriends,deletefriends })(Friends);