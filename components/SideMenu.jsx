import React, { useState } from "react";
import ClothsSideMenu from "./ClothsSideMenu";
import MyGenerations from "./MyGenerations";

function SideMenu({ isMobile = false }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={`flex flex-col overflow-hidden ${isMobile ? 'h-full w-full p-4' : 'h-[calc(100vh-5rem)] min-w-96'}`}>
      <div className={`flex-1 overflow-hidden bg-black/30 backdrop-blur-md ${isMobile ? 'rounded-xl p-0' : 'border border-white/10 p-2 rounded-xl'}`}>
        { <ClothsSideMenu /> }
      </div>
    </div>
  );
}

export default SideMenu;
