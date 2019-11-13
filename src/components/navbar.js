import React from 'react';
import './navbar.css'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import {logoutfromfirebase} from '../config/firebase'
import Swal from 'sweetalert2'

class MyNavbar extends React.Component {
    logout(){
        console.log('logout');
        logoutfromfirebase()
        .then(()=>{
            localStorage.removeItem('user');
            Swal.fire({
                title: 'Success!',
                text:'Logged out successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
              .then(()=>{
                  this.props.history.push('/');
              })
        })
        .catch((e)=>{
            Swal.fire({
                title: 'Error!',
                text: 'Logging out failed',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        })
    }

    goto(path){
        this.props.history.push(path);
    }
    render(){
    return (
        <div className="navbar-div">
            <div className='navbar-top'>
                <div className='logo-div'>
                    <img className='logo-img' src='https://static.wixstatic.com/media/8011f8_903df46983f3413ba1a3db736da14a49~mv2.png/v1/fill/w_50,h_59,al_c,q_80,usm_0.66_1.00_0.01/Screenshot%202019-08-05%20at%2012_30_41%20PM.webp' />
                </div>
                <div className='title-btn-div'>
                    <div className='nav-title-div'>
                <div className='nav-title'>
                    Controller Millitary Accounts
                </div>
                <div className='nav-subtitle'>
                Quetta Command
                </div>
                </div>
                {localStorage.getItem('user')&&
                <div className='nav-btn-div'>
                    <button onClick={this.logout.bind(this)} className='nav-btn'>Logout</button>
                </div>
                }
                </div>
            </div>
            <div className='menu-div'>
                <Navbar style={{ width:'100%' }} expand="lg">
                    <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='collapse' id="basic-navbar-nav">
                        <Nav className="mr-auto bt-nav">
                            <Nav.Link  onClick={this.goto.bind(this,'/home')} className='links' href="#home">Home</Nav.Link>

                            {/* <NavDropdown className='dropdowns' title="About Us" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={this.goto.bind(this,'/aboutus/teamMembers')} className='dropLinks' href="#">Team Members</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/aboutus/humanResource')} className='dropLinks' href="#">Human Resource</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/aboutus/organizationsetup')} className='dropLinks' href="#">Organizational Setup</NavDropdown.Item>
                              
                            </NavDropdown>

                            <NavDropdown className='dropdowns' title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={this.goto.bind(this,'/services/preaudit')} className='dropLinks' href="#">Pre Audit</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/services/postaudit')} className='dropLinks' href="#">Post Audit</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/services/civilPension')} className='dropLinks' href="#">Civil Pension</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/services/internalaudit')} className='dropLinks' href="#">Internal Audit</NavDropdown.Item>
                                <NavDropdown.Item onClick={this.goto.bind(this,'/services/adminSection')} className='dropLinks' href="#">Admin Section</NavDropdown.Item>
                             
                            </NavDropdown> */}

                            <Nav.Link onClick={this.goto.bind(this,'/addalert')} className='links' href="#link">Add Alerts</Nav.Link>

                            <Nav.Link onClick={this.goto.bind(this,'/addorder')} className='links' href="#link">Add Order</Nav.Link>

                            <Nav.Link onClick={this.goto.bind(this,'/addpipfanotification')} className='links' href="#link">Add PIPFA Notification</Nav.Link>
                            
                            <Nav.Link onClick={this.goto.bind(this,'/addtendernotification')} className='links' href="#link">Add Job And Tender Notification</Nav.Link>

                            <Nav.Link onClick={this.goto.bind(this,'/addmedia')} className='links' href="#link">Add Media</Nav.Link>

                            <Nav.Link onClick={this.goto.bind(this,'/addVenture')} className='links' href="#link">Add Venture</Nav.Link>
                            
                            <Nav.Link onClick={this.goto.bind(this,'/messages')} className='links' href="#link">Messages</Nav.Link>

                            
                        </Nav>
                        
                    </Navbar.Collapse>

                </Navbar>
            </div>


        </div>
    ) 
     }
}

export default withRouter(MyNavbar);