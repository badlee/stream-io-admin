import http, { feedClient } from "./http";
import React, { useContext, createContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { StreamClient } from 'getstream'
import {
  Route,
  Redirect
} from "react-router-dom";
const auth = {
  isAuthenticated: false,
  signin(cb) {
    auth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
 const authContext = createContext();

 function ProvideAuth({ children }) {
   const auth = useProvideAuth();
   return (
     <authContext.Provider value={auth}>
       {children}
     </authContext.Provider>
   );
 }
 
 function useAuth() {
   return useContext(authContext);
 }
 
 function useProvideAuth() {
   let u = localStorage.user || sessionStorage.user || "null"
   let f = null;
   console.log("user",u)
   try {
     u = JSON.parse(u)
     http.defaults.headers.common.Authorization = u.token
     http.defaults.headers.common['Stream-Auth-Type'] = "jwt"
     f = feedClient()

   } catch (err) {
     u = null;
   }
   console.log("user",u)
   const [user, _user] = useState(u);
   const [feed, _feed] = useState(f);
 
   const login = (login, pwd, remember) => new Promise(async (cb,err) => {
      let user
      try {
        user = await http.post('login', {
          username: login,
          password: pwd
        })
        user = await user.data
      } catch (e) {
        user = null
      }
      if (user && 'login' in user) {
        auth.signin(() => {
          // const password = this.password
          localStorage.setItem('jwt', user.token)
          http.defaults.headers.common['Stream-Auth-Type'] = 'jwt'
          http.defaults.headers.common.Authorization = user.token
          _feed(feedClient())
          _user(user);
          (remember ? localStorage : sessionStorage).user = JSON.stringify(user || null)
          cb(true);
        })
      } else {
        err((user && user.message) || "Authentifiction failed")
      }
   });
 
   const logout = offline => new Promise(async cb => {
      return auth.signout(async () => {
        _user(null)
        _feed(null)
        delete http.defaults.headers.common.Authorization
        delete http.defaults.headers.common['Stream-Auth-Type']
        delete localStorage.user
        delete localStorage.jwt
        delete sessionStorage.user
        if(!offline)
          try {
            await http.get('logout') // try to Close
          } catch (e) {}
        cb();
      })
    });
 
   return {
     user,
     /**
      * @type {StreamClient | null} 
      */
    feed,
    login,
    logout
   };
 }

 function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...{...rest, component: undefined}}
      render={({ location }) =>{
        const ret = auth.user ? (
          rest.component ? <rest.component /> : children
        ) : (
          <Redirect
            to={{
              pathname: rest.redirect.toString() || "/login",
              state: { from: location }
            }}
          />
        )
        console.log(ret)
        return ret
      }
    }
    />
  );
}
function PublicRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...{...rest, component: undefined}}
      render={() =>{
        const ret = !auth.user ? (
          rest.component ? <rest.component /> : children
        ) : (
          <Redirect
            to={rest.redirect.toString() || "/"}
          />
        )
        console.log(ret)
        return ret
      }
    }
    />
  );
}
export default auth;
export {useAuth,useProvideAuth,ProvideAuth, PrivateRoute, PublicRoute, Route};
