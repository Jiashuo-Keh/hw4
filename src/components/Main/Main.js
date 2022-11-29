import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/main.css' 
import Card from 'react-bootstrap/Card';
import Friends from './Friends';
import { signOut } from '../../actions/auth';
import { checkFriend,updateStatus,getStatus,getavatar,addFriends,searchPost,addPost,checkposts,refresh } from '../../actions/posts';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from './Posts';


  

const initialState={
  curstatus:'',
  newpost:'',
  searchItems:'',
  newtitle:'',
  curimg:''
  
}
  


  


const Main = ({updateStatus,checkposts,getStatus,getavatar,signOut,refresh,addPost,name,status,friends,justReg,searchPost,searchedposts,img,posts}) => {

  const [formData, setFormData] = useState(initialState);
  const[fileInputState,setFileInputState]=useState('')
  const[previewSource,setPreviewSource]=useState('http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo-380x380.png')


var newstatus=''

useEffect(async() => {

  const profileData = { ...initialState };
  var temp=await getStatus();
  var temp2=await getavatar()
  profileData[curstatus]=status
  profileData[newpost]=''
  profileData[searchItems]=''
  profileData[newtitle]=''
  console.log("img:"+img)
  profileData[curimg]=img
  
  var res=await checkRefresh(window.localStorage.name)
  setFormData(profileData)


  refresh(res)
  console.log("main name:"+name)
  
  
  

},[]);

const{
  curstatus,
  newpost,
  searchItems,
  newtitle,
  curimg
}=formData

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const onChange = (e) =>
setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async(e) => {
  e.preventDefault();
  localStorage.setItem("status", curstatus);
  await updateStatus(curstatus)
  console.log("status:"+status)
  
  
};

const onSubmitPost=(e)=>{
  e.preventDefault();
  if(newpost.length==0){
    window.alert("New post can not be empty!")
  }else{

    handleShow()    
  }

  // addPost(name,newpost)
}

const onSubmitTitle=(e)=>{
  e.preventDefault();
  console.log(newpost+"  "+newtitle)
  if(newtitle.length==0){
    window.alert("Title can not be empty!")
  }else{
    if(previewSource!='http://knttraining.co.uk/wp-content/uploads/2018/11/how-to-add-a-png-to-a-photo-380x380.png'){
      addPost(name,newpost,newtitle,previewSource)
    }else{
      addPost(name,newpost,newtitle,'')
    }
    
    handleClose()
  }
}



const clear=()=>{
  setFormData({ ...formData, newpost: '' });
}

const search=(e)=>{
  e.preventDefault();
  var searchkey=document.getElementById('searchText').value
  console.log("searchItems"+document.getElementById('searchText').value)
  var data=searchfunc(searchkey,posts)
  searchPost(data)
}


const hangleFileInputChange=(e)=>{
  const file=e.target.files[0]
  previewFile(file)
}



const uploadImge=async(base64EncodedImage)=>{
  try{
    const newAvatar=await fetch('http://localhost:8080/avatar',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({"data":base64EncodedImage})
    }).then(res => res.json()).then(res => {
      console.log("url:"+newAvatar.img)
      setPreviewSource(newAvatar.img)
    })
  }catch(errer){
    console.log("error")
  }
}

const previewFile=(file)=>{
  const reader=new FileReader()
  reader.readAsDataURL(file)
  reader.onload=()=>{
    setPreviewSource(reader.result)
  }
}




    

