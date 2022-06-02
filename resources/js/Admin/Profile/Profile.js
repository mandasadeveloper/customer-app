import { Button, FormLayout,Page,TextField,Form, ButtonGroup,Select, Icon, Card, Badge } from "@shopify/polaris";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  MobileCancelMajor,DragHandleMinor,PlusMinor
} from '@shopify/polaris-icons'; 
const Profile = () => { 
  const store_url = shopDomain;
  const [formValues, setFormValues] = useState([{}]); //hooks for increment and decrement 
  const [group, setGroup] = useState([{value:""}])
  const [state,setState]=useState({      
    label:"",
    field:"",
    });
  useEffect(()=>{
  getData();
  },[]);

const [profilefield, setProfileField] = useState([
  {id:0,label:"First Name",name:"fname"},
  {id:1,label:"Last Name",name:"lname"},
  {id:2,label:"Email",name:"email"},
]);
const handleChange=(name,value)=>{   
setState((preValue)=>{return{...preValue,[name]:value,}})}

function addFormFields(){setFormValues([...formValues,{}])} 
const removeFormFields = (i) => {
let newFormValues = [...formValues];
newFormValues.splice(i, 1);
setFormValues(newFormValues)
} 

//for add new filed and label
const fieldDelete=(id)=>{     //delete filed
if(window.confirm("Are you sure this file is deleted")){
axios.post(`${UrlHttp}/delete/${id}`).then(res=>{
alert(res.data),
getData();
});
}
}
function addTextFields(e){                   //create new input filed
e.preventDefault();
const data=state.field;
const allData = [group,data];
if(state.field!="" && state.label!=""){
const dataField = {
field:state&&state.field=='radio'||state.field=='checkbox'?JSON.stringify(allData):JSON.stringify(state.field),
label:state.label,  
store_url:store_url,
orderby:fetchfield.length?fetchfield.length+1:0,
drag_id:fetchfield.length?fetchfield.length+1:0,
}
// console.log(dataField);
axios.post(`${UrlHttp}/field`, dataField).then(res =>{
if(res.data.status === 200){          
getData();
setState({});
}
});
} 
else{
  alert('Input field is Empty');
}
}


const groupChangval = (i,name,value) => {
  const newFormValues = [...group];
  newFormValues[i][name]=value;
  setGroup(newFormValues);
}

let addGroupField = () => {
  setGroup([...group,{value:""}])
  }

let removeGroupField = (i) => {
    let newFormValues = [...group];
    newFormValues.splice(i, 1);
    setGroup(newFormValues)
}


const [fetchfield, setfetchfield] = useState([]); 
const handleDragEnd = (e) => {
  if (!e.destination) return;
  let tempData = Array.from(fetchfield);
  let [source_data] = tempData.splice(e.source.index, 1);
  tempData.splice(e.destination.index, 0, source_data);
  setfetchfield(tempData);
  for (let index = 0; index < tempData.length; index++) {
    const element = {
      orderby:index,
      id:tempData[index].id
    };
    axios.post(`${UrlHttp}/drage-fields`, element).then(res=>{
      console.log(res.data.message);
    });
  }
};
const drageElement = (e) => {
  if (!e.destination) return;
  let tempData = Array.from(profilefield);
  let [source_data] = tempData.splice(e.source.index, 1);
  tempData.splice(e.destination.index, 0, source_data);
  setProfileField(tempData);
  const dataField = {
    drag_data:JSON.stringify(tempData),
    store_url:store_url
  }
  axios.post(`${UrlHttp}/drage-profiles`, dataField);
};
 // data access in webpage

const getData =()=>{
  axios.get(`${UrlHttp}/get-fields?name=${store_url}`).then(res=>{
    setfetchfield(res.data);              
  });
 
  axios.get(`${UrlHttp}/getdrag?name=${store_url}`).then(res=>{
    setProfileField(JSON.parse(res.data['drag-value'])); 
}); 
}

const options = [
  {label: 'Input', value: 'text'},
  {label: 'Email', value: 'email'},
  {label: 'Date', value: 'date'},  
  {label: 'Textarea', value: 'textarea'},
  {label: 'Radio-Button', value:'radio'},
  {label: 'Checkbox', value: 'checkbox'},
];


return (
         <Page                                          
         title="Profile"      
         >                             
        <Form>
<Card title="Profile Field">
<Card.Section>                                                        
<Card>
<Card.Section>
<DragDropContext onDragEnd={drageElement}>    
<Droppable droppableId="droppable-1">
{(provider) => (              
<div
className="text-capitalize"
ref={provider.innerRef}
{...provider.droppableProps}
>                        
{profilefield.map((user, index) => (
<Draggable
key={`${user.label}${user.id}`}
draggableId={`${user.label}${user.id}`}
index={index}
>
{(provider) => (
<Card.Section>
<p {...provider.draggableProps} ref={provider.innerRef}{...provider.dragHandleProps}>                                                                                                                                 
<div className="dragstyle">
<p>The Default Field is :</p><p style={{fontWeight:"600"}}>{user.label}</p><Badge><Icon source={DragHandleMinor} color="base" /></Badge>
</div>              
</p>
</Card.Section>
)}
</Draggable>
))}                                 
{provider.placeholder}
</div>

)}
</Droppable>      
</DragDropContext>  
</Card.Section>
</Card>         
</Card.Section>           
</Card>   

<Card title="Additional Fields">
<Card.Section>                                                        
<Card>
<Card.Section>
<DragDropContext onDragEnd={handleDragEnd}>    
<Droppable droppableId="droppable-1">
{(provider) => (              
<div
className="text-capitalize"
ref={provider.innerRef}
{...provider.droppableProps}
>                        
{fetchfield.map((user, index) => (
<Draggable
key={`${user.label}${user.id}`}
draggableId={`${user.label}${user.id}`}
index={index}
>
{(provider) => (
<Card.Section>
<p {...provider.draggableProps} ref={provider.innerRef}{...provider.dragHandleProps}>                                                                                                                                 
<div className="dragstyle">
<p><Badge><Icon source={DragHandleMinor} color="base" /></Badge></p><p style={{fontWeight:"600"}}>{user.label}</p><Button size="slim" onClick={()=>fieldDelete(user.id)}><Icon source={MobileCancelMajor}/></Button>
</div>           
</p>
</Card.Section>
)}
</Draggable>
))}                                 
{provider.placeholder}
</div>

)}
</Droppable>      
</DragDropContext>  
</Card.Section>
</Card>         
</Card.Section>           
</Card> 
            <Card title="Add New Fields">     
            <Card.Section>
            {formValues.map((e, index) => (
            <div key={index}>
              {
              index ? 
              <div>
               <Card>
        <Card.Section>
        {group.map((element, index) => (
            <div key={index}>
             {state&&state.field=='radio'||state.field=='checkbox'?
                    <TextField        
                    value={element.value}      
                    onChange={(val) => groupChangval(index,"value",val)}
                    label={`Value-${index+1}`}
                    name="value"
                    type="text"   
                    connectedRight={<ButtonGroup><Button onClick={() => removeGroupField(index)}><Icon source={MobileCancelMajor}/></Button><Button onClick={() => addGroupField()}><Icon source={PlusMinor}color="base" /></Button></ButtonGroup>}
                    />  
                  :null}         
            </div>
          ))} 
              <FormLayout>
               <FormLayout.Group condensed>
                  <Select
                  label="Select field type"
                  placeholder="Select Type"
                  options={options}
                  onChange={(val)=>handleChange("field",val)}   
                  value={state.field}
                  name="field"
                  />
                    <TextField              
                    value={state.label}
                    onChange={(val)=>handleChange("label",val)}   
                    label="Field label"
                    name="label"
                    type="text"
                    connectedRight={<ButtonGroup>
                    <Button onClick={()=>removeFormFields()}><Icon source={MobileCancelMajor}/></Button>
                    {/* {group==""?<Button onClick={() => addGroupField()}>Add</Button>:""} */}
                    <Button primary onClick={addTextFields}>Create</Button>
                    </ButtonGroup>}                   
                    />             
                  </FormLayout.Group>                                                                           
                </FormLayout>
                </Card.Section>
      </Card>
                </div>
                : null
              }
            </div>
          ))} 
            </Card.Section>
          <Card>
            <Card.Section>                                      
             <ButtonGroup>
             <Button onClick={() => addFormFields()}>Add Field</Button> 
              </ButtonGroup>                                                                               
            </Card.Section>
          </Card>
            </Card>
          </Form>
         </Page>
    );
}
export default Profile

