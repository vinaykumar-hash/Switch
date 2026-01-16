import React, { useEffect, useState } from "react";
import MyGenerationsCard from "./MyGenerationsCard";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
function MyGenerations({ show, onClose, userID }) {
  const [cloths, setCloths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchCloths = async () => {
      if (!userID) {
        // Only show error if we expected a user but didn't get one. 
        // Or handle gracefully.
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/gemini/generated-images/${userID}`
        );

        if (response.data.success) {
          setCloths(response.data.cloths);
        } else {
          setError("Failed to fetch your images");
        }
      } catch (err) {
        console.error("Error fetching creations:", err);
        setError("Error fetching creations");
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchCloths();
    }
  }, [userID, show]);

  const handleImageSelect = (imageUrl) => {
    const event = new CustomEvent('addResultToCanvas', { detail: imageUrl });
    window.dispatchEvent(event);
    onClose();
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/gemini/generated-images/${id}`, {
        data: { profileId: userID } // Send profileId for cache invalidation
      });

      if (response.data.success) {
        setCloths((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Error deleting image");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-screen w-full max-w-sm bg-black/50 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
        >
          {loading && (
            <div className="absolute h-full w-full bg-black/30 z-10 flex justify-center items-center">
              <div className="h-8 w-8 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          <header className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="font-fustat font-bold text-lg text-white">My Generations</h2>
            <button onClick={onClose} className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-none">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <div className="grid grid-cols-1 gap-4">
              {error ? (
                <p className="text-red-400 text-center py-10">{error}</p>
              ) : !loading && cloths.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No generations yet.</p>
              ) : (
                cloths.map((cloth) => <MyGenerationsCard key={cloth.id} cloth={cloth} onSelect={handleImageSelect} onDelete={handleDelete} />)
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MyGenerations;
