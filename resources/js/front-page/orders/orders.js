import axios from "axios";
import React,{ useState,useEffect} from "react";
  const orders = ({UrlHttp,Customer,ShopDomain})=>{
    const [viewOrders, setViewOrders] = useState(false);


 return(
<div>
    <div className="center-div" style={{position:"relative"}}>
    <div className="order-header">
      <p>Date</p><hr/>
      <p>Order</p><hr/>
      <p>Total item:</p><hr/>
      <p>Payment:</p><hr/>
      <p className="view_order" onClick={()=>setViewOrders(!viewOrders)}>{viewOrders?"Hide Order":"View Order"}<i class="fa fa-angle-right"></i></p>
      </div>
      <div className="contact-us">
      <div>
      <p>Contact Us</p>
        <p>Re-Order</p>
      </div>
      </div>
      {
        viewOrders?
        <>
        <div className="all-orders">
        <div className="parent-box">
          <div className="box"><img src="https://cdn.shopify.com/s/files/1/0279/3989/7426/products/black-headphones-closeup_small.jpg?v=1586420085"/></div>
          <div className="child-box"><p>name</p><p>price</p></div>
        </div>
        <div className="parent-box">
          <div className="box">Product image</div>
          <div className="child-box"><p>name</p><p>price</p></div>
        </div>
        <div className="parent-box">
          <div className="box">Product image</div>
          <div className="child-box"><p>name</p><p>price</p></div>
        </div>
        <div className="parent-box">
          <div className="box">Product image</div>
          <div className="child-box"><p>name</p><p>price</p></div>
        </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Sub Total</td> 
              <th>RS 0000</th>
            </tr>
            <tr>
              <td>Discount</td> 
              <th>RS 0000</th>
            </tr>
            <tr>
              <td>Shipping Cost</td> 
              <th>RS 0000</th>
            </tr>
            <tr>
              <td>Address</td> 
              <th>RS 0000</th>
            </tr>
          </thead>
        </table>
      <div>

      </div>
        </>

      :null
      }
    </div>
</div>
 )
}
export default orders