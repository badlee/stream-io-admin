import http, { feedClient } from "../../http";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "auth";
import { store } from 'react-notifications-component';
import { useHistory, useParams } from "react-router";

export default function Login() {
  const auth = useAuth();
  const params = useParams()
  const history = useHistory()
  const [remeberValue] = useState("yes");
  const [login, _login] = useState("");
  const [pwd, _pwd] = useState("");
  const [remember, _remember] = useState("yes");
  const [initate, setInitate] = useState(false);
  const [initalData, setInitalData] = useState(undefined);
  const signIn = useCallback(async ()=>{
    try{
      await auth.login(login, pwd, remember === remeberValue)
      history.push(params.from || "/")
    }catch(e){
      store.addNotification({
        title: 'Sign In Error',
        message: e.message || e,
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [login, pwd])
  useEffect(()=>{
    http.get('get-inital-data').then(async res => {
      try {
        if (res && typeof res === 'object') {
          setInitalData(res.data)
          setInitate(res.data.done === false) // show dialog
        }
      } catch (e) {
        //
        setInitate(false)
      }
    })
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              {initate && initalData && initalData.done === false && <div className="rounded-t mb-0 px-6 py-6" >
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Default user
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                  onClick={()=>_login(initalData.users.root.login)}
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-user text-emerald-500 w-5 mr-1"></i>
                    { initalData.users.root.login }
                  </button>
                  <button
                  onClick={()=>_pwd(initalData.users.root.pwd)}
                  className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-key text-emerald-500 w-5 mr-1"></i>
                    { initalData.users.root.pwd }
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>}
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-500 text-center mb-3 font-bold">
                  Sign in
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Login - {login}
                    </label>
                    <input
                      value={login}
                      onChange={event=>_login(event.target.value)}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Login"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password - {pwd}
                    </label>
                    <input
                      value={pwd}
                      onChange={event=>_pwd(event.target.value)}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        checked={remember === remeberValue}
                        onChange={event=>_remember(event.target.checked ? event.target.value : "")}
                        id="customCheckLogin"
                        type="checkbox"
                        value={remeberValue}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      onClick={signIn}
                      disabled={login === "" || pwd === ""}
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
