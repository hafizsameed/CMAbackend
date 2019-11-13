import React from 'react';
import './messages.css'
import firebase from '../config/firebase'

 class Messages extends React.Component {
  state={
      messages:[]
  }
    goto(path){
        this.props.history.push(path);
    }
    componentDidMount(){
        this.getMessages();
    }
    getMessages(){
        var arr=[];
    firebase.firestore().collection('messages').get()
    .then((data)=>{
        data.forEach((e)=>{
            arr.push(e.data());
        })
        console.log(arr,'arr');
        this.setState({messages:arr})
    })
    .catch(e=>console.log(e))
    }
    render(){
    return (
    <div className='home-main-div'>
        <div className='head-div'>
            <div className='head-text'>
                Messages
            </div>
        </div>
        <div className='home-sec-div'>
            {this.state.messages.map((e,i)=>{
                return <div key={i} className='msg-div'>
                            <div className='name'>Name:  {e.name}</div>
                            <div className='email'>Email:  {e.email}</div>
                            <div className='subject'>subject:  {e.subject}</div>
                            <div className='msg'>Message: {e.message}</div>
                    </div>
            })}
        </div>
    </div>
  );
    }
}

export default Messages;
