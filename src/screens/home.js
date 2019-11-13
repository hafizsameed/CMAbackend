import React from 'react';
import './home.css'


 class Home extends React.Component {
  
    goto(path){
        this.props.history.push(path);
    }

    render(){
    return (
    <div className='home-main-div'>
        <div className='head-div'>
            <div className='head-text'>
                Hi, Admin
            </div>
        </div>
        <div className='home-sec-div'>
            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/addalert')} className='home-btn'>Add Alert</button>
            </div>

            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/addorder')} className='home-btn'>Add Order</button>
            </div>

            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/addpipfanotification')} className='home-btn'>Add PIPFA Notification</button>
            </div>

            <div className='home-btn-div'>
                <button  onClick={this.goto.bind(this,'/addmedia')} className='home-btn'>Add Media</button>
            </div>

            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/addtendernotification')} className='home-btn'>Add Tender & Job Notification</button>
            </div>
            
            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/addventure')} className='home-btn'>Add Venture</button>
            </div>
            
            <div className='home-btn-div'>
                <button onClick={this.goto.bind(this,'/messages')} className='home-btn'>Messages</button>
            </div>
        </div>
    </div>
  );
    }
}

export default Home;
