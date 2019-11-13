import React from 'react';
import './addAlert.css'
import {addAlertToDb} from '../config/firebase'
import Swal from 'sweetalert2'
import Loader from 'react-loader'

 class AddAlert extends React.Component {
    state={
        alerttext:'',
        alertdate:'',
        loaded:true
    }
addAlert(){
    this.setState({loaded:false})
    console.log('adding alert');
    const {alerttext,alertdate} = this.state;
    if(alerttext!==' '&&alerttext!==''&&alertdate!==''&&alertdate!==' ' ){
        
    addAlertToDb(alerttext,alertdate)
    .then((succ)=>{
        console.log(succ);
        console.log("alert added");
        this.setState({loaded:true,alertdate:'',alerttext:''});
        Swal.fire({
            title: 'Success!',
            text:'Alert Added Successfully',
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
                Add Alert
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='alert-form-div'>
                <div className='alert-input-div'>
                    <textarea onChange={(e)=>this.setState({alerttext:e.target.value})} placeholder='Enter Alert Text Here' className='alert-input' rows='4'></textarea>
                </div>
                <div className='alert-date-div'>
                    <input onChange={(e)=>this.setState({alertdate:e.target.value})} className='alert-date' type='text' placeholder='Enter Alert Date here' />
                </div>
                <div className='alert-btn-div'>
                    <button onClick={this.addAlert.bind(this)} className='alert-btn'>
                        Add Alert
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddAlert;
