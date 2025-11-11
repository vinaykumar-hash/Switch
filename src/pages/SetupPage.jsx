import React, { useState, useEffect } from "react";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";

export default function SetupProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selected, setSelected] = useState(2);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const supabaseBase = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  const avatarFilenames = [
    "Profile.png",
    "Profile.png",
    "Profile.png",
    "Profile.png",
    "Profile.png",
  ];

  const avatars = avatarFilenames.map(
    (f) => `${supabaseBase}/storage/v1/object/public/avatars/${f}`
  );
  console.log("Avatar URLs:", avatars);

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const userObj = userData?.user;

      if (userError || !userObj) {
        console.error("Error fetching user:", userError);
        navigate("/login");
        return;
      }

      setUser(userObj);

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userObj.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      setProfile(profiles);
      setName(profiles.full_name || "");

      if (profiles.avatar_url) {
        setAvatarUrl(profiles.avatar_url);
        const idx = avatars.indexOf(profiles.avatar_url);
        if (idx !== -1) setSelected(idx);
      }
    };

    getProfile();
  }, [navigate]); 

  const handleSave = async () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userObj = userData?.user;
    if (userError || !userObj) {
      alert("No user found!");
      setLoading(false);
      return;
    }

    const avatarToSave = avatars[selected]; 
    console.log("Saving avatar URL to Supabase:", avatarToSave);
    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        avatar_url: avatarToSave,
      })
      .eq("id", userObj.id)
      .select();

    if (error) {
      console.error(error);
      alert("Error saving profile");
    } else {
      setAvatarUrl(avatarToSave);
      navigate("/");
      alert("Profile setup complete!");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white font-kollektif">
      <h2 className="text-2xl font-bold mb-8">Setup Your Avatar</h2>

      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Current avatar"
          className="w-24 h-24 rounded-full mb-6 border-2 border-pink-400 object-cover"
        />
      )}

      <div className="flex items-center justify-center gap-6 mb-8">
        {avatars.map((avatar, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`rounded-full p-[4px] transition-all duration-300 ${
              selected === index ? "border-2 border-pink-400 scale-110" : "opacity-60 hover:opacity-100"
            }`}
          >
            <img src={avatar} alt={`Avatar ${index + 1}`} className="w-24 h-24 rounded-full object-cover" />
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="NAME"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-[#1a1a1a] text-center text-gray-200 w-60 py-2 rounded-md outline-none border border-gray-700 focus:border-pink-400 placeholder-gray-500 tracking-wide uppercase"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-8 w-12 h-12 rounded-full bg-pink-400 text-black flex items-center justify-center hover:bg-pink-500 transition disabled:opacity-50"
      >
        {loading ? "..." : "➜"}
      </button>
    </div>
  );
}
