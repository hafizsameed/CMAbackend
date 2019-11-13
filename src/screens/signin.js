import React from 'react';
import './signin.css'
import {firebaseSignIn} from '../config/firebase'
 class Signin extends React.Component {
  
  state={
      email:'controllermillitaryaccount@cma.com',
      password:'quettacommand'
  }
  
  signin(){
    console.log("sigining in");
    const {email,password} = this.state;
    firebaseSignIn(email,password)
    .then((data)=>{
        localStorage.setItem("user",data);
        console.log(data,'data');  
        this.props.history.push('/home');
    })
    .catch(e=>{
        console.log(e,'e');
    })
  }
    render(){
    return (
    <div className='main-div'>
        <div className='head-div'> 
            <div className='head-icon'> <i className="fa fa-check-circle  fa-5x" aria-hidden="true"></i></div>
            <div className='head-text'>
            Sign In
            </div>
        </div>
        <div className='signin-form'>
        <div className='inputs-div'>
            <div className='email-div'>
                <input value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} className='email' placeholder='Email' type='email'/>
            </div>
            <div className='password-div'>
                <input value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} className='password' placeholder='Password' type='password'/>
            </div>
        </div>
        <div className='signin-btn-div'>
            <button onClick={this.signin.bind(this)} className='signin-btn'>SignIn</button>
        </div>

        </div>

    </div>
  );
    }
}

export default Signin;
