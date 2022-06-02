import React from 'react';
import ReactDOM from 'react-dom';
import "./Admin/index.css";
import '@shopify/polaris/build/esm/styles.css';
import Index from './Admin';
import { HashRouter } from 'react-router-dom';
ReactDOM.render(
<HashRouter>
<Index/> 
</HashRouter>,
document.getElementById('root') 
); 