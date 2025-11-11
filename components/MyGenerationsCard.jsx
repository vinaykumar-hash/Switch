import React, { useEffect, useState } from "react";

function MyGenerationsCard({ url }) {



  

  return (
    <div
      className={`aspect-square rounded-xl overflow-hidden cursor-pointer w-42 h-42 relative transition-all duration-200`}
    >
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
      
    </div>
  );
}

export default MyGenerationsCard;
