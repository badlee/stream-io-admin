import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ExistingApp from "views/app/ExistingApp";
import NewApp from "views/app/NewApp";

function App(){
  return <>
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <Switch>
          <Route path="/app/:id" exact component={ExistingApp} />
          <Route path="/app" exact component={NewApp} />
          <Redirect from="/" to="/dashboard" />
        </Switch>
        </div>
      </div>
    </div>
  </>
}

export default App