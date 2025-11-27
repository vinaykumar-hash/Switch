import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SelectedCloths from "./SelectedCloth";
import axios from "axios";
import heic2any from "heic2any";

function Main() {
  const dragRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRefR = React.useRef(null);
  const [isDraggingR, setIsDraggingR] = useState(false);
  const [offsetR, setOffsetR] = useState({ x: 0, y: 0 });
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || "");
  const [cloths, setCloths] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isDragging || !dragRef.current) return;

    dragRef.current.style.left = `${e.clientX - offset.x}px`;
    dragRef.current.style.top = `${e.clientY - offset.y}px`;
  };

  const handleMouseUp = () => setIsDragging(false);

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, [isDragging, offset]);
useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isDraggingR || !dragRefR.current) return;

    dragRefR.current.style.left = `${e.clientX - offsetR.x}px`;
    dragRefR.current.style.top = `${e.clientY - offsetR.y}px`;
  };

  const handleMouseUp = () => setIsDraggingR(false);

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, [isDraggingR, offsetR]);
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
    <div className=" flex flex-col items-center justify-start text-white w-full h-screen px-6 py-4 bg-primary-dark overflow-scroll scrollbar-hide relative bg-[linear-gradient(to_right,#3332_1px,transparent_1px),linear-gradient(to_bottom,#3332_1px,transparent_1px)] bg-[size:40px_40px]">
      {/* Title */}
      {/* form here */}
      <div ref={dragRef}
      onMouseDown={(e) => {
        const rect = dragRef.current.getBoundingClientRect();
        setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsDragging(true);
      }}
      style={{ position: "absolute", cursor: "grab" }}
      className="absolute bottom-0 flex flex-col sm:flex-row gap-6 w-full max-w-5xl">
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
                  <div className="absolute inset-0  bg-black/50  flex justify-center items-center gap-3">
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
          <p className="absolute top-0 left-0 ml-2 py-1 font-fustat font-semibold pl-2 bg-primary-dark/80 backdrop-blur-sm pr-2 text-white rounded-lg text-sm mt-2">Your Avatar</p>
        </div>

        
      </div>
      {/* to here */}
      <div className="fixed bottom-4 w-full flex justify-center z-10">
        <div className="flex w-full font-fustat font-black max-w-3xl bg-black/80 p-2 gap-3 shadow-md backdrop-blur-sm focus-within:backdrop-blur-2xl transition-all duration-300 ease-in-out rounded-lg">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Re-imagine Yourself.."
            className="flex-1 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={handleEnhance}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold aspect-square h-full rounded-full transition flex justify-center items-center"
          >
            <img src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Star2.png" className="h-1/2 hover:animate-spin transition-all" alt="" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary-tint text-white/80 font-fustat tracking-tight font-bold px-6 py-2 rounded-lg transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* Generated Output */}
      {resultUrl && (
  <div 
  ref={dragRefR}
      onMouseDown={(e) => {
        const rect = dragRefR.current.getBoundingClientRect();
        setOffsetR({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsDraggingR(true);
      }}
      style={{ position: "absolute", cursor: "grab" }}
  className="w-full max-w-5xl mt-6 mb-28 relative">
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
