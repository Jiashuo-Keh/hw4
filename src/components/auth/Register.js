import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/register.css' 

const Register = ({register,isAuthenticated,name,email,phone,zip,password,justReg}) => {
  var emailWarn;
  var phoneWarn;
  var zipWarn,nameWarn,passwordWarn,conpassWarn;
  useEffect(() => {
    emailWarn=document.getElementById("emailWarn");
    phoneWarn=document.getElementById("phoneWarn");
    zipWarn=document.getElementById("zipWarn");
    nameWarn=document.getElementById("nameWarn");
    conpassWarn=document.getElementById("conpassWarn");
    passwordWarn=document.getElementById("passwordWarn");
    emailWarn.style.display="none";
    phoneWarn.style.display="none";
    zipWarn.style.display="none";
    nameWarn.style.display="none";
    passwordWarn.style.display="none";
    conpassWarn.style.display="none";
});
  
    const [formData, setFormData] = useState({
      curname: '',
      curemail: '',
      curphone:'',
      curzip:'',
      curpassword: '',
      conpass:'',
      errors:{}
    });
  
    const { curname, curemail,curphone,curzip, curpassword,conpass,errors } = formData;

    const handleValidation=(e)=>{
      let errors={};
      let formIsValid=true;

      var namePat=/^[a-zA-Z]+[a-zA-Z0-9]$/;
      if(curname.length==0||curname.length!=0&&!namePat.test(curname)){
        nameWarn.style.display="inline";
        formIsValid=false;
      }

      var emailPat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(curemail.length==0||curemail.length!=0&&!emailPat.test(curemail)){
          emailWarn.style.display="inline";
          formIsValid=false;
      }

      var phonePat=/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
      if(curphone.length==0||curphone.length!=0&&!phonePat.test(curphone)){
          phoneWarn.style.display="inline";
          formIsValid=false;
      }

      var zipPat=/^[0-9]{5}$/
      if(curzip.length==0||curzip.length!=0&&!zipPat.test(curzip)){
          zipWarn.style.display="inline";
          formIsValid=false;
      }

      if(curpassword.length==0){
        passwordWarn.style.display="inline";
        formIsValid=false;
      }

      if(conpass.length==0||conpass!=curpassword){
        conpassWarn.style.display="inline";
        formIsValid=false;
      }

      return formIsValid;




    }
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = async (e) => {
      e.preventDefault();
      if(handleValidation()){
        register(curname,curzip,curphone,curemail,curpassword,justReg)
        
      }

    };
  
    // if (isAuthenticated) {
    //   return <Navigate to="/dashboard" />;
    // }
  
    return (
      <section>
      <div className='whole'>

        <div className='logbox'>
        <p className="lead">
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
        <span id="nameWarn" style={{color:"red"}}>Please check your name(unique, only letters and numbers )</span>
        <br/>
          <input className='inputs'
            type="curname"
            placeholder="Name"
            name="curname"
            value={curname}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <span id="emailWarn" style={{color:"red"}}>Please check your email</span>
          <br/>
          <input className='inputs'
            type="curemail"
            placeholder="email"
            name="curemail"
            value={curemail}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <span id="zipWarn" style={{color:"red"}} >Please check your zip number</span>
        <br/>
          <input className='inputs'
            type="curzip"
            placeholder="zip"
            name="curzip"
            value={curzip}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <span id="phoneWarn" style={{color:"red"}}>Please check your phone number</span>
        <br/>
          <input className='inputs'
            type="curphone"
            placeholder="phone"
            name="curphone"
            value={curphone}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <span id="passwordWarn" style={{color:"red"}}>Password is empty</span>
        <br/>
          <input
            type="password"
            placeholder="Password"
            name="curpassword"
            value={curpassword}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
        <span id="conpassWarn" style={{color:"red"}}>Password does not match</span>
        <br/>
          <input
            type="password"
            placeholder="Password Confirmation"
            name="conpass"
            value={conpass}
            onChange={onChange}
          />
        </div>
        <br/>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
        </div>
        <p className="my-1">
           Already have an account? <Link to="/">Sign In</Link>
         </p>
      </div>

    </section>

    );
  };


  Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    justReg:PropTypes.bool,
    name:PropTypes.string,
    email:PropTypes.string,
    phone:PropTypes.string,
    zip:PropTypes.string,
    password:PropTypes.string,

  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
    justReg:state.justReg,
    name:state.name,
    email:state.email,
    phone:state.phone,
    password:state.password,
    zip:state.zip
  });
  
  export default connect(mapStateToProps,{ register })(Register);
