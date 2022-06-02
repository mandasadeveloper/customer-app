import { Button, Card, Layout, Page, ResourceList, TextStyle, Thumbnail } from '@shopify/polaris';
import axios from 'axios';
import React, { useEffect,useState } from 'react';

const Orders = ()=>{

useEffect(() => {
  getOrders();
}, []);

const [AllOrders, setAllOrders] = useState([
  {id:0,title:"Order-1",name:"#1001",date:"1-2-22",customer_name:"shubham",total:"1",granttotal:"12345"},
  {id:1,title:"Order-2",name:"#1002",date:"1-3-22",customer_name:"aditya",total:"2",granttotal:"1256"},
  {id:2,title:"Order-3",name:"#1003",date:"1-4-22",customer_name:"santosh",total:"3",granttotal:"23456"},
  {id:3,title:"Order-4",name:"#1004",date:"1-5-22",customer_name:"jaipal",total:"4",granttotal:"13456"},
]);

const getOrders= ()=>{
  axios.get("https://electronicbiz.myshopify.com/admin/orders.json").then(res=>
  console.log(res.data)
  )
}



const [show, setShow] = useState(false);

  return  <Page                                          
  title="Orders"      
  >     
  </Page>
}

export default Orders;
