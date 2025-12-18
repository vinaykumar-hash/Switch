import React, { useState, useEffect } from "react";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowRight, Check, Camera } from "lucide-react";

export default function SetupProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selected, setSelected] = useState(2);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const supabaseBase = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
  // Using the same filenames as before
  const avatarFilenames = [
    "Profile.png",
    "Profile.png",
    "Profile1.png",
    "Profile2.png",
    "Profile.png",
  ];

  const avatars = avatarFilenames.map(
    (f) => `${supabaseBase}/storage/v1/object/public/avatars/${f}`
  );

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const userObj = userData?.user;

      if (userError || !userObj) {
        navigate("/login");
        return;
      }

      setUser(userObj);

      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userObj.id)
        .single();

      if (profileError) return;

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
    if (!name.trim()) return;

    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const userObj = userData?.user;

    if (userObj) {
      const avatarToSave = avatars[selected];

      await supabase
        .from("profiles")
        .update({
          full_name: name,
          avatar_url: avatarToSave,
        })
        .eq("id", userObj.id);

      setAvatarUrl(avatarToSave);
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-primary-dark font-fustat text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-tint/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome</h2>
          <p className="text-white/50 text-sm">Let's set up your creative profile.</p>
        </div>

        {/* Avatar Selection */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-tint mb-4 text-center">Choose Avatar</p>
          <div className="flex justify-center flex-wrap gap-4">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`relative w-16 h-16 rounded-full transition-all duration-300 group ${selected === index
                  ? "ring-2 ring-offset-2 ring-primary-tint ring-offset-primary-dark scale-110"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full rounded-full object-cover bg-black/20"
                />
                {selected === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                    <Check className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div className="mb-10">
          <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2 ml-1">Display Name</label>
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-black/20 text-white px-5 py-4 rounded-xl outline-none border border-white/10 focus:border-primary-tint/50 transition-colors placeholder:text-white/20 text-lg font-medium"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSave}
          disabled={loading || !name}
          className="w-full py-4 rounded-xl bg-white text-primary-dark font-bold text-lg hover:bg-primary-tint hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <span>Saving...</span>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
