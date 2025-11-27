import React, { useState } from "react";
import ClothsSideMenu from "./ClothsSideMenu";
import MyGenerations from "./MyGenerations";

function SideMenu() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="pl-4   flex flex-col h-screen  py-10 overflow-hidden min-w-96">
      

      <div className="border border-white/10 flex-1 overflow-hidden bg-black/60 p-2 rounded-lg backdrop-blur-sm">
        { <ClothsSideMenu /> }
      </div>
    </div>
  );
}

export default SideMenu;