return( <section className='whole'>
<div className='nav'>
  <a className='navbar1' style={{display:'inline'}} href="../" onClick={signOut}>  Log Out</a>
  <a  className='navbar2' style={{display:'inline'}} href="../profile">  Profile</a>
</div>

  <Card style={{ width: '18rem' }}>
<Card.Img variant="top" style={{width:100,height:100,marginLeft:80}} src={img} />
<Card.Title className='title'>{window.localStorage.name}</Card.Title>
  <Card.Text>
    {window.localStorage.status}
  </Card.Text>
<Card.Body>
  <InputGroup className="mb-3">
  <Form.Control
        placeholder='Modify status'
        name="curstatus"
        value={curstatus}
        onChange={onChange}
        style={{zIndex:10}}
  />
  {/* 随机编个add进去 */}
  <button  onClick={onSubmit}  style={{zIndex:10}}>Update</button>
</InputGroup>

</Card.Body>
</Card>


<Friends friends={friends}/>


<div className='posts'>
<div className='uploadbox'>
<Form onSubmit={onSubmitPost}>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  {/* another input for file. (Hint: input type='file')  */}
  <Form.Label>My Post</Form.Label>
  <br/>
  <Form.Control as="textarea" rows={3}
  type="newpost"
  placeholder='newpost'
  name='newpost'
  value={newpost}
  onChange={onChange} />
</Form.Group>

<button className='btn1' variant="primary" type="submit">

  Submit
</button>

</Form>
<button className='btn2' variant="primary" onClick={clear}>
  {/* clear */}
  Clear
</button>
</div>


<div className='searchbar'>
<InputGroup className="mb-3">
  <Form.Control
    placeholder="Search Posts only by author or text"
    type="text"
    id="searchText"
    // onChange={onChange}
  />
  {/* 随机编个add进去 */}
  <button  onClick={search}>Search</button>
</InputGroup>
</div>




<div className='pgrid'>
<Container>
  <Row>
    <Posts posts={searchedposts}/>
  </Row>
</Container>
</div>

</div>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {previewSource&&(
              <img src={previewSource} alt="chosen" style={{height:'200px'}}/>
            )}
          <Form >
          <input type="file" name="image" title="foo" onChange={hangleFileInputChange}
              value={fileInputState}/>
          <button type='submit'>Choose</button>
          <button type='submit'>Clear</button>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control  placeholder="Enter Title" name="newtitle"
            value={newtitle}
            onChange={onChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitTitle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

</section>)


};

//     var tmp={name:name,friends:friends,posts:posts,searchedposts:posts}
export const checkRefresh=async(name)=>{



  var user=await fetch("http://localhost:8080/following/",{
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(res => {
    return res.json();})


    console.log("load")
    console.log("user following:"+user.following)
    var friends=[];
    var id=0;
    for(var i=0;i<user.following.length;i++){
        var fri=user.following[i]
        var tmp={id:id++,name:fri.username,status:fri.headline,img:fri.avatar}
        console.log(tmp.img)
        friends.push(tmp)
    }



  var post=await fetch('http://localhost:8080/articles/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(res => {
      return res.json();
  })
  var posts=[]
  for(var i=0;i<post.articles.length;i++){
    var item={id:post.articles[i].author,key:post.articles[i].id,content:post.articles[i].text,title:post.articles[i].title,img:post.articles[i].img,date:post.articles[i].date}
    posts.push(item) 
  }

  var tmp={name:user.username,friends:friends,posts:posts,searchedposts:posts}

  return tmp
}


export   const  searchfunc=(searchkey,posts)=>{
  let data=[]
  let str = `\S*${searchkey}\S*`;
  let reg = new RegExp(str,'i');
  posts.map(item=>{
    if(reg.test(item["id"])||reg.test(item["content"])){
      data.push(item)
    }
  })
  return data;
}




Main.propTypes = {
  updateStatus: PropTypes.func.isRequired,
  getStatus:PropTypes.func.isRequired,
  getavatar:PropTypes.func.isRequired,
  searchPost:PropTypes.func.isRequired,
  addPost:PropTypes.func.isRequired,
  checkposts:PropTypes.func.isRequired,
  refresh:PropTypes.func.isRequired,
  signOut:PropTypes.func.isRequired,
  justReg: PropTypes.bool,
  name:PropTypes.string,
  status:PropTypes.string,
  img:PropTypes.string,
  posts:PropTypes.array,
  searchedposts:PropTypes.array,
  friends:PropTypes.array
};

const mapStateToProps = (state) => ({
  isnew: state.isnew,
  name:state.name,
  status:state.status,
  img:state.img,
  searchedposts:state.searchedposts,
  justReg:state.justReg,
  posts:state.posts,
  friends:state.friends
});


export default connect(mapStateToProps,{ signOut,updateStatus,getavatar,getStatus,addPost,checkposts,refresh,searchPost })(Main);