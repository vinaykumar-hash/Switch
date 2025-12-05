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
      className={`flex justify-center items-center w-full aspect-square overflow-hidden cursor-none relative transition-all duration-200 `}
    >
      <img
        src={url}
        alt=""
        className={`w-40 h-40 object-cover hover:scale-110 transition-all duration-200 ${isSelected ? "rounded-lg" : "rounded-none"}`}
      />
      {isSelected && (
        <div className="font-fustat absolute m-1 top-0 inset-0  text-white font-bold text-sm">
          <div className="w-3 h-3 rounded-full bg-primary-tint"></div>
        </div>
      )}
    </div>
  );
}

export default ClothCard;
