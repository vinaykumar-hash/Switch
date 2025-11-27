import React, { useEffect, useState } from "react";

function MyGenerationsCard({ url , prompt, ele }) {
  console.log(ele);
  const [showImg,setShowImg] = useState(false);
  
  return (
    // <div
    //   className={`w-full aspect-square overflow-hidden cursor-pointer relative transition-all duration-200 `}
    // >
    //   <img
    //     src={url}
    //     alt="Generated Creation"
    //     className="w-40 h-40 object-cover hover:scale-110 transition-all duration-200 "
    //   />

      
    // </div>
    <>
    
      <div onClick={()=>{setShowImg(!showImg)}} className={` w-60 flex flex-col justify-center items-center gap-4 transition-all ease-in-out duration-300  ${!showImg ? "px-4 py-2 bg-primary-dark hover:bg-primary-tint hover:te" : "px-0 py-0 "} rounded-lg cursor-pointer hover:bg-transparent `}>
        <div className="w-full flex justify-between">
          <p className="truncate w-20 font-fustat font-semibold text-sm text-white/80">
          {ele.prompt? ele.prompt : "No Prompt"}
        </p>
        <a className=" font-fustat font-bold hover:text-white text-white/60">{ele.created_at.slice(0,10)}</a>
        
        </div>
        {showImg ? (
          <img src={ele.image_url} className="w-60 rounded-lg" alt="" />
        ) :(
          <div></div>
        )}
      </div>
    
    </>
    
  );
}

export default MyGenerationsCard;
