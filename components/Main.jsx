import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SelectedCloths from "./SelectedCloth";
import axios from "axios";
import heic2any from "heic2any";

function Main() {
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || "");
  const [cloths, setCloths] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const loadCloths = () => {
      const stored = JSON.parse(localStorage.getItem("selectedCloths")) || [];
      setCloths(stored);
    };
    loadCloths();
    window.addEventListener("clothsUpdated", loadCloths);
    return () => window.removeEventListener("clothsUpdated", loadCloths);
  }, []);

  const uploadAvatarToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/temp/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.url) {
        localStorage.setItem("userAvatar", response.data.url);
        setAvatar(response.data.url);
        return response.data.url;
      } else throw new Error("Upload failed");
    } catch (error) {
      alert("Error uploading avatar: " + error.message);
      return null;
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let convertedFile = file;
    if (file.type === "image/heic" || file.type === "image/heif") {
      try {
        const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
        convertedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
      } catch {
        alert("Error converting HEIC. Please use JPG/PNG.");
        return;
      }
    }

    await uploadAvatarToServer(convertedFile);
  };

  const handleGenerate = async () => {
    if (loading) return;
    if (!localStorage.getItem("userAvatar")) return alert("Please upload an avatar first!");
    try {
      setLoading(true);
      setResultUrl("");
      const body = {
        id: localStorage.getItem("ProfileID"),
        imageUrls: [localStorage.getItem("userAvatar"), ...cloths],
        prompt,
      };
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/gemini/edit-image", body);
      if (response.data?.url) setResultUrl(response.data.url);
      else alert("No image URL returned by API");
    } catch (error) {
      alert("Error calling API: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhance = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/gemini/optimize-prompt", { prompt });
      if (response.data?.optimized_prompt) {
        const enhanced = response.data.optimized_prompt;
        const confirmReplace = window.confirm(
          `Enhanced Prompt:\n\n${enhanced}\n\nReplace current prompt?`
        );
        if (confirmReplace) setPrompt(enhanced);
      }
    } catch (error) {
      alert("Error enhancing prompt: " + error.message);
    } finally {
    }
  };

  const handleEdit = () => document.getElementById("avatarUpload").click();
  const handleDelete = () => {
    setAvatar("");
    localStorage.removeItem("userAvatar");
  };

  return (
    <div className="flex flex-col items-center justify-start text-white w-full h-screen px-6 py-4 bg-[#0e0e0e] overflow-scroll scrollbar-hide relative">
      {/* Title */}
      <h1 className="text-lg text-gray-300 mb-2 w-full max-w-5xl">
        Let’s Start <span className="font-semibold text-white">Fresh</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-5xl">
        <div className="flex flex-col items-center w-full sm:w-1/2">
          <div
            className="relative w-full aspect-square bg-white/10 rounded-lg flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {avatar ? (
              <>
                <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
                {hovering && (
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center gap-3">
                    <button
                      onClick={handleEdit}
                      className="bg-primary text-white p-2 rounded-full"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-primary-tint text-black p-2 rounded-full"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <label
                htmlFor="avatarUpload"
                className="text-gray-400 text-sm cursor-pointer hover:text-gray-200 transition"
              >
                Click to upload avatar
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-2">Your Avatar</p>
        </div>

        <div className="flex flex-col items-center w-full sm:w-1/2">
          <div className="w-full aspect-square bg-white/5 border border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            {cloths.length > 0 ? <SelectedCloths /> : "Select Cloths From Side Menu"}
          </div>
          <p className="text-gray-400 text-sm mt-2">Cloths</p>
        </div>
      </div>

      <div className="fixed bottom-4 w-full flex justify-center z-10">
        <div className="flex w-full max-w-5xl bg-white/20 p-3 gap-3 shadow-md backdrop-blur-3xl rounded-lg">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the style..."
            className="flex-1 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={handleEnhance}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            <img src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Star2.png" className="scale-110 hover:animate-spin transition-all" alt="" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary-tint text-black font-bold px-6 py-2 rounded-lg transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* Generated Output */}
      {resultUrl && (
  <div className="w-full max-w-5xl mt-6 mb-28 relative">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-gray-300 text-sm">Generated Output:</h2>
      <button
        onClick={() => setResultUrl("")}
        className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Delete
      </button>
    </div>

    <div className="relative group">
      <img
        src={resultUrl}
        alt="Generated Result"
        className="w-full max-h-[400px] object-contain rounded-lg border border-gray-700"
      />

      {/* Hover delete overlay (optional) */}
      <button
        onClick={() => setResultUrl("")}
        className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
      >
        Delete
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Main;
