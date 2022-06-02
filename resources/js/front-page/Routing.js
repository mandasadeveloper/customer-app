import {Route,Switch } from "react-router";
import Profile_page from "./Profile";
import ManageAddress from "./Manage_address";
import GiftCards from "./Gift_cards";
import MyCoupons from "./My_coupons";
import React from "react"
import Orders from "./orders/orders";
const Routing=({UrlHttp,ShopDomain})=>{
return(
    <Switch>
    <Route exact path="/profile"><Profile_page UrlHttp={UrlHttp} ShopDomain={ShopDomain}/></Route>  
    <Route path="/addresses"><ManageAddress UrlHttp={UrlHttp}  ShopDomain={ShopDomain}/></Route>  
    <Route path="/orders"><Orders UrlHttp={UrlHttp} ShopDomain={ShopDomain}/></Route>  
    <Route path="/gift"><GiftCards/></Route>
    <Route path="/coupons"><MyCoupons/></Route>
   </Switch>     
)
}
export default Routing