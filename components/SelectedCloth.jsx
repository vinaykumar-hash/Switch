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
    <div className="flex-1 bg-white/10 rounded-xl border border-dashed border-gray-600 flex items-center justify-center p-4 min-h-[15rem]">
      {cloths.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {cloths.map((cloth, index) => (
            <img
              key={index}
              src={cloth}
              alt={`Cloth ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">
          Select Cloths from the Menu
        </p>
      )}
    </div>
  );
}

export default SelectedCloths;
