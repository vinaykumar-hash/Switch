import React, { useEffect, useState } from "react";
import axios from "axios";

function Artstyle({ isMobile = false }) {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(
    localStorage.getItem("selectedArtstyle") || ""
  );

  // Fetch list of artstyles on mount
  useEffect(() => {
    const fetchStyles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+`/api/gemini/artstyles`);
        setStyles(res.data.styles || []);
      } catch (err) {
        console.error("Error fetching artstyles:", err);
        setError("Could not load art styles.");
      } finally {
        setLoading(false);
      }
    };

    fetchStyles();
  }, []);

  const handleSelect = async (name) => {
    try {
      setSelected(name);
      localStorage.setItem("selectedArtstyle", name);

      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL+`/api/gemini/artstyles/${encodeURIComponent(name)}`
      );

      const prompt = res.data.prompt;

      localStorage.setItem("selectedArtstylePrompt", prompt);

    } catch (err) {
      console.error("Error fetching prompt:", err);
    }
  };

  return (
    <div className={`overflow-hidden ${isMobile ? 'h-full w-full p-4' : 'h-[calc(100vh-10rem)] min-w-64'}`}>
      <div className={`h-full bg-black/30 p-2 rounded-xl backdrop-blur-md flex flex-col ${isMobile ? '' : 'border border-white/10'}`}>
        <div className="flex-shrink-0 p-2">
          <h2 className="text-lg font-bold pl-2 text-white font-fustat">Art Styles</h2>
        </div>
        <ul className="flex-1 cursor-pointer font-fustat font-semibold tracking-tight flex flex-col gap-1 overflow-y-auto scrollbar-hide p-1">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="h-6 w-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-red-400 text-center py-10">{error}</p>
          ) : (
            styles.map((style, index) => (
              <li
                key={index}
                onClick={() => handleSelect(style.name)}
                className={`px-3 py-2 rounded-md transition-colors cursor-none ${
                  selected === style.name
                    ? "bg-primary-tint text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {style.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Artstyle;
