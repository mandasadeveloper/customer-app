import { Button, FormLayout,Page,TextField,Form, Card, Icon } from "@shopify/polaris";
import React,{useState} from "react";
import {
  ThemeEditMajor
} from '@shopify/polaris-icons';
export default function Manage_Address(){   
  const [toggle, setTogle] = useState(false);
       return(
         <Page title="Mange Address">
           <Card >
           <Card.Section>
           <Card >
             <Card.Section title="Add New Address" 
              actions={[{content:<Button plain onClick={()=>{setTogle(!toggle)}}><Icon
                source={ThemeEditMajor}
                color="base" /></Button>}]}>
             </Card.Section>
           </Card>
           </Card.Section>
         </Card>
       {
         toggle?
         <Card title="Add New Address">
         <Card.Section>
         <Card>
           <Card.Section>
           <FormLayout.Group condensed>
                  <TextField              
                  // value={radio.label1}
                  // onChange={(val)=>handleChange("label1",val)}   
                  label="First Name"
                  name="label1"
                  type="text"   
                  />  
                   <TextField              
                  // value={radio.label2}
                  // onChange={(val)=>handleChange("label2",val)}   
                  label="Last Name"
                  name="label2"
                  type="text"   
                  />  
                  </FormLayout.Group> 
                  <FormLayout.Group condensed>
                  <TextField              
                  // value={radio.label1}
                  // onChange={(val)=>handleChange("label1",val)}   
                  label="Address Line-1"
                  name="label1"
                  type="text"   
                  />  
                   <TextField              
                  // value={radio.label2}
                  // onChange={(val)=>handleChange("label2",val)}   
                  label="Address Line-2"
                  name="label2"
                  type="text"   
                  />  
                  </FormLayout.Group>  <FormLayout.Group condensed>
                  <TextField              
                  // value={radio.label1}
                  // onChange={(val)=>handleChange("label1",val)}   
                  label="City"
                  name="label1"
                  type="text"   
                  />  
                   <TextField              
                  // value={radio.label2}
                  // onChange={(val)=>handleChange("label2",val)}   
                  label="Contact Number"
                  name="label2"
                  type="text"   
                  />  
                  </FormLayout.Group> 
                  
           </Card.Section>
         </Card>
         </Card.Section>
       </Card>:null
       }
         </Page>
       )
}