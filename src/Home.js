import React from "react";
import Introduction from "./Introduction";
import TitleBar from "./TitleBar";

function Home(props) {
  return   <div>
            <TitleBar />
            <Introduction />
           </div>;
}

export default Home;