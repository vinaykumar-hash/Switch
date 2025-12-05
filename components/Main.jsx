import React, { useState, useEffect } from "react";
import { Pencil, Trash2, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";
import SelectedCloths from "./SelectedCloth";
import axios from "axios";
import heic2any from "heic2any";

function Main() {
  const resultRefs = React.useRef([]);const [selectedBaseImage, setSelectedBaseImage] = useState(
  localStorage.getItem("selectedBaseImage") || null
);

  const [sizes, setSizes] = useState({}); 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || "");
  const [cloths, setCloths] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [results, setResults] = useState([]);
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

  useEffect(() => {
    const handleAddResult = (event) => {
      const imageUrl = event.detail;
      if (imageUrl) {
        setResults(prev => [...prev, imageUrl]);
      }
    };

    window.addEventListener('addResultToCanvas', handleAddResult);

    return () => window.removeEventListener('addResultToCanvas', handleAddResult);
  }, []);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
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

    const body = {
      id: localStorage.getItem("ProfileID"),
      imageUrls: [
          selectedBaseImage || localStorage.getItem("userAvatar"),
          ...cloths,
        ],
      prompt: prompt + " " + localStorage.getItem("selectedArtstylePrompt"),
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/gemini/edit-image",
      body
    );

    if (response.data?.url) {
      setResults(prev => {
        const newIndex = prev.length;
        setSizes((s) => ({
          ...s,
          [newIndex]: { width: 300, height: 300 }
        }));
        return [...prev, response.data.url];
      });
  // append
    } else {
      alert("No image URL returned by API");
    }
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
    <div className="text-white w-full min-h-screen sm:h-screen bg-primary-dark relative bg-[linear-gradient(to_right,#3332_1px,transparent_1px),linear-gradient(to_bottom,#3332_1px,transparent_1px)] bg-[size:40px_40px] flex flex-col-reverse sm:flex-row overflow-y-auto sm:overflow-hidden sm:cursor-none pb-40 sm:pb-0">
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[100] hidden sm:block" animate={{ x: mousePosition.x, y: mousePosition.y }} transition={{ duration: 0 }}>
        <MousePointer2 className="text-white" fill="black" size={24} />
      </motion.div>

      {/* Left Panel: Canvas & Results */}
      <div className="flex-1 h-full relative p-4 sm:pt-24">
        <div className="w-full h-full min-h-[50vh] sm:min-h-0 border-2 border-dashed border-white/10 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-fustat text-2xl text-white/10">Canvas</p>
          </div>
          {/* Generated Output */}
          {results.length > 0 && results.map((url, index) => (
            <GeneratedResult
              key={index}
              index={index}
              url={url}
              sizes={sizes}
              setSizes={setSizes}
              resultRefs={resultRefs}
              selectedBaseImage={selectedBaseImage}
              setSelectedBaseImage={setSelectedBaseImage}
              setResults={setResults}
            />
          ))}
        </div>
      </div>

      {/* Right Panel: Inputs */}
      <div className="w-full sm:max-w-xs flex-shrink-0 sm:h-full flex flex-col gap-4 p-4 pt-24">
        {/* Avatar Input */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-3 backdrop-blur-md space-y-2">
          <h2 className="font-fustat font-semibold text-white/80 px-1">Your Avatar</h2>
          <div className="relative w-full aspect-square bg-white/5 rounded-lg flex items-center justify-center overflow-hidden" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
              {avatar ? (
                <>
                  <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
                  {hovering && (
                    <div className="absolute inset-0 bg-black/60 flex justify-center items-center gap-4">
                      <button onClick={handleEdit} className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors cursor-none" title="Change Avatar">
                        <Pencil size={18} />
                      </button>
                      <button onClick={handleDelete} className="bg-red-500/20 text-red-400 p-3 rounded-full hover:bg-red-500/30 transition-colors cursor-none" title="Delete Avatar">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <label htmlFor="avatarUpload" className="text-center text-gray-400 text-sm cursor-pointer hover:text-gray-200 transition p-4 sm:cursor-none">
                  Click to upload avatar
                  <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              )}
          </div>
        </div>

        {/* Selected Cloths Input */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-3 backdrop-blur-md sm:flex-1 flex flex-col">
          <h2 className="font-fustat font-semibold text-white/80 px-1 mb-2">Selected Clothes</h2>
          <SelectedCloths />
        </div>
      </div>

      <div className="fixed bottom-0 sm:bottom-4 w-full flex justify-center z-10 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row font-fustat font-black w-full max-w-3xl bg-black/80 p-2 gap-2 sm:gap-3 shadow-md backdrop-blur-sm focus-within:backdrop-blur-2xl transition-all duration-300 ease-in-out rounded-lg">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Re-imagine Yourself.."
            className="w-full sm:flex-1 bg-transparent text-gray-200 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleEnhance}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold p-3 sm:aspect-square sm:h-full rounded-lg sm:rounded-full transition flex justify-center items-center sm:cursor-none"
            >
              <img src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Star2.png" className="h-5 sm:h-1/2 hover:animate-spin duration-500 ease-initial transition-all" alt="" />
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 bg-primary-tint text-black font-fustat tracking-tight font-bold px-6 py-3 sm:py-2 rounded-lg transition hover:opacity-90 disabled:opacity-50 sm:cursor-none"
            >
              {loading ? "Generating" : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const GeneratedResult = ({ index, url, sizes, setSizes, resultRefs, selectedBaseImage, setSelectedBaseImage, setResults }) => {
  const handleResizeMouseDown = (e) => {
      e.stopPropagation(); // Don’t trigger drag
      const startX = e.clientX;
      const startY = e.clientY;

      const initialWidth = sizes[index]?.width || 300;
      const initialHeight = sizes[index]?.height || 300;

      const onMouseMove = (moveEvent) => {
        const newWidth = initialWidth + (moveEvent.clientX - startX);
        const newHeight = initialHeight + (moveEvent.clientY - startY);

        setSizes((prev) => ({
          ...prev,
          [index]: {
            width: Math.max(150, newWidth),   // minimum size
            height: Math.max(150, newHeight),
          }
        }));
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

  const ref = (el) => (resultRefs.current[index] = el);

  const handleMouseDown = (e) => {
    const el = resultRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    el.dataset.dragging = "true";

    el.dataset.offsetX = e.clientX - rect.left;
    el.dataset.offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const el = resultRefs.current[index];
    if (!el || el.dataset.dragging !== "true") return;

    const parent = el.offsetParent;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    let newLeft = e.clientX - parentRect.left - parseFloat(el.dataset.offsetX);
    let newTop = e.clientY - parentRect.top - parseFloat(el.dataset.offsetY);

    // Constrain movement within the parent canvas
    const minX = 0;
    const minY = 0;
    const maxX = parentRect.width - elRect.width;
    const maxY = parentRect.height - elRect.height;

    newLeft = Math.max(minX, Math.min(newLeft, maxX));
    newTop = Math.max(minY, Math.min(newTop, maxY));
    
    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
  };

  const handleMouseUp = () => {
    const el = resultRefs.current[index];
    if (!el) return;
    el.dataset.dragging = "false";

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        cursor: "grab",
        left: "50px",
        top: `${120 + index * 20}px`,
        zIndex: 10 + index,
        width: sizes[index]?.width || 300,
        height: sizes[index]?.height || 300,
      }}
      className="relative noselect rounded-lg bg-black/30 border border-white/10 backdrop-blur-md shadow-2xl"
    >
      <div className="absolute -top-8 left-0">
        <h2 className="text-gray-300 text-sm font-fustat bg-black/50 backdrop-blur-lg rounded-t-lg py-1 px-3">Result {index + 1}</h2>
      </div>

      <div className="relative w-full h-full rounded-lg overflow-hidden group">
          <div
              onClick={() => {
                setSelectedBaseImage(url);
                localStorage.setItem("selectedBaseImage", url);
              }}
              className="relative w-full h-full cursor-pointer sm:cursor-none"
            >
              <img
                src={url}
                alt="Generated Result"
                className="w-full h-full object-cover"
              />

              {selectedBaseImage === url && (
                <div className="absolute top-2 left-2 bg-primary-dark/80 backdrop-blur-lg px-3 py-1 rounded-md text-xs font-fustat text-white">
                  Base Image
                </div>
              )}
            </div>
          <button
            onClick={() =>
              setResults((prev) => prev.filter((_, i) => i !== index))
            }
            className="font-fustat absolute top-2 right-2 bg-black/50 backdrop-blur-lg p-1.5 rounded-full text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity sm:cursor-none"
          >
            <Trash2 size={14} />
          </button>
          {selectedBaseImage === url && (
              <button
                onClick={() => {
                  setSelectedBaseImage(null);
                  localStorage.removeItem("selectedBaseImage");
                }}
                className="font-fustat absolute bottom-2 left-2 text-xs bg-black/80 backdrop-blur-lg px-3 py-1 rounded-lg sm:cursor-none"
              >
                Remove Base Image
              </button>
            )}
            <div
              onMouseDown={handleResizeMouseDown}
              className="absolute bottom-0 right-0 w-5 h-5 flex items-center justify-center cursor-se-resize"
            >
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
      </div>
    </div>
  );
};

export default Main;
