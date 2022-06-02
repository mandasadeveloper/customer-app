import axios from "axios";
import React,{ useEffect, useState} from "react";
  const ManageAddress = ({UrlHttp,ShopDomain})=>{
  const customer_id = meta.page.customerId;
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState({});
  const [Customers, setCustomers] = useState('')
  const [countries, setCountries] = useState();
const onchangeInput = (e) =>{
const {name, value}=e.target;         
setAddress((preValue)=>{ 
return{...preValue,[name]:value,}})}

useEffect(() => {
getAddress();
axios.get('https://trial.mobiscroll.com/content/countries.json').then(res=>setCountries(res.data))
}, [])

const postUpadate = (value)=>{  
  if(value==-1)setAddress(address);
  if(value >= 0)setAddress(Customers.addresses[value]);
  setEdit(!edit)
}


const getAddress = ()=>{
axios.get(`${UrlHttp}/get-profile-store?store_name=${ShopDomain}&user_id=${customer_id}`).then(res=>{
setCustomers(res.data[0])
})
}

const postAddress=(e)=>{
  e.preventDefault();
  const address_details=new FormData();
  address_details.append('address',JSON.stringify(address));
  address_details.append('store_url',ShopDomain);
  axios.post(`${UrlHttp}/post-address`,address_details).then(res =>{
    getAddress();
    console.log(res.data);
    setEdit(!edit,setAddress({}))
});
}

  const Edit_svg= <svg style={{width:'20px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.13 25"><path d="M25.07,15.86v5.85A3.29,3.29,0,0,1,21.78,25H3.29A3.3,3.3,0,0,1,0,21.71V4.54A3.29,3.29,0,0,1,3.29,1.25H9.14a.66.66,0,1,1,0,1.31H3.29a2,2,0,0,0-2,2V21.71a2,2,0,0,0,2,2H21.78a2,2,0,0,0,2-2V15.86a.66.66,0,0,1,1.32,0Zm-11.67-1L23,5.21l-3.1-3.1L10.3,11.73ZM8.73,16.4l3.43-.95L9.68,13ZM23.88.48a1.65,1.65,0,0,0-2.33,0l-.7.7L24,4.28l.7-.7a1.64,1.64,0,0,0,0-2.33Z"></path></svg>
  return(
  <div>
  <div className="center-div" style={{position:"relative"}}>
  <div><h3 className="user-info-edit" style={{textAlign:"center"}}>Addresses</h3></div>
  <button className="button-edit" style={{right:"28px"}} onClick={()=>setEdit(!edit,setAddress({}))}>{edit?<svg style={{width:'15px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path id="Layer_2" data-name="Layer 2" d="M12.5,0A12.5,12.5,0,1,0,25,12.5,12.5,12.5,0,0,0,12.5,0Zm0,24.2A11.7,11.7,0,1,1,24.2,12.5,11.65,11.65,0,0,1,12.5,24.2ZM18.2,6.8a.38.38,0,0,0-.6,0h0l-5.1,5.1L7.4,6.8a.37.37,0,0,0-.6,0,.38.38,0,0,0,0,.6h0l5.1,5.1L6.8,17.6a.38.38,0,0,0,0,.6.37.37,0,0,0,.6,0h0l5.1-5.1,5.1,5.1a.37.37,0,0,0,.6,0h0a.37.37,0,0,0,0-.6l-5.1-5.1,5.1-5.1a.38.38,0,0,0,0-.6Z"></path></svg>:""}</button>
  {
    !edit?
    <div className="parant-box">
    <div className="flex-box" ><div className="address-btn" onClick={()=>postUpadate(-1)}><img src="https://img.icons8.com/emoji/2x/plus-emoji.png"/><p style={{textAlign:"center"}}>{!edit?"Add New Address":""}</p></div></div>       
    {
      Customers&&Customers.addresses.map((user,index)=>{
      return(
      <div key={index} className="flex-box" >
      <div>
      <div><span style={{right:"50px"}} onClick={()=>postUpadate(index)}></span><span onClick={()=>postUpadate(index)}>{Edit_svg}</span></div>
      <p><span>{user.first_name}</span><span>{user.last_name}</span></p>
      <p>{user.id}</p>
      <p>{user.company}</p>
      <p>{user.address1}</p>
      <p>{user.address2}</p>
      <p>{user.country}</p>
          </div>
          </div>
        )
        })
      }
       </div>:
      <form style={{padding: "3%"}} onSubmit={postAddress}> 
         <div className="row"> 
         <div className="col-50">
        <label htmlFor="id">Customer Id</label>
          <input type="text" id="id" name="customer_id" value={address.customer_id=customer_id} disabled/>
        </div>    
          <div className="col-50">
        <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="first_name" value={address.first_name} onChange={onchangeInput}/>
        </div> 
        <div className="col-50">
        <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" name="last_name" value={address.last_name} onChange={onchangeInput}/>
        </div> 
          <input type="hidden" name="id" value={address.id} disabled/>
        </div>          
        <div className="col-100">
        <label htmlFor="company">company</label>
          <input type="text" id="company" value={address.company} name="company"  onChange={onchangeInput}/>
        </div>   
        <div className="col-100">
        <label htmlFor="address1">Address1</label>
          <input type="text" id="address1" value={address.address1} name="address1"  onChange={onchangeInput}/>
        </div>   
        <div className="col-100">
        <label htmlFor="address2">Address2</label>
          <input type="text" id="address2" value={address.address2} name="address2"  onChange={onchangeInput}/>
        </div>    
        <div className="row">     
          <div className="col-75">
        <label htmlFor="fname">City</label>
          <input type="text" id="fname" name="city" value={address.city} onChange={onchangeInput}/>
        </div> 
        <div className="col-75">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" onChange={onchangeInput}>
        {countries&&countries.map((country,index)=>{
         return <option key={index} value={country.text}>{country.text}</option>
        })}
        </select>
        </div>  
        </div>   
        <div className="col-100">
        <label htmlFor="Province">Province</label>
          <input type="text" id="Province" name="province"  value={address.province} onChange={onchangeInput}/>
        </div>    
        <div className="col-100">
        <label htmlFor="zip">Postal/Zip Code</label>
          <input type="text" id="zip" name="zip"  value={address.zip} onChange={onchangeInput}/>
        </div>   
        <div className="col-100">
        <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone"  value={address.phone} onChange={onchangeInput}/>
        </div>   
      { edit?
        <div className="col-100">   
          <input type="submit" value="Upload"/>
        </div>
        :null}
    </form>  
    }
    </div>
</div>
 )
}
export default ManageAddress