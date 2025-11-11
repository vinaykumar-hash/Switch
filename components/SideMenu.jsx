import React, { useState } from "react";
import ClothsSideMenu from "./ClothsSideMenu";
import MyGenerations from "./MyGenerations";

function SideMenu() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col h-screen bg-white/10 overflow-hidden min-w-96">
      <div className="flex justify-between items-center p-3 bg-primary-dark/90">
        <div className="flex w-full bg-white/0 rounded-xl overflow-hidden">

          <button
            className={`flex-1 py-2 text-white transition rounded-xl flex justify-center items-center gap-2 ${
              selected === 0 ? "bg-black/50" : "hover:bg-white/0"
            }`}
            onClick={() => setSelected(0)}
          >
            <img className="scale-75" src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Shirt.png" alt="" />
            <h1 className="">Clothes</h1>
          </button>
          <button
            className={`flex-1 py-2 text-white transition rounded-xl flex justify-center items-center gap-2 ${
              selected === 1 ? "bg-black/50" : "hover:bg-white/0"
            }`}
            onClick={() => setSelected(1)}
          >
            <img className="scale-75" src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Brush.png" alt="" />
            <h1 className="">Creations</h1>
          </button>
        </div>

        
      </div>

      <div className="flex-1 overflow-hidden bg-black/40 p-2">
        {selected === 0 ? <ClothsSideMenu /> : <MyGenerations />}
      </div>
    </div>
  );
}

export default SideMenu;
