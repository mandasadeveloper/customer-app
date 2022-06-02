import {Button, Card, DropZone, Stack, Thumbnail, Tooltip } from "@shopify/polaris";
import axios from "axios";
import React,{useCallback, useEffect, useState } from "react";
import profile from "./icons/01.png";
import address from "./icons/02.png";
import orders from "./icons/02.png";
import gift from "./icons/03.png";
import coupons_img from "./icons/04.png"

function DropZoneExample() {
    const [Profile_Icon, setProfile_Icon] = useState('');
    const [Address_Icon, setAddress_Icon] = useState('');
    const [Orders_Icon, setOrders_Icon] = useState('');
    const [Gift_Icon, setGift_Icon] = useState('');
    const [Coupons_Icon, setCoupons_Icon] = useState('');
    const [getProfile, setgetProfile] = useState(profile)
    const [getAddress, setgetAddress] = useState(address)
    const [getOrders, setgetOrders] = useState(orders)
    const [getGift, setgetGift] = useState(gift)
    const [getCoupons, setgetCoupons] = useState(coupons_img)
    const store_url = shopDomain;
    const ProfileDropZoneDrop = useCallback((acceptedFiles) =>setProfile_Icon(() => acceptedFiles[0]),[]);
    const AddressDropZoneDrop = useCallback((acceptedFiles) =>setAddress_Icon(() => acceptedFiles[0]),[]);
    const OrdersDropZoneDrop = useCallback((acceptedFiles) =>setOrders_Icon(() => acceptedFiles[0]),[]);
    const GiftDropZoneDrop = useCallback((acceptedFiles) =>setGift_Icon(() => acceptedFiles[0]),[]);
    const CouponsDropZoneDrop = useCallback((acceptedFiles) =>setCoupons_Icon(() => acceptedFiles[0]),[]);

    useEffect(() => {
    getIcondatabase();
     }, []);
    
  const Submit = (e,label,value)=>{
    e.preventDefault();
    const dataField = new FormData();
    dataField.append("icon",value)
    dataField.append("label",label)
    dataField.append("store_url",store_url)
    axios.post(`${UrlHttp}/icon-upload`, dataField).then(res=>
      alert(res.data),
      getIcondatabase()
    );
  }

    const getIcondatabase =()=>{
      axios.get(`${UrlHttp}/geticon?name=${store_url}`).then(res=>{
      const data=res.data;  
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(element.label=='profile')setgetProfile(icon+element.icon);
        if(element.label=='addresses')setgetAddress(icon+element.icon);
        if(element.label=='orders')setgetOrders(icon+element.icon);
        if(element.label=='gift')setgetGift(icon+element.icon);
        if(element.label=='coupons')setgetCoupons(icon+element.icon);
        }
      });  
     }
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const profileUpload = !Profile_Icon && <DropZone.FileUpload />;
    const AddressUpload = !Address_Icon && <DropZone.FileUpload />;
    const OrdersUpload = !Orders_Icon && <DropZone.FileUpload />;
    const giftUpload = !Gift_Icon && <DropZone.FileUpload />;
    const couponsUpload = !Coupons_Icon && <DropZone.FileUpload />;

    const uploaded1 = Profile_Icon && (
      <Stack>
        <Thumbnail
          size="small"
          source={
            validImageTypes.includes(Profile_Icon.type)
              ? window.URL.createObjectURL(Profile_Icon)
              : ""
          }
        />
      </Stack>
    );
    const uploaded5 = Orders_Icon && (
      <Stack>
        <Thumbnail
          size="small"
          source={
            validImageTypes.includes(Orders_Icon.type)
              ? window.URL.createObjectURL(Orders_Icon)
              : ""
          }
        />
      </Stack>
    );
    const uploaded2 = Address_Icon && (
      <Stack>
        <Thumbnail
          size="small"
          source={
            validImageTypes.includes(Address_Icon.type)
              ? window.URL.createObjectURL(Address_Icon)
              : "" 
          }
        />
      </Stack>
    );
    const uploaded3 = Gift_Icon && (
      <Stack>
        <Thumbnail
          size="small"
          source={
            validImageTypes.includes(Gift_Icon.type)
              ? window.URL.createObjectURL(Gift_Icon)
              : ""
          }
        />
      </Stack>
    );
    const uploaded4 = Coupons_Icon && (
      <Stack>
        <Thumbnail
          size="small"
          source={
            validImageTypes.includes(Coupons_Icon.type)
              ? window.URL.createObjectURL(Coupons_Icon)
              : ""
          }
        />
      </Stack>
    );
   
    return (
      <Card>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Profile Icon</Tooltip>
      <DropZone allowMultiple={false} onDrop={ProfileDropZoneDrop}>
        {uploaded1}
        {profileUpload}
      </DropZone>
        <Thumbnail
        source={getProfile}
        alt="icon of profile"
        />
      <Button onClick={(e)=>Submit(e,'profile', Profile_Icon)}>Upload</Button>
      </div>
     </Card.Section>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Manage Address Icon</Tooltip>
      <div style={{marginLeft:"-7.6%"}}>
      <DropZone allowMultiple={false} onDrop={AddressDropZoneDrop}>
        {uploaded2}
        {AddressUpload}
      </DropZone>
      </div>
      <Thumbnail
  source={getAddress}
  alt="icon of Address"
/>
<Button onClick={(e)=>Submit(e,'address', Address_Icon)}>Upload</Button>
      </div>
     </Card.Section>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Orders Icon</Tooltip>
      <div>
      <DropZone allowMultiple={false} onDrop={OrdersDropZoneDrop}>
        {uploaded5}
        {OrdersUpload}
      </DropZone>
      </div>
      <Thumbnail
  source={getOrders}
  alt="icon of Orders"
/>
<Button onClick={(e)=>Submit(e,'orders', Orders_Icon)}>Upload</Button>
      </div>
     </Card.Section>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Gift Icon</Tooltip>
     <div style={{marginLeft:"2%"}}>
     <DropZone allowMultiple={false} onDrop={GiftDropZoneDrop}>
        {uploaded3}
        {giftUpload}
      </DropZone>
     </div>
     <Thumbnail
        source={getGift}
  alt="icon of Gift"
/>
   <Button onClick={(e)=>Submit(e,'gift',Gift_Icon)}>Upload</Button>
      </div>
     </Card.Section>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Coupons Icon</Tooltip>
      <div style={{marginLeft:"-1.9%"}}>
      <DropZone allowMultiple={false} onDrop={CouponsDropZoneDrop}>
        {uploaded4}
        {couponsUpload}
      </DropZone>
      </div>
      <Thumbnail
  source={getCoupons}
  alt="icon of Coupons"
/>
<Button onClick={(e)=>Submit(e,'coupons',Coupons_Icon)}>Upload</Button>
      </div>
     </Card.Section>
 </Card>
    );
  }

export default DropZoneExample