import axios from "axios";
import React,{useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Routing from "./Routing";
import profile from "./icons/01.png";
import address from "./icons/02.png";
import orders from "./icons/02.png";
import gift from "./icons/03.png";
import coupons from "./icons/04.png"
export default function Slidebar() { 
  // const UrlHttp ="https://pscadda.com/LAHIVE/customer_app/api";
  // const iconurl = 'https://pscadda.com/LAHIVE/customer_app/icon/';
  // const icon = "https://pscadda.com/LAHIVE/customer_app";

  let UrlHttp ="http://127.0.0.1:8000/api";
  const iconurl = "http://127.0.0.1:8000/icon/";
  const icon = "http://127.0.0.1:8000";
  const ShopDomain=window.location.hostname;
  const customer_id = meta.page.customerId;
  const [getIcon, setgetIcon] = useState();
  const [DataValue, setDataValue] = useState({
    profile:icon+profile,
    address:icon+address,
    orders:icon+orders,
    gift:icon+gift,
    coupons:icon+coupons,
  })
  const [Customer, setCustomer] = useState("");
  const [getFont, setGetFont] = useState();
  const [fetchField, setFetchField]=useState([
  {id: 1, sidebar_label: "Profile Information", label_type: "profile"},
  {id: 2, sidebar_label: "Manage Address", label_type: "addresses"},
  {id: 3, sidebar_label: "My Orders", label_type: "orders"},
  {id: 4, sidebar_label: "Gift Cards", label_type: "gift"},
  {id: 5, sidebar_label: "My Coupons", label_type: "coupons"},
  ]);   // data access in webpage

  useEffect(()=>{ 
  getData(); 
  getCustomers();
  getIcondatabase();
  getFontFamily();
  },[]);

  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const UpdateTime = ()=>{
    time= new Date().toLocaleTimeString();
    setCtime(time);
  }
  setInterval(UpdateTime,1000)
  const getIcondatabase =()=>{
    axios.get(`${UrlHttp}/geticon?name=${ShopDomain}`).then(res=>{
      const data=res.data;  
      for (let index = 0; index < data.length; index++){
          if(data[index].label=='profile'){DataValue.profile=iconurl+data[index].icon}
          if(data[index].label=='addresses'){DataValue.address=iconurl+data[index].icon}
          if(data[index].label=='orders'){DataValue.orders=iconurl+data[index].icon}
          if(data[index].label=='gift'){DataValue.gift=iconurl+data[index].icon}
          if(data[index].label=='coupons'){DataValue.coupons=iconurl+data[index].icon}
    }
    setgetIcon([
      {id: 0, value:DataValue.profile, label: "profile"},
      {id: 1, value:DataValue.address, label: "addresses"},
      {id: 2, value:DataValue.orders, label: "orders"},
      {id: 3, value:DataValue.gift, label: "gift"},
      {id: 4, value:DataValue.coupons, label: "coupons"},
    ]);});}
   const getFontFamily =()=>{
    axios.get(`${UrlHttp}/getFontFamily?name=${ShopDomain}`).then(res=>{
          setGetFont(res.data);  
    });  
   }

 const getCustomers = ()=>{
    axios.get(`${UrlHttp}/get-profile-store?store_name=${ShopDomain}&user_id=${customer_id}`).then(res=>{
      const customer_data=res.data[0];
      setCustomer(customer_data);          
    });
  }

 const getData =()=>{
   axios.get(`${UrlHttp}/sidebar?name=${ShopDomain}`).then(res=>{
        setFetchField(res.data);  
   });   
 }
return (
      <div className="content-container" style={{fontFamily:getFont&&getFont?getFont.font_family:'"Gill Sans Extrabold", sans-serif'}}>
      <div id="left-panel" className="left-nav-wrapper">
        <div className="profile-head">
          <div className="profile-logo">
          <img src={getIcon&&getIcon[0].value} width={50}/>
          </div>
          <div className="profile-name">
            <h4>{Customer.first_name}<p>{ctime}</p></h4>
          </div>
        </div>
          <ul className="navigation-panel">
            {fetchField.map((sidebar,index)=>{
            return <li key={index}><Link to ={`/${sidebar.label_type}`}><img src={getIcon&&getIcon[index].value} width={30}/><p>{sidebar.sidebar_label}</p></Link></li>                                                     
            })}                   
          </ul>         
      </div>
      <div className="right-content-wrapper container">
      <div>
      </div>
      <div className="right-content">
      <Routing UrlHttp={UrlHttp} ShopDomain={ShopDomain}/>   
      </div>          
      </div>
  </div>
    );
  }