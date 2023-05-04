import React from "react";
import { useEffect } from "react";
import { initJuno } from "@junobuild/core";
import { Auth } from "./Auth";
import  Protected  from "./Protected";

const App = () => {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "oio3g-riaaa-aaaal-acfva-cai",
      }))();
  }, []);

  return (
      <Auth>
         <div><Protected /></div>
      </Auth>
    
  );
};

export default App;