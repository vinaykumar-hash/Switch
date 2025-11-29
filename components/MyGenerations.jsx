import React, { useEffect, useState } from "react";
import MyGenerationsCard from "./MyGenerationsCard";
import axios from "axios";

function MyGenerations({show, onClose}) {
  const [cloths, setCloths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileId = localStorage.getItem("ProfileID");
  
  useEffect(() => {
    const fetchCloths = async () => {
      if (!profileId) {
        setError("Profile ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL+`/api/gemini/generated-images/${profileId}`
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

    fetchCloths();
  }, [profileId]);

  return (
    <>
    {show ? (
      <div className="backdrop-blur-2xl bg-black/60 border-l border-white/20 flex flex-col h-screen fixed top-0 right-0 px-4 pb-8 pt-4">
      {loading && (
        <div className="absolute h-full w-full bg-white/10 backdrop-blur-3xl z-10 flex justify-center items-center">
          <div className="h-10 w-10 bg-white animate-spin rounded-full"></div>
        </div>
      )}

      <div className="relative flex-1 overflow-y-auto  scrollbar-hide">
        <h2 className=" sticky top-0 z-50 flex justify-end mb-2 text-gray-200 py-2 pb-4 pr-2">
          <div onClick={onClose} className="h-1 w-6 bg-white/60 border border-white rounded-lg"></div>
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {error ? (
            <p className="text-red-400">{error}</p>
          ) : cloths.length === 0 ? (
            <p className="text-gray-400">No generated creations yet.</p>
          ) : (
            cloths.map((cloth) => (
              <MyGenerationsCard key={cloth.id} url={cloth.image_url} prompt={cloth.prompt} ele={cloth}/>
            ))
          )}
        </div>
      </div>
    </div>
    ) : (<></>)}
    </>
    
  );
}

export default MyGenerations;
