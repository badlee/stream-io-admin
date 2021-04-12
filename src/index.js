import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter , Switch, Redirect, useLocation } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// auth
import {ProvideAuth, PrivateRoute, PublicRoute } from "./auth"
// layouts
import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

// views without layouts

// import Landing from "views/Landing.js";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const MyRouter = HashRouter
ReactDOM.render(
  <ProvideAuth>
    <ReactNotification />
    <MyRouter>
      <Switch>
        {/* add routes with layouts */}
        <PublicRoute path="/auth" redirect="/" component={Auth} />
        {/* add routes without layouts */}
        {/* <Route path="/landing" exact component={Landing} /> */}
        {/* <Route path="/profile" exact component={Profile} /> */}
        {/* <Route path="/" exact component={Index} /> */}
        {/* add default page */}
        <PrivateRoute path="/" redirect="/auth" component={Admin} />
        {/* add redirect for first page */}
        <Redirect from="*" component={NoMatch} />
      </Switch> 
    </MyRouter>
  </ProvideAuth>,
  document.getElementById("root")
);


function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        Error 404 : <code>{location.pathname}</code>
      </h3>
    </div>
  );
}