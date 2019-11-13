import React from 'react';
import './addMedia.css'
import Swal from 'sweetalert2'
import Loader from 'react-loader'
import firebase from '../config/firebase'
import ProgressBar from 'react-bootstrap/ProgressBar'
 class AddVenture extends React.Component {
    state={
        venturetitle:'',
        venturedetail:'',
        loaded:true,
        photo:''
    }


async addVenture(){
    var arr=[];
    this.setState({loaded:false})
    console.log('adding Venture');
    const {photo,venturedetail,venturetitle} = this.state;
    if(photo!==''&& photo!==" " && venturedetail!==' '&&venturedetail!==''&& venturetitle!==' '&& venturetitle!==''){  
        console.log(photo,'photo');
        firebase.storage().ref('/venture/'+photo.name).put(photo)
        .then((snapshot)=>{
            snapshot.ref.getDownloadURL()
            .then((durl)=>{
                firebase.firestore().collection('ventures').add({venturetitle,venturedetail,photo:durl})
                .then((succ)=>{
                    this.setState({loaded:true,venturedetail:'',venturetitle:''});
                    Swal.fire({
                        title: 'Success!',
                        text: 'Venture added',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                      })
                })
                .catch((e)=>{
                    Swal.fire({
                        title: 'Error!',
                        text: e.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                })
            })
        })

       
    }
    else{
        this.setState({loaded:true})
        Swal.fire({
            title: 'Error!',
            text: 'Fields cannot be left empty',
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
                Add Venture
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='add-media-form alert-form-div'>
                <div className='alert-date-div'>
                    <input value={this.state.venturetitle} onChange={(e)=>this.setState({venturetitle:e.target.value})} className='alert-date' type='text' placeholder='Enter Title here' />
                </div>
                <div className='alert-input-div'>
                    <textarea value={this.state.venturedetail} onChange={(e)=>this.setState({venturedetail:e.target.value})} placeholder='Enter Detail Text Here' className='alert-input' rows='4'></textarea>
                </div>

                <div className='media-files-div'>
                    <div style={{padding:20,fontWeight:'bold'}}>Select Photo: </div>
                    <input  onChange={(e)=>{
                        console.log(e.target.files,'file');
                        this.setState({photo:e.target.files[0]})}} type='file' multiple/>
                </div> 
                <div className='alert-btn-div'>
                    <button onClick={this.addVenture.bind(this)} className='alert-btn'>
                        Add Venture
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddVenture;
