import { Button,TextField,Form,Card} from "@shopify/polaris";
import axios from "axios";
import React,{useEffect, useState} from "react";
import Font_family_setting from "./Font_family_setting";
import DropZoneExample from "./Icon-Upload";
const LeftSidebar = () =>{
  const store_url = shopDomain;
  const [profile, setProfile] = useState('Profile Information')
  const [address, setAddress] = useState('Management Address')
  const [orders, setOrders] = useState('Orders')
  const [gift, setGift] = useState('Gift Cards')
  const [coupons, setCoupons] = useState('My Coupons')

    useEffect(()=>{
    getData();
    },[]);
    
    
    const getData =()=>{
    axios.get(`${UrlHttp}/sidebar?name=${store_url}`).then(res=>{
    const data=res.data;  
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.label_type=='profile')setProfile(element.sidebar_label);
        if(element.label_type=='addresses')setAddress(element.sidebar_label);
        if(element.label_type=='orders')setOrders(element.sidebar_label);
        if(element.label_type=='gift')setGift(element.sidebar_label);
        if(element.label_type=='coupons')setCoupons(element.sidebar_label);
        }
    });  
    }
    
    const Insert = (e) =>{
      e.preventDefault();
      const dataSidbar=[
        {id: 0, value:profile, type: "profile"},
        {id: 1, value:address, type: "addresses"},
        {id: 2, value:orders, type: "orders"},
        {id: 3, value:gift, type: "gift"},
        {id: 4, value:coupons, type: "coupons"},
      ]
    for(let index = 0; index <dataSidbar.length; index++) {
      const data = new FormData();
      data.append("label",dataSidbar[index].value)
      data.append("type",dataSidbar[index].type)
      data.append("store_url",store_url)
      axios.post(`${UrlHttp}/insert-sidebar`,data).then(res=>{
      if(dataSidbar[index].id==4)alert(res.data),
      getData();   
      });
    }
    }
  
  
    return(
      <div>
       <Card title = "Left Sidebar">  
       <Card.Section>           
      <Card>
        <Card.Section>
                <Form>                                    
                <TextField                                                                 
                label={`Defaults to: the sidebar name is ${profile}`}
                name="profile"
                type="text"   
                placeholder={`Defaults to: the sidebar name is ${profile}.`}               
                value={profile}
                onChange = {(e)=>setProfile(e)}
                connectedRight={<Button submit onClick={Insert}>Update</Button>}                       
                />
                </Form>
                <Form>
                <TextField                                      
                label={`Defaults to: the sidebar name is ${address}.`}
                name="address"
                type="text"
                placeholder={`Defaults to: the sidebar name is ${address}.`}               
                value={address}
                onChange = {(value)=>setAddress(value)}
                connectedRight={<Button submit onClick={Insert}>Update</Button>   }                                                  
                />  
                </Form>
                <Form>
                <TextField                                      
                label={`Defaults to: the sidebar name is ${orders}.`}
                name="orders"
                type="text"
                placeholder={`Defaults to: the sidebar name is ${orders}.`}               
                value={orders}
                onChange = {(value)=>setOrders(value)}
                connectedRight={<Button submit onClick={Insert}>Update</Button>   }                                                  
                />  
                </Form>
                <Form>                                                               
                <TextField                                                                 
                label={`Defaults to: the sidebar name is ${gift}.`}
                name="gift"
                type="text"
                placeholder={`Defaults to: the sidebar name is ${gift}.`}               
                value={gift}
                onChange = {(value)=>setGift(value)}
                connectedRight={<Button submit onClick={Insert}>Update</Button>   }                       
                />
                </Form>
                <Form>
                <TextField                                      
                label={`Defaults to: the sidebar name is ${coupons}.`}
                name="coupons"
                type="text"
                placeholder={`Defaults to: the sidebar name is ${coupons}.`}               
                value={coupons}
                onChange = {(value)=>setCoupons(value)}
                connectedRight={<Button submit onClick={Insert}>Update</Button>   }                       
                />                                                                                                                                                                              
                </Form>      
        </Card.Section>
      </Card>
        </Card.Section>      
       </Card>
       <Card title = "Left Side Icon Setting">  
       <Card.Section>                    
      <DropZoneExample/>
        </Card.Section>      
       </Card>

       <Card title = "Font-family Setting">  
       <Card.Section>                    
      <Font_family_setting/>
        </Card.Section>      
       </Card>
       </div>
    )
}
export default LeftSidebar