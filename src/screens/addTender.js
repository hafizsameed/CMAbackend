import React from 'react';
import './addAlert.css'
import {addTenderToDb} from '../config/firebase'
import Swal from 'sweetalert2'
import Loader from 'react-loader'

 class AddTender extends React.Component {
    state={
        tendertext:'',
        tenderdate:'',
        loaded:true,
    }
addTender(){
    this.setState({loaded:false})
    console.log('adding Notification');
    const {tendertext,tenderdate} = this.state;
    if(tendertext!==' '&&tendertext!==''&&tenderdate!==''&&tenderdate!==' ' ){
        
    addTenderToDb(tendertext,tenderdate)
    .then((succ)=>{
        console.log(succ);
        console.log("notification added");
        this.setState({loaded:true,tenderdate:'',tendertext:''});
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
                Add Job And Tender Notification
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='alert-form-div'>
                <div className='alert-input-div'>
                    <textarea value={this.state.tendertext} onChange={(e)=>this.setState({tendertext:e.target.value})} placeholder='Enter Notification Text Here' className='alert-input' rows='4'></textarea>
                </div>
                <div className='alert-date-div'>
                    <input value={this.state.tenderdate} onChange={(e)=>this.setState({tenderdate:e.target.value})} className='alert-date' type='text' placeholder='Enter Notification Date here' />
                </div>
                <div className='alert-btn-div'>
                    <button onClick={this.addTender.bind(this)} className='alert-btn'>
                        Add Notification
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddTender;
