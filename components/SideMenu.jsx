import React, { useState } from "react";
import ClothsSideMenu from "./ClothsSideMenu";
import MyGenerations from "./MyGenerations";

function SideMenu({ isMobile = false }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={`flex flex-col overflow-hidden ${isMobile ? 'h-full w-full p-4' : 'h-full w-80'}`}>
      <div className={`flex-1 overflow-hidden bg-black/30 backdrop-blur-md ${isMobile ? 'p-0' : 'border-r border-white/10'}`}>
        {<ClothsSideMenu />}
      </div>
    </div>
  );
}

export default SideMenu;
