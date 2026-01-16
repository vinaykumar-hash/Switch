import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

function MyGenerationsCard({ cloth, onSelect, onDelete }) {
  const handleSelect = () => {
    onSelect(cloth.image_url);
  };

  return (
    <div
      onClick={handleSelect}
      className="bg-white/5 rounded-lg overflow-hidden border border-white/10 group transition-all hover:border-white/20 relative cursor-none"
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

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Are you sure you want to delete this creation?")) {
            onDelete(cloth.id);
          }
        }}
        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500/80 text-white/70 hover:text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default MyGenerationsCard;
