import React, { useEffect, useState } from "react";

function ClothCard({ url }) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("selectedCloths")) || [];
    setIsSelected(stored.includes(url));
  }, [url]);

  const handleSelect = () => {
    const stored = JSON.parse(localStorage.getItem("selectedCloths")) || [];
    let updated;

    if (stored.includes(url)) {
      updated = stored.filter((c) => c !== url);
      setIsSelected(false);
    } else {
      updated = [...stored, url];
      setIsSelected(true);
    }

    localStorage.setItem("selectedCloths", JSON.stringify(updated));
    window.dispatchEvent(new Event("clothsUpdated"));
  };

  return (
    <div
      onClick={handleSelect}
      className={`aspect-square rounded-xl overflow-hidden cursor-pointer w-42 h-42 relative transition-all duration-200 ${
        isSelected ? "ring-4 ring-primary scale-105" : "ring-0"
      }`}
    >
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
      {isSelected && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm">
          Selected
        </div>
      )}
    </div>
  );
}

export default ClothCard;
