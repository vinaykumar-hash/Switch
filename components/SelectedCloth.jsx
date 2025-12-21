import React, { useEffect, useState } from "react";

function SelectedCloths() {
  const [cloths, setCloths] = useState([]);

  useEffect(() => {
    const loadCloths = () => {
      const stored = JSON.parse(localStorage.getItem("selectedCloths")) || [];
      setCloths(stored);
    };

    loadCloths();

    window.addEventListener("clothsUpdated", loadCloths);

    return () => {
      window.removeEventListener("clothsUpdated", loadCloths);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-white/5 rounded-lg p-2">
      {cloths.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 w-full">
          {cloths.map((cloth, index) => (
            <img
              key={index}
              src={cloth}
              alt={`Cloth ${index + 1}`}
              className="w-full aspect-square object-cover rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 opacity-40 text-center text-sm h-full flex items-center justify-center font-fustat">
          Select Cloths from the Menu
        </p>
      )}
    </div>
  );
}

export default SelectedCloths;
