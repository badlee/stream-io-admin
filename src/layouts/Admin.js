import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";
import App from "./App.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Blue Header */}
        <div className="relative bg-lightBlue-600 md:pt-32 pb-40 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
          </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div style={{
            minHeight : 100
          }}>
            <Switch>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/maps" exact component={Maps} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/tables" exact component={Tables} />
              <Route path="/app" component={App} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
