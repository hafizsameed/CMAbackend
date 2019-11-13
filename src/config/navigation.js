import React , {Component} from 'react'
import * as Routes from '../screens/index'
import MyNavbar from '../components/navbar'
import { BrowserRouter as Router , Route, Link} from 'react-router-dom'
import PrivateRoute from './privateroute'
export default class Navigation extends Component{
state={
    dashboard:false,
    RestDashboard:false
}
    render(){
    console.log(this.state,'navigation prosp')
    return(
        <Router>
           <MyNavbar/>
            <div>
                <Route exact path='/' component={Routes.Signin}/>
                <PrivateRoute path='/home' component={Routes.Home}/>
                <PrivateRoute path='/addalert' component={Routes.AddAlert}/>
                <PrivateRoute path='/addorder' component={Routes.AddOrder}/>
                <PrivateRoute path='/addpipfanotification' component={Routes.AddPipfa}/>
                <PrivateRoute path='/addtendernotification' component={Routes.AddTender}/>
                <PrivateRoute path='/addmedia' component={Routes.AddMedia}/>
                <PrivateRoute path='/addventure' component={Routes.AddVenture}/>
                <PrivateRoute path='/messages' component={Routes.Messages}/>
                {/* <Route path='/dashboard' render={(props)=><Dashboard {...props} dashboardon={()=>{this.setState({dashboard:true,RestDashboard:true})}} dashboardoff={()=>{
                    console.log('dashboard on');
                    this.setState({dashboard:false})}}/>} /> */}
                {/* <Route exact path='/RestaurantDashboard' render={(props)=><RestaurantDashboard {...props} RestDashboardon={()=>{this.setState({RestDashboard:true,dashboard:true})}} restdashboardoff={()=>{this.setState({RestDashboard:false})}}/>}/> */}
                </div> 
        </Router>
    )
}

}