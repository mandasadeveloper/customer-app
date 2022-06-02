import {Button, Card,Select,Tooltip } from "@shopify/polaris";
import axios from "axios";
import React,{useCallback, useEffect, useState } from "react";

function Font_family_setting() {
  const store_url = shopDomain;
    const [getFont, setGetFont] = useState('"Gill Sans Extrabold", sans-serif');
    const [Font, setFont] = useState("'Times New Roman', serif");
    useEffect(() => {
    getFontFamily();
    }, []);
    
    
  const handleSelectChange = useCallback((value) => setFont(value), []);

  const options = [
  {label: '"Gill Sans Extrabold", sans-serif', value:'"Gill Sans Extrabold", sans-serif'},
  {label: 'Times New Roman (serif)', value:"'Times New Roman', serif"},
  {label: 'Arial (sans-serif)', value: 'Arial, sans-serif'},
  {label: 'Trebuchet MS (sans-serif)', value:"'Trebuchet MS', sans-serif"},
  ];

const Submit = (e)=>{
  e.preventDefault();  
  const data = new FormData();
  data.append('font',Font);       
  data.append('store_url',store_url);       
  axios.post(`${UrlHttp}/postFontFamily`, data).then(res =>{
    alert(res.data),
    getFontFamily();
  })}
      const getFontFamily =()=>{
      axios.get(`${UrlHttp}/getFontFamily?name=${store_url}`).then(res=>{
      setGetFont(res.data[0].font_family); 
      });  
     }
    return (
      <Card>
     <Card.Section>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <Tooltip>Font-Family Name</Tooltip>
      <Tooltip>{getFont}</Tooltip>
    <Select
      options={options}
      onChange={handleSelectChange}
      value={Font}
    />
      <Button 
    onClick={Submit}
      >Save</Button>
      </div>
     </Card.Section>
 </Card>
    );
  }

export default Font_family_setting