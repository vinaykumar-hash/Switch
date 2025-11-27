import React, { useEffect, useState } from "react";
import ClothCard from "./ClothCard";
import axios from "axios";

function ClothsSideMenu() {
  const [cloths, setCloths] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (!prompt.trim()) return alert("Enter a prompt!");
    try {
      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/gemini/generate-cloth", { prompt });
      if (response.data.success) {
        setLoading(false);
        setCloths((prev) => [response.data, ...prev]);
        setPrompt("");
        await fetchCloths();
      }
    } catch (error) {
      console.error("Error generating cloth:", error);
      alert("Error generating cloth");
    }
  };

  return (
    <div className=" flex flex-col h-full relative">
      {loading ? <div className="absolute h-full w-full  backdrop-blur-3xl z-10 flex justify-center items-center">
        <div className="font-jolly text-4xl text-black animate-pulse">Switch</div>
      </div> : null}
      <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
        <h2 className="text-sm font-semibold pl-2 text-gray-200 font-fustat ">
          Clothes
        </h2>

        <div className="grid grid-cols-2">
          {loading ? (
            <p></p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : cloths.length === 0 ? (
            <p className="text-gray-400">No generated outfits yet.</p>
          ) : (
            cloths.map((cloth) => (
              <ClothCard key={cloth.id} url={cloth.image_url} />
            ))
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full font-fustat shadow-2xl shadow-black">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your outfit..."
          className="transition-all backdrop-blur-sm duration-300 ease-in-out  focus-within:bg-primary-dark pb-4 mb-1 rounded-lg w-full px-4 p-3 bg-black/80 text-white   outline-none placeholder-gray-400 border border-white/10"
        />

        <button
          onClick={handleGenerate}
          className="w-full text-lg py-2 bg-primary-tint  text-white font-fustat font-bold rounded-lg transition tracking-tight"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default ClothsSideMenu;
