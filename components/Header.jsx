import React, { useState, useEffect, useRef } from 'react'
import supabase from '../src/supaBase'
import { useNavigate } from 'react-router-dom'
import MyGenerations from './MyGenerations'
import ProfilePopup from './ProfilePopup'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Image, UserPen } from 'lucide-react'

function Header({ userID, onShowGenerations }) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {


      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .single();

      if (profileError) {
        console.error("Error loading profile:", profileError);
      } else {
        setProfile(profileData);
        localStorage.setItem("ProfileID", profileData.id)
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.setItem("dashboardReloaded", "false");
    window.location.href = "/login";
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) return (
    <header className='absolute top-0 z-50 w-full p-4'>
      <div className='w-24 h-10 bg-black/20 backdrop-blur-sm rounded-lg animate-pulse'></div>
    </header>
  );

  return (
    <>
      <header className='w-full h-14 flex justify-between items-center pl-6 pr-0 border-b border-white/10 bg-[#111]'>
        <div className='text-white/60 font-fustat font-semibold px-4 py-2 rounded-lg'>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        <div ref={menuRef} onClick={() => setMenuOpen(!menuOpen)} className="relative w-14 h-full border-l border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
          <div className="rounded-full transition-transform hover:scale-105 flex items-center justify-center">
            <img className='w-9 h-9 rounded-full' src={profile.avatar_url} alt="User Avatar" />
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-14 right-0 w-56 bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl p-2 font-fustat"
                onClick={(e) => e.stopPropagation()} // Prevent closing when interacting with menu content
              >
                <div
                  className="px-3 py-2 border-b border-white/10 cursor-pointer hover:bg-white/5 rounded-t-lg transition-colors group"
                  onClick={() => {
                    setShowProfilePopup(true);
                    setMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white truncate">{profile.full_name}</p>
                      <p className="text-xs text-white/60 truncate">{profile.email}</p>
                    </div>
                    <UserPen size={14} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="py-2">
                  <button onClick={() => { onShowGenerations(); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-md transition-colors cursor-none">
                    <Image size={16} /> My Generations
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-md transition-colors cursor-none">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <ProfilePopup
        isOpen={showProfilePopup}
        onClose={() => setShowProfilePopup(false)}
        currentUserProfile={profile}
        onUpdate={handleProfileUpdate}
      />
    </>
  )
}

export default Header