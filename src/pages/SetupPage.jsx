import React, { useState, useEffect } from "react";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

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
    "p1.png",
    "p2.png",
    "p3.png",
    "p4.png",
    "p5.png",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] font-fustat text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg bg-black/40 border border-white/5 backdrop-blur-2xl rounded-[1rem] p-8 md:p-12 shadow-2xl ring-1 ring-white/10"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl font-black mb-3 tracking-tight bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">Welcome</h2>
          <p className="text-white/40 text-base font-medium">Create your identity to get started.</p>
        </motion.div>

        {/* Avatar Selection */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 text-center">Select Avatar</p>
          <div className="flex justify-center flex-wrap gap-5">
            {avatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`relative w-16 h-16 rounded-2xl transition-all duration-300 group ${selected === index
                  ? "ring-2 ring-offset-4 ring-offset-black ring-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "opacity-40 hover:opacity-100 hover:scale-105"
                  }`}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full rounded-2xl object-cover bg-[#1a1a1a]"
                />
                {selected === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1 shadow-lg"
                  >
                    <Check size={12} strokeWidth={4} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Name Input */}
        <motion.div variants={itemVariants} className="mb-12">
          <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-3 ml-1">Display Name</label>
          <div className="relative group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Designer"
              className="w-full bg-[#111] text-white px-6 py-4 rounded-xl outline-none border border-white/10 focus:border-white/30 focus:bg-[#161616] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.05)] transition-all placeholder:text-white/10 text-lg font-semibold tracking-wide"
            />
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleSave}
          disabled={loading || !name}
          className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
