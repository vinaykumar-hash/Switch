
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
  const [Prompt, setPrompt] = useState("");

  useEffect(() => {
  const loadCloths = () => {
    const stored = JSON.parse(localStorage.getItem("selectedCloths")) || [];
    setCloths(stored);
    console.log( cloths);
  };

  loadCloths();

  window.addEventListener("clothsUpdated", loadCloths);

  return () => {
    window.removeEventListener("clothsUpdated", loadCloths);
  };
}, []);

    const uploadAvatarToServer = async (file) => {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:5000/api/temp/upload-avatar",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data && response.data.url) {
          const uploadedUrl = response.data.url;
          localStorage.setItem("userAvatar", uploadedUrl);
          setAvatar(uploadedUrl);
          console.log(" Avatar uploaded:", uploadedUrl);
          return uploadedUrl;
        } else {
          throw new Error("No URL returned from upload API");
        }
      } catch (error) {
        console.error(" Error uploading avatar:", error.message);
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
      const blob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });
      convertedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
        type: "image/jpeg",
      });
      console.log("Converted HEIC → JPEG");
    } catch (error) {
      console.error("Error converting HEIC:", error);
      alert("Error converting HEIC image. Please try a JPG/PNG file instead.");
      return;
    }
  }

  const uploadedUrl = await uploadAvatarToServer(convertedFile);
  if (uploadedUrl) {
    setAvatar(uploadedUrl);
  }
};


  const handleEdit = () => {
    document.getElementById("avatarUpload").click();
  };

  const handleDelete = () => {
    setAvatar("");
    localStorage.removeItem("userAvatar");
  };

  const handleGenerate = async () => {
    if(loading) return;
      try {
        setLoading(true);
        setResultUrl("");

        // Fetch avatar URL from localStorage
        const storedAvatar = localStorage.getItem("userAvatar");

        if (!storedAvatar) {
          alert("Please upload an avatar first!");
          setLoading(false);
          return;
        }

        // Merge avatar URL + selected cloths
        const combinedImages = [storedAvatar, ...cloths];

        const body = {
          id: localStorage.getItem("ProfileID"),
          imageUrls: combinedImages,
          prompt: Prompt,
        };
        console.log(body)
        const response = await axios.post(
          "http://localhost:5000/api/gemini/edit-image",
          body,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("API response:", response.data);
        if (response.data && response.data.url) {
          setResultUrl(response.data.url);
        } else {
          alert("No image URL returned by API");
        }
      } catch (error) {
        console.error("Error calling API:", error);
        alert("Error calling API: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    const handleEnhance = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:5000/api/gemini/optimize-prompt",
          { prompt: Prompt },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.data?.optimized_prompt) {
          const enhancedPrompt = response.data.optimized_prompt;

          const confirmReplace = window.confirm(
            `Enhanced Prompt:\n\n${enhancedPrompt}\n\nDo you want to replace your current prompt with this optimized version?`
          );

          if (confirmReplace) {
            setPrompt(enhancedPrompt);
          }
        } else {
          alert("No enhanced prompt returned by API.");
        }
      } catch (error) {
        console.error("❌ Error enhancing prompt:", error);
        alert("Error enhancing prompt: " + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };



  return (
    <div className="m-4 text-white flex flex-col items-start justify-start gap-4 px-4 w-full">
      <h1 className="text-xl mb-2">Let's Start Fresh Today</h1>

      <div className="flex gap-6 w-full max-w-5xl flex-col sm:flex-row">
        <div className="flex flex-col items-center w-full sm:w-60 rounded-lg overflow-hidden relative">
          <div
            className="relative w-60 h-60 bg-white/10 overflow-hidden flex items-center justify-center"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {avatar ? (
              <>
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
                {hovering && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-all">
                    <button
                      onClick={handleEdit}
                      className="bg-primary hover:bg-primary p-2 rounded-full"
                      title="Edit Avatar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-primary-tint hover:bg-primary-tint/80 p-2 rounded-full"
                      title="Delete Avatar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <label className="text-gray-400 cursor-pointer text-sm text-center">
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                Click to upload Avatar
              </label>
            )}
          </div>

          <div className="absolute bottom-0 bg-blue-900/0 w-full py-2 rounded-b-xl text-center text-sm mt-[-4px]">
            Your Avatar
          </div>
        </div>

        <SelectedCloths />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-5xl mt-4">
        <input
        value={Prompt}
        onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Describe your expectations.."
          className="flex-1 bg-transparent border border-gray-700 rounded-md px-4 flex-wrap placeholder-gray-500 focus:outline-none"
        />
        <div className="flex gap-2 flex-col">
          <button
            onClick={handleEnhance}
            className="bg-primary text-white text-lg tracking-tight px-6 py-2 rounded-md w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? "Enhanceing..." : "Enhance Prompt"}
          </button>
          <button
            onClick={handleGenerate}
            className="bg-primary-tint text-black font-bold text-xl tracking-tight px-6 py-2 rounded-md w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {resultUrl && (
        <div className="w-full max-w-5xl mt-6">
          <h2 className="text-lg mb-2">Generated Output:</h2>
          <img
            src={resultUrl}
            alt="Generated Result"
            className="w-full max-h-[500px] object-contain rounded-lg border border-gray-700"
          />
        </div>
      )}

      <input
        id="avatarUpload"
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="hidden"
      />
    </div>
  );
}

export default Main;
