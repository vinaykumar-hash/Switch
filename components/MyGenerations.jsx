import React, { useEffect, useState } from "react";
import MyGenerationsCard from "./MyGenerationsCard";
import axios from "axios";

function MyGenerations() {
  const [cloths, setCloths] = useState([]); // store fetched images
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileId = localStorage.getItem("ProfileID"); // 👈 read from localStorage

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
          `http://localhost:5000/api/gemini/generated-images/${profileId}`
        );

        if (response.data.success) {
          setCloths(response.data.cloths);
        } else {
          setError("Failed to fetch your images");
        }
      } catch (err) {
        console.error("Error fetching cloths:", err);
        setError("Error fetching cloths");
      } finally {
        setLoading(false);
      }
    };

    fetchCloths();
  }, [profileId]);

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
            <MyGenerationsCard url={cloth.image_url} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyGenerations;
