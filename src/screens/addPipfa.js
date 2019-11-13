import React from 'react';
import './addAlert.css'
import {addNotificationToDb} from '../config/firebase'
import Swal from 'sweetalert2'
import Loader from 'react-loader'

 class AddPipfa extends React.Component {
    state={
        pipfatext:'',
        pipfadate:'',
        loaded:true
    }
addPipfa(){
    this.setState({loaded:false})
    console.log('adding Notification');
    const {pipfatext,pipfadate} = this.state;
    if(pipfatext!==' '&&pipfatext!==''&&pipfadate!==''&&pipfadate!==' ' ){
        
    addNotificationToDb(pipfatext,pipfadate)
    .then((succ)=>{
        console.log(succ);
        console.log("notification added");
        this.setState({loaded:true,pipfadate:'',pipfatext:''});
        Swal.fire({
            title: 'Success!',
            text:'Notification Added Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
    })
    .catch((e)=>{
        this.setState({loaded:true})
        Swal.fire({
            title: 'Failed!',
            text:e.message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
    });
}
else{
    this.setState({loaded:true})
    Swal.fire({
        title: 'Failed!',
        text: 'Fields cannot be empty please enter something',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}


    render(){
    return (
    <div className='home-main-div'>
        <div className='head-div'>
            <div className='head-text'>
                Add PIPFA Notification
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='alert-form-div'>
                <div className='alert-input-div'>
                    <textarea value={this.state.pipfatext} onChange={(e)=>this.setState({pipfatext:e.target.value})} placeholder='Enter Notification Text Here' className='alert-input' rows='4'></textarea>
                </div>
                <div className='alert-date-div'>
                    <input value={this.state.pipfadate} onChange={(e)=>this.setState({pipfadate:e.target.value})} className='alert-date' type='text' placeholder='Enter Notification Date here' />
                </div>
                <div className='alert-btn-div'>
                    <button onClick={this.addPipfa.bind(this)} className='alert-btn'>
                        Add PIPFA Notification
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddPipfa;
