import React from 'react';
import './addMedia.css'
import Swal from 'sweetalert2'
import Loader from 'react-loader'
import firebase from '../config/firebase'
import ProgressBar from 'react-bootstrap/ProgressBar'
 class AddMedia extends React.Component {
    state={
        tendertext:'',
        tenderdate:'',
        loaded:true,
        photos:[],
        albumName:''
    }

 uploadImage(imageFile){
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref("/media/"+imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed', 
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                // uploader.value = percentage;
                console.log(percentage);
            },
            function error(err){
                console.log(err,'err')
                reject(err);
            },
            function complete(){
                task.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url,'download url');
                    resolve(url);    
                });
                }
        );
    });
}

async addMedia(){
    var arr=[];
    this.setState({loaded:false})
    console.log('adding media');
    const {photos,albumName} = this.state;
    if(photos.length!==0 && albumName!==' '&& albumName!==''){  
        console.log(photos,'photos');
        for(var i=0;i<photos.length;i++){
          arr[i] = await this.uploadImage(photos[i])
            
        }
        console.log(arr,'arr');
        firebase.firestore().collection('media').add({albumName,photos:arr})
        .then((succ)=>{
            this.setState({loaded:true});
            Swal.fire({
                title: 'Success!',
                text: 'Album Uploaded',
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
    }
    else if(photos.length==0){
        this.setState({loaded:true})
        Swal.fire({
            title: 'Error!',
            text: 'No Photo Uploaded',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    else if(albumName===''&&albumName===' '){
       this.setState({loaded:true})
        Swal.fire({
            title: 'Error!',
            text: 'Album Name Missing',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    else{
        this.setState({loaded:true})
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong',
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
                Add Media
            </div>
        </div>
        <div className='home-sec-div'>
            <Loader loaded={this.state.loaded}/>
           <div className='add-media-form alert-form-div'>
                <div className='alert-date-div'>
                    <input value={this.state.albumName} onChange={(e)=>this.setState({albumName:e.target.value})} className='alert-date' type='text' placeholder='Enter Album Name here' />
                </div>
                <div className='media-files-div'>
                    <div style={{padding:20,fontWeight:'bold'}}>Select Photos: </div>
                    <input onChange={(e)=>{
                        console.log(e.target.files,'file');
                        this.setState({photos:e.target.files})}} type='file' multiple/>
                </div> 
                <div className='alert-btn-div'>
                    <button onClick={this.addMedia.bind(this)} className='alert-btn'>
                        Add Media
                    </button>
                </div>
           </div>
        </div>
    </div>
  );
  }
    
}

export default AddMedia;
