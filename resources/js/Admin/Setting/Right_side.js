import { Button,TextField,Form,Card } from "@shopify/polaris";
import axios from "axios";
import React,{useEffect, useState} from "react";
const RightSide = () =>{
    const [fname, setFname] = useState('First Name')
    const [lname, setLname] = useState('Last Name')
    const [email, setEmail] = useState('Email') 
    useEffect(()=>{
    getData();
    },[]);


    const getData =()=>{
    axios.get(`${UrlHttp}/label-setting?name=${shopDomain}`).then(res=>{
    const data=res.data[0];  
    if(data.fname)setFname(data.fname);else setFname(fname);
    if(data.lname)setLname(data.lname);else setLname(lname);
    if(data.email)setEmail(data.email);else setEmail(email);
    });  
    }


  
    const Insert = (e) =>{
    e.preventDefault();  
    const data=new FormData;
    data.append('fname',fname),      
    data.append('lname',lname),      
    data.append('email',email),      
    data.append('store_url',shopDomain),      
    axios.post(`${UrlHttp}/insert-label`, data).then(res =>{
    alert(res.data),
    getData();
    });
    }
  
    
    return(
       <Card title="Profile">  
       <Card.Section>      
      <Card>
        <Card.Section>
        <Form>                                    
          <TextField  label={`Defaults to:${fname}.`} name="fname" type="text" value={fname} 
           onChange = {(value)=>setFname(value)}connectedRight={<Button submit onClick={Insert}>Update</Button>}/>
        </Form>
        <Form>
          <TextField label={`Defaults to:${lname}.`} name="lname" type="text" value={lname}
           onChange = {(value)=>setLname(value)} connectedRight={<Button submit onClick={Insert}>Update</Button>}/>  
        </Form>
        <Form>
          <TextField label={`Defaults to:${email}.`} name="email" type="text" value={email}
           onChange = {(value)=>setEmail(value)} connectedRight={<Button submit onClick={Insert}>Update</Button>}/>               
        </Form>               
            </Card.Section></Card>  
        </Card.Section>
       </Card>
    )
}
export default RightSide

