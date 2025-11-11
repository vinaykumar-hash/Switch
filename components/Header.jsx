import React, { use } from 'react'
import supabase from '../src/supaBase'
import { useState,useEffect } from 'react'
import Hamburger from 'hamburger-react'
import { useNavigate } from 'react-router-dom'
function Header({userID}) {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigateToSetup = () => {
      
      navigate('/setup');
    };
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
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = "/login";
  };
  if (loading) return <p className="text-gray-400">Loading profile...</p>;
  return (
    <div className=' relative w-full bg-black/40 m-4 mt-0 flex justify-between items-center px-4 py-2 pl-6'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
         <div
          className={`absolute top-1/2 -translate-y-1/2 left-[-8rem] bg-black/70 text-white px-4 py-2 rounded-r-lg shadow-lg transition-all duration-500 ease-in-out ${
            isOpen ? "translate-x-[14rem] opacity-100" : "translate-x-0 opacity-0"
          }`}
        >
          <button
            onClick={handleLogout}
            className="text-md font-semibold hover:text-pink-400 transition-colors"
          >
            Logout
          </button>
        </div>
        <h2 className='font-kollektif '> Welcome back, {profile?.full_name}</h2>
        {profile?.avatar_url ? (
        <img
          onClick={navigateToSetup}
          src={profile.avatar_url}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-primary-tint object-cover shadow-lg cursor-pointer"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
          No Avatar
        </div>
      )}
    </div>
  )
}

export default Header