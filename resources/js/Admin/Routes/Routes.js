import React from "react";
import {Route, Switch} from "react-router";
import Manage_Address from "../ManageAddress/Manage_Address";
import Error from "../Error"
import Gift from "../Gift-Card/Gift";
import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import Admin_setting from "../Setting/Admin_setting";
import Setting from "../Setting/Setting";
import Orders from "../Orders/Orders";
import Wishlist from "../Wishlist/Wishlist";
const FrameExample=()=>{
return(
    <Switch>     
    <Route exact path="/"><Dashboard/></Route>
    <Route path="/gift"><Gift/></Route>
    <Route path="/manage-address"><Manage_Address/></Route>
    <Route path="/translations"><Admin_setting/></Route>
    <Route path="/profile"><Profile/></Route> 
    <Route path="/orders"><Orders/></Route>
    <Route path="/wishlist"><Wishlist/></Route>
    <Route path="/setting"><Setting /></Route>   
    <Route component={Error}/>    
   </Switch>     
)
}
export default FrameExample