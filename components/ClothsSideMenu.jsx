import React, { useEffect, useState } from "react";
import ClothCard from "./ClothCard";
import axios from "axios";
import { Sparkles } from "lucide-react";

function ClothsSideMenu() {
  const [cloths, setCloths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const fetchCloths = async () => {
      try {
        setLoading(true);
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/gemini/generated-cloths");
        if (response.data.success) setCloths(response.data.cloths);
        else setError("Failed to fetch images");
      } catch (err) {
        console.error("Error fetching cloths:", err);
        setError("Error fetching cloths");
      } finally {
        setLoading(false);
      }
    };
    fetchCloths();
  }, []);

  const handleGenerate = async () => {
  const systemPrompt = `
Create only the clothing item based on the user's description.
Exclude humans entirely — no faces, no skin, no body parts, no mannequins, no limbs.
The clothing should be displayed alone, front-facing, centered, with realistic fabric texture.
Use a clean, minimal, studio-style background with soft lighting.
Show the complete garment clearly without any person wearing it.
Avoid generating accessories, props, or unrelated objects.
Output must contain ONLY the clothing item.
`;

  if (!prompt.trim()) return alert("Enter a prompt!");

  const fullPrompt = prompt + "\n\n" + systemPrompt;

  try {
    setGenerating(true);

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/gemini/generate-cloth", // Ensure this endpoint is correct
      { prompt: fullPrompt }
    );

    if (response.data.success) {
      setCloths((prev) => [response.data, ...prev]);
      setPrompt("");
    }
  } catch (error) {
    console.error("Error generating cloth:", error);
    alert("Error generating cloth");
  } finally {
    setGenerating(false);
  }
};


  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-shrink-0 p-2">
        <h2 className="text-lg font-bold pl-2 text-white font-fustat">
          Clothes
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide pb-36">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="h-6 w-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-400 text-center py-10">{error}</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {cloths.map((cloth) => (
                <ClothCard key={cloth.id} url={cloth.image_url} />
              ))}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-12  ">
        <div className="space-y-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe an outfit..."
            className="w-full px-4 py-3  bg-black font-fustat text-white rounded-lg outline-none placeholder-gray-400 border border-white/10  transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full text-base py-3 bg-primary-tint text-black font-fustat font-bold rounded-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-none"
          >
            {generating ? (
              <>
                <div className="h-5 w-5 border-2 border-black/50 border-t-black rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <><Sparkles size={18} /> Generate</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClothsSideMenu;
