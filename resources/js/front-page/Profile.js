import axios from "axios";
import React,{ useState,useEffect } from "react";
const Profile_page = ({UrlHttp,ShopDomain})=>{
  const customer_id = meta.page.customerId;
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true)
  const [Customers, setCustomers] = useState({})
  const [getLabel, setGetLabel] = useState()
  const [ProfileField, setProfileField] = useState([
  {id:1,label:"First Name",name:'fname'}, 
  {id:2,label:"Last Name",name:'lname'},
  {id:3,label:"Email",name:'email'},
  ])
  const [fetchField, setFetchField]=useState([]); // data access in webpage
  const Edit_svg= <svg style={{width:'15px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.13 25">
    <path d="M25.07,15.86v5.85A3.29,3.29,0,0,1,21.78,25H3.29A3.3,3.3,0,0,1,0,21.71V4.54A3.29,3.29,0,0,1,3.29,1.25H9.14a.66.66,0,1,1,0,1.31H3.29a2,2,0,0,0-2,2V21.71a2,2,0,0,0,2,2H21.78a2,2,0,0,0,2-2V15.86a.66.66,0,0,1,1.32,0Zm-11.67-1L23,5.21l-3.1-3.1L10.3,11.73ZM8.73,16.4l3.43-.95L9.68,13ZM23.88.48a1.65,1.65,0,0,0-2.33,0l-.7.7L24,4.28l.7-.7a1.64,1.64,0,0,0,0-2.33Z"></path>
    </svg>

  const handleChange = (e)=>{
    const {name,value}= e.target;
    setCustomers((preValue)=>{
    console.log(preValue);
      return{
         ...preValue,
        [name]:value,
      }
    })
  }

    useEffect(()=>{
    getCustomers_details();
    },[]);

   const getCustomers_details = ()=>{
    axios.get(`${UrlHttp}/get-profile-store?store_name=${ShopDomain}&user_id=${customer_id}`).then(res=>{
      const customer_data=res.data;
      if(!customer_data[1][0]){
      setCustomers({
      0:customer_data[0].first_name,
      1:customer_data[0].last_name,
      2:customer_data[0].email,        
      })
      }
      else setCustomers(customer_data[1]);          
    });
    axios.get(`${UrlHttp}/get-fields?name=${ShopDomain}`).then(res=>{
    setFetchField(res.data);              
    });
    axios.get(`${UrlHttp}/getdrag?name=${ShopDomain}`).then(res=>{
    setProfileField(JSON.parse(res.data['drag-value'])); 
    });

    axios.get(`${UrlHttp}/label-setting?name=${ShopDomain}`).then(res=>{
    setGetLabel([
      res.data[0].fname, 
      res.data[0].lname,
      res.data[0].email]) 
    });
  }
const handleSubmit=(e)=>{
  e.preventDefault();
  const data={
      id:customer_id,
      store_url:ShopDomain,
      first_name:Customers[0],
      last_name:Customers[1],
      email:Customers[2],
      fields:JSON.stringify(Customers)
  }
  axios.post(`${UrlHttp}/customer-details`,data).then(res=>alert(res.data));
}   

 return(
<div>
    <form className="form-data">
    <p className="button-edit" onClick={()=>setEdit(!edit,setDisable(false))}>{edit?<svg style={{width:'15px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path id="Layer_2" data-name="Layer 2" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm0,24.2A11.7,11.7,0,1,1,24.2,12.5,11.65,11.65,0,0,1,12.5,24.2ZM18.2,6.8a.38.38,0,0,0-.6,0h0l-5.1,5.1L7.4,6.8a.37.37,0,0,0-.6,0,.38.38,0,0,0,0,.6h0l5.1,5.1L6.8,17.6a.38.38,0,0,0,0,.6.37.37,0,0,0,.6,0h0l5.1-5.1,5.1,5.1a.37.37,0,0,0,.6,0h0a.37.37,0,0,0,0-.6l-5.1-5.1,5.1-5.1a.38.38,0,0,0,0-.6Z"></path></svg>:Edit_svg}</p>
       <div>      
              {ProfileField&&ProfileField.map((field,index)=>{
              return(<div className="col-100">
              <label htmlFor={index}>{getLabel&&getLabel?getLabel[field.id]:field.label}</label>
              <input type="text" id={index} name={field.id} value={Customers[field.id]} onChange={handleChange} disabled={field.name=='email'?true:disable}/>
              </div>)})}

              {fetchField.map((item,val)=>{  
              const specialvalue = item.field.replace(/['"]+/g, '')
              const button = JSON.parse(item.field);
              if(button[1]=='radio'||button[1]=='checkbox'){
              return(
              <div className="col-100" style={{position:"relative"}}>
              <p style={{paddingTop:"4.7%"}}>{item.label}</p>
              <div style={{marginTop:'3%'}}>
              {button[0].map((user,i)=>{
              return <><input type={button[1]} id={user.value} value={[user.value]} name={item.label} onChange={handleChange} disabled={disable}/><label htmlFor={user.value}>{user.value}</label></>
            })}
              </div> 
              </div>)
              }
              if(button==='textarea'){  
              return(
              <div className="col-100">
              <label htmlFor="w3review">{item.label}</label><br/>
              <textarea onChange={handleChange} id="w3review" value={Customers[item.label]} name={item.label} disabled={disable}/>
              </div> 

              )
              }
              return (                         
              <div className="col-100">
              <label htmlFor="1">{item.label}</label>
              <input type={specialvalue} onChange={handleChange} id="1" value={Customers[item.label]} name={item.label} disabled={disable}/>
              </div> 
              )})}       
    </div>      
    { edit?
      <div>   
        <input onClick={handleSubmit} type="submit" value="Save"/>
      </div>
      :null}
  </form>  
</div>
 )
}
export default Profile_page