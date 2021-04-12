import { useAuth } from "auth";
import React from "react";
import { useParams } from "react-router-dom";


function ExistingApp(){
  let p = useParams()
  let {feed} = useAuth()
  console.log("FEED",feed)
  return <>
    <h3>EXISTING APP</h3>
    <pre>{JSON.stringify(p,null,2)}</pre>
  </>
}

export default ExistingApp