import React from 'react';
import "./front-page/index.css";
import Sidebar from './front-page/sidebar';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
function MyApp() { 
return (
<HashRouter>
<Sidebar/>
</HashRouter> 
);
}
const root = document.createElement('div');
const url = window.location.pathname;
if(url==="/account"){
document.getElementsByTagName('Main')[0].innerHTML="";
document.getElementsByTagName('Main')[0].prepend(root);
ReactDOM.render(<MyApp/>, root);
}