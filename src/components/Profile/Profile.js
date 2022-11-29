import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { updateInfo,checkprofile,updateAccount } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/profile.css' 
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const initialState={
  newname:'',
  newemail:'',
  newphone:'',
  newzip:'',
  newpassword:'',
  newlinkto:''
};

const Profile = ({truename,email,phone,img,zip,password,updateAccount,linkto,updateInfo,checkprofile}) => {

    const [formData, setFormData] = useState(initialState);
    const[fileInputState,setFileInputState]=useState('')
    const[previewSource,setPreviewSource]=useState()
    const[showCom,setShowCom]=useState(false);
    const handleCloseCom = () => setShowCom(false);
    const handleShowCom=()=>setShowCom(true)
    var emailWarn;
    var phoneWarn;

    var zipWarn,nameWarn
    useEffect(async() => {
      emailWarn=document.getElementById("emailWarn");
      phoneWarn=document.getElementById("phoneWarn");
      zipWarn=document.getElementById("zipWarn");
      nameWarn=document.getElementById("nameWarn");

      emailWarn.style.display="none";
      phoneWarn.style.display="none";
      zipWarn.style.display="none";
      nameWarn.style.display="none";


      var temp=await getProfile()
      checkprofile(temp)
      setPreviewSource(temp["img"])
      

        const profileData = { ...initialState };
        profileData[newname]=truename;
        profileData[newemail]=email;
        profileData[newphone]=phone;
        profileData[newzip]=zip;
        profileData[linkto]=linkto
        setFormData(profileData);

        

      
    }, []);

    const {
      newname,
      newemail,
      newphone,
      newzip,
      newpassword,
      newlinkto
    } = formData;    




    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("here:"+newemail.length)
    console.log("here:"+email)
    var moEmail=newemail
    var moPhone=newphone
    var moZip=newzip
    var moPassword=newpassword
    if(handleValidation()){
      if(moEmail.length==0){
        moEmail=email
      }
      if(newphone.length==0){
        moPhone=phone
      }
      if(newzip.length==0){
        moZip=zip
      }

      updateInfo(truename,moEmail,moPhone,moZip,moPassword);
      const profileData = { ...initialState };
      profileData[newname]=truename;
      profileData[newemail]=email;
      profileData[newphone]=phone;
      profileData[newzip]=zip;
      setFormData(profileData);
    }

  };
  const handleValidation=(e)=>{
    let errors={};
    let formIsValid=true;

    var namePat=/^[a-zA-Z]+[a-zA-Z0-9]$/;
    if(newname.length!=0&&!namePat.test(newname)){
      nameWarn.style.display="inline";
      formIsValid=false;
    }
    
    var emailPat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(newemail.length!=0&&!emailPat.test(newemail)){
      document.getElementById("emailWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("emailWarn").style.display="none";

    }

    var phonePat=/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    if(newphone.length!=0&&!phonePat.test(newphone)){
      document.getElementById("phoneWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("phoneWarn").style.display="none";
    }

    var zipPat=/^[0-9]{5}$/
    if(newzip.length!=0&&!zipPat.test(newzip)){
      document.getElementById("zipWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("zipWarn").style.display="none";

    }



    return formIsValid;




  }


  const hangleFileInputChange=(e)=>{
    const file=e.target.files[0]
    previewFile(file)
  }

  const handleSubmitFile=(e)=>{
    e.preventDefault()
    if(!previewFile) return;
    uploadImge(previewSource)
  }

  const uploadImge=async(base64EncodedImage)=>{
    try{
      console.log(base64EncodedImage)
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

  const sumbitNewCom=async()=>{
    var text=document.getElementById("account").value
    var account=await fetch('http://localhost:8080/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({account:text})
    }).then(res => {
        return res.json();
    })
    if(account.res=="-1"){
      window.alert("Only non-local users can link accounts!")
    }else if(account.res=="0"){
      window.alert("Can not find the account!")
    }else if(account.res=="2"){
      updateAccount({linkto:account.linkto})
      window.alert("Unlink successfully!")
    }else{
      updateAccount({linkto:account.linkto})
      window.alert("Success! Accounts are merged after logout!")
    }



    handleCloseCom()
  }

  const previewFile=(file)=>{
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
      setPreviewSource(reader.result)
    }
  }


  return(  <section className='whole'>
        <a  style={{float:'left'}} href="../main">  Main Page</a>
        <div className='photo'>
            <div className='imgs'>
                <img className='perimgage' src={previewSource}  alt=""></img>
            </div>


            <form onSubmit={handleSubmitFile}>
              <input type="file" name="image" onChange={hangleFileInputChange}
              value={fileInputState}/>
              <button type='submit'>submit</button>
            </form>
            {/* {previewSource&&(
              <img src={previewSource} alt="chosen" style={{height:'300px'}}/>
            )} */}


        </div>

            
        <div className='curInfo'>
            <h1>Current Info</h1>
            <br/>
            <div className='spans'>Name: {truename}</div>
            <br/>
            <div  className='spans'>Email: {email}</div>
            <br/>
            <div  className='spans'>Phone: {phone}</div>
            <br/>
            <div  className='spans'>zip: {zip}</div>
            <br/>
            <div  className='spans'>password: ******</div>
            <div><Button variant="primary" onClick={handleShowCom}>Link Account</Button></div>

            {/* upload a new profile picture, opens file picker, but does not perform upload*/}

        </div>

        <div className='logo'>

          <img className='logo' style={{height:"200"}} src="https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-450x255.png"  alt=""></img>
        </div>
        <div className='update'>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
        <span id="nameWarn" style={{color:"red"}}>Please check your name</span>
        <br/>
        <Form.Label style={{float:'left'}} >Name :</Form.Label>
        <Form.Label>{truename}</Form.Label>


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <span id="emailWarn" style={{color:"red"}}>Please check your email</span>
          <br/>
        <Form.Label style={{float:'left'}} >Email :</Form.Label>
        <Form.Control  placeholder="Enter email" name="newemail"
            value={newemail}
            onChange={onChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <span id="phoneWarn" style={{color:"red"}}>Please check your phone number</span>
        <br/>        
        <Form.Label style={{float:'left'}} >Phone :</Form.Label>
        <Form.Control type="phone" placeholder="Enter phone" name="newphone"
            value={newphone}
            onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3">
      <span id="zipWarn" style={{color:"red"}} >Please check your zip number</span>
        <br/>
        <Form.Label style={{float:'left'}} >Zip :</Form.Label>
        <Form.Control type="zip" placeholder="Enter zip" name="newzip"
            value={newzip}
            onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{float:'left'}} >Password :</Form.Label>
        <Form.Control type="password" placeholder="Password" name="newpassword"
            value={newpassword}
            onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">

        Submit
      </Button>
    </Form>
        </div>


        <Modal show={showCom} onHide={handleCloseCom}>
        <Modal.Header closeButton>
          <Modal.Title>Merge account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='spans'>Link account: {linkto}</div>
          <Form.Control id="account"  placeholder='search accounts'/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCom}>
            Close
          </Button>
          <Button variant="primary" onClick={sumbitNewCom}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>


    </section>)
  };
  
  Profile.propTypes = {
    updateInfo: PropTypes.func.isRequired,
    checkprofile: PropTypes.func.isRequired,
    truename:PropTypes.string,
    email:PropTypes.string,
    phone:PropTypes.string,
    img:PropTypes.string,
    zip:PropTypes.string,
    linkto:PropTypes.string,
    updateAccount:PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({

    truename:state.truename,
    email:state.email,
    phone:state.phone,
    img:state.img,
    zip:state.zip,
    linkto:state.linkto
    
  });
  
  export const getProfile=async()=>{
    var profile=await fetch('http://localhost:8080/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    let res=await profile.json();

    var user=await fetch('http://localhost:8080/link', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    let res2=await user.json()



    var temp={}
    temp["email"]=res.email
    temp["phone"]=res.phone
    temp["zip"]=res.zip
    temp["truename"]=res.username
    temp["password"]="11111111"
    temp["img"]=res.img
    temp["linkto"]=res2.linkto

    return temp;
  }


  export default connect(mapStateToProps,{ updateInfo,checkprofile,updateAccount })(Profile);