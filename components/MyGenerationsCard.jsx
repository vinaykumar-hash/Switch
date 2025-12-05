import React, { useEffect, useState } from "react";

function MyGenerationsCard({ cloth, onSelect }) {
  const handleSelect = () => {
    onSelect(cloth.image_url);
  };

  return (
    <div
      onClick={handleSelect}
      className="bg-white/5 rounded-lg overflow-hidden border border-white/10 group transition-all hover:border-white/20 cursor-none"
    >
      <div className="w-full aspect-square bg-black/20">
        <img
          src={cloth.image_url}
          alt="Generated Creation"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <p className="font-fustat font-semibold text-sm text-white/80 truncate" title={cloth.prompt}>
          {cloth.prompt ? cloth.prompt : "No Prompt"}
        </p>
        <p className="font-fustat text-xs text-white/50 mt-1">
          {new Date(cloth.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default MyGenerationsCard;
