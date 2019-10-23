import Introduction from "./Introduction";
import TitleBar from "./TitleBar";
import { useAuth } from "./context/auth";
import React, { useState } from "react";

function Home(props) {
  return   <div>
            <Introduction />
           </div>;
}

export default Home;