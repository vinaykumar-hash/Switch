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
        const response = await axios.get("http://localhost:5000/api/gemini/generated-cloths");
        if (response.data.success) {
          setCloths(response.data.cloths);
        } else {
          setError("Failed to fetch images");
        }
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
      const response = await axios.post("http://localhost:5000/api/gemini/generate-cloth", {
        prompt,
      });
      if (response.data.success) {
        setCloths((prev) => [response.data, ...prev]);
        setPrompt("");
      }
    } catch (error) {
      console.error("Error generating cloth:", error);
      alert("Error generating cloth");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap gap-4 justify-center p-4 h-96 overflow-y-scroll scrollbar-hide w-full">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
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

      <div className="flex flex-col justify-center items-center w-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe Your Outfit.."
          className="w-full px-4 py-4 tracking-normal outline-none bg-primary-dark/20"
        />
        <button
          onClick={handleGenerate}
          className="bg-primary-tint text-primary-dark font-bold text-xl tracking-tight w-full py-2 hover:bg-primary-tint/80 rounded-xl"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default ClothsSideMenu;
