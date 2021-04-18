import React from "react";
import { Route } from "react-router-dom";
import { useLocalStorage } from './LocalStorage/useLocalStorage'
import Layout from "./Components/Layout/Layout";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Product } from "./Components/Product/Product";
import { Home } from "./Components/Home/Home";
import { AddProduct } from "./Components/AddProduct/AddProduct.jsx";
import { LoginSignup } from "./Components/LoginSigup/LoginSignup";
import { ModifyUser } from "./Components/LoginSigup/ModifyUser/ModifyUser";
import { ModifyProduct } from "./Components/ModifyProduct/ModifyProduct.jsx";
import { ControlPanel } from "./Components/ControlPanel/ControlPanel.jsx";

function App() {
  const [priority, setPriorityStorage] = useLocalStorage ("priority", "")


  return (
    <Layout priority={priority}>
      <Route exact path="/" render={()=><Home priority={priority}/>} />
      <Route exact path ="/login" render={()=><LoginSignup priority={priority}/>}/>
      <Route exact path ="/modifyUser/:id" render={({ match }) => <ModifyUser id={match.params.id} />}/>
      <Route exact path="/Product/:id" render={()=><Product priority={priority}/>}/>
      <Route exact path="/catalogue" render={()=><Catalogue priority={priority}/>}/>
      <Route exact path="/AddProduct" render={()=><AddProduct priority={priority}/>}/>
      <Route exact path="/modifyProduct/:id" render={({ match }) => <ModifyProduct id={match.params.id} />}/>
      <Route exact path="/controlpanel" render={()=><ControlPanel priority={priority}/>}/>

    </Layout>
  );
}

export default App;
