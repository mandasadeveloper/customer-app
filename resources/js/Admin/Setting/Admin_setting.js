import { Page } from "@shopify/polaris";
import LeftSidebar from "./Left_sidebar";
import RightSide from "./Right_side";
import React from "react";
const Admin_setting = () => { 
return (
         <Page                              
         title="Translations"      
         >
         <LeftSidebar />         
         <RightSide />       
         </Page>
    );
}
export default Admin_setting

