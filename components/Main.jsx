import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SelectedCloths from "./SelectedCloth";
import axios from "axios";
import heic2any from "heic2any";

function Main() {
  const resultRefs = React.useRef([]);const [selectedBaseImage, setSelectedBaseImage] = useState(
  localStorage.getItem("selectedBaseImage") || null
);

  const [sizes, setSizes] = useState({}); 

  const dragRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRefR = React.useRef(null);
  const [isDraggingR, setIsDraggingR] = useState(false);
  const [offsetR, setOffsetR] = useState({ x: 0, y: 0 });
  const [avatar, setAvatar] = useState(localStorage.getItem("userAvatar") || "");
  const [cloths, setCloths] = useState([]);
  const [hovering, setHovering] = useState(false);
  const [results, setResults] = useState([]);
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
      className="noselect absolute top-20  flex flex-col sm:flex-row gap-6 w-full max-w-5xl">
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
            <img src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/Star2.png" className="h-1/2 hover:animate-spin duration-500 ease-initial transition-all" alt="" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary-tint text-white/80 font-fustat tracking-tight font-bold px-6 py-2 rounded-lg transition"
          >
            {loading ? "Generating" : "Generate"}
          </button>
        </div>
      </div>
      
      {/* Generated Output */}
      {results.length > 0 &&
  results.map((url, index) => {
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

      el.style.left = `${e.clientX - el.dataset.offsetX}px`;
      el.style.top = `${e.clientY - el.dataset.offsetY}px`;
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
        key={index}
        ref={ref}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          cursor: "grab",
          left: "60vw",
          top: `${20 + index * 15}px`,
          zIndex: 0+index,
          width: sizes[index]?.width || 300,
          height: sizes[index]?.height || 300,
        }}
        // className="w-[300px] aspect-square relative noselect rounded-lg"
        className="relative noselect rounded-lg  "
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300 text-sm font-fustat opacity-50 backdrop-blur-2xl bg-white/10 rounded-lg py-1 px-4 ">Generated Output {index +1}</h2>
          {/* <button
            onClick={() =>
              setResults((prev) => prev.filter((_, i) => i !== index))
            }
            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition"
          >
            Delete
          </button> */}
        </div>

        <div className="relative w-full h-full aspect-square rounded-lg overflow-hidden group">
          {/* <img
            src={url}
            alt="Generated Result"
            className="w-full h-full object-cover border border-gray-700"
          /> */}
          <div
              onClick={() => {
                setSelectedBaseImage(url);
                localStorage.setItem("selectedBaseImage", url);
              }}
              className="relative w-full h-full cursor-pointer"
            >
              <img
                src={url}
                alt="Generated Result"
                className="w-full h-full object-cover border border-gray-700"
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
            className=" font-fustat absolute top-3 right-3 bg-black/50 backdrop-blur-2xl hover:bg-black/70 
              text-white text-xs px-3 py-1 rounded-md opacity-0 
              group-hover:opacity-100 transition"
          >
            Delete
          </button>
          {selectedBaseImage === url && (
              <button
                onClick={() => {
                  setSelectedBaseImage(null);
                  localStorage.removeItem("selectedBaseImage");
                }}
                className="font-fustat absolute bottom-2 left-2 mt-2 text-xs bg-black/80 backdrop-blur-2xl px-3 py-1 rounded-lg"
              >
                Remove Base Image
              </button>
              
            )}
            <div
              onMouseDown={handleResizeMouseDown}
              className="absolute bottom-1 right-1 w-4  flex justify-end items-end cursor-se-resize"
            >
              <div className="w-4 h-4 bg-primary-dark rounded-lg"></div>
            </div>
        </div>
      </div>
    );
  })}



    </div>
  );
}

export default Main;
