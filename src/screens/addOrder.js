import React from 'react';
import './addAlert.css'
import {addOrderToDb} from '../config/firebase'
import Swal from 'sweetalert2'
import Loader from 'react-loader'

 class AddOrder extends React.Component {
    state={
        ordertext:'',
        orderdate:'',
        loaded:true
    }
addOrder(){
    this.setState({loaded:false})
    console.log('adding order');
    const {ordertext,orderdate} = this.state;
    if(ordertext!==' '&&ordertext!==''&&orderdate!==''&&orderdate!==' ' ){
        
    addOrderToDb(ordertext,orderdate)
    .then((succ)=>{
        console.log(succ);
        console.log("order added");
        this.setState({loaded:true,orderdate:'',ordertext:''});
        Swal.fire({
            title: 'Success!',
            text:'Order Added Successfully',
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
                Add Order
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='alert-form-div'>
                <div className='alert-input-div'>
                    <textarea value={this.state.ordertext} onChange={(e)=>this.setState({ordertext:e.target.value})} placeholder='Enter Order Text Here' className='alert-input' rows='4'></textarea>
                </div>
                <div className='alert-date-div'>
                    <input value={this.state.orderdate} onChange={(e)=>this.setState({orderdate:e.target.value})} className='alert-date' type='text' placeholder='Enter Order Date here' />
                </div>
                <div className='alert-btn-div'>
                    <button onClick={this.addOrder.bind(this)} className='alert-btn'>
                        Add Order
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddOrder;
