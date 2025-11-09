import React from 'react'
import { supabase } from '../src/supaBase'
import { useState,useEffect } from 'react'
import Hamburger from 'hamburger-react'
function Header({userID}) {
    const [isOpen, setOpen] = useState(false)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
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
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);
  if (loading) return <p className="text-gray-400">Loading profile...</p>;
  return (
    <div className='w-full bg-white/0 m-4 rounded-full flex justify-between items-center px-4 py-2 pl-6'>
        <Hamburger toggled={isOpen} toggle={setOpen} />
        {profile?.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover shadow-lg"
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