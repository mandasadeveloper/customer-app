import { Layout,Card,ResourceList,TextStyle, Avatar, Page, } from "@shopify/polaris";
import { Link} from "react-router-dom";
import React from "react";
export default function Dashboard(){  
    return(  
        <Page title="Dashboard">
        <Layout>
<Layout.Section oneThird>
    <Card>      
      <Card.Section>
        <ResourceList          
          items={[
            {
              id: 1,
              url: '/profile',
              name: 'User profile',
              sku: 'Setup',             
              media: (<Avatar/>),
            },        
          ]}
          renderItem={(item) => {
            const {id,url,name, sku, media} = item;
            return (
              <ResourceList.Item
                id={id}               
                media={media}              
              >
               <Link to={url} className="Link">
               <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{sku}</div>    </Link>          
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird>
    <Card>      
      <Card.Section>
        <ResourceList          
          items={[
            {
              id: 1,
              url: '/manage-address',
              name: 'Manage Address',
              sku: 'Manage Address',             
              media: (<Avatar/>),
            },        
          ]}
          renderItem={(item) => {
            const {id,url,name, sku, media} = item;
            return (
              <ResourceList.Item
                id={id}               
                media={media}              
              >
               <Link to={url} className="Link">
               <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{sku}</div>    </Link>          
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird>
    <Card>      
      <Card.Section>
        <ResourceList          
          items={[
            {
              id: 1,
              url: '/gift',
              name: 'Gift Cards',
              sku: 'Gift Cards',             
              media: (<Avatar/>),
            },        
          ]}
          renderItem={(item) => {
            const {id,url,name, sku, media} = item;
            return (
              <ResourceList.Item
                id={id}               
                media={media}              
              >
               <Link to={url} className="Link">
               <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{sku}</div>    </Link>          
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird>
    <Card>      
      <Card.Section>
        <ResourceList          
          items={[
            {
              id: 1,
              url: '/orders',
              name: 'My Orders',
              sku: 'My Orders',             
              media: (<Avatar/>),
            },        
          ]}
          renderItem={(item) => {
            const {id,url,name, sku, media} = item;
            return (
              <ResourceList.Item
                id={id}               
                media={media}              
              >
               <Link to={url} className="Link">
               <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{sku}</div>    </Link>          
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird>
    <Card>      
      <Card.Section>
        <ResourceList          
          items={[
            {
              id: 1,
              url: '/wishlist',
              name: 'My wishlist',
              sku: 'My wishlist',             
              media: (<Avatar/>),
            },        
          ]}
          renderItem={(item) => {
            const {id,url,name, sku, media} = item;
            return (
              <ResourceList.Item
                id={id}               
                media={media}              
              >
               <Link to={url} className="Link">
               <h3>
                  <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{sku}</div>    </Link>          
              </ResourceList.Item>
            );
          }}
        />
      </Card.Section>
    </Card>
  </Layout.Section>
</Layout>         
        </Page>    
     );

}