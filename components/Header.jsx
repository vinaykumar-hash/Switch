import React, { use } from 'react'
import supabase from '../src/supaBase'
import { useState,useEffect } from 'react'
import Hamburger from 'hamburger-react'
import { useNavigate } from 'react-router-dom'
function Header({userID}) {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigateToSetup = () => {
      
      navigate('/setup');
    };
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
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = "/login";
  };
  if (loading) return <p className="text-gray-400">Loading profile...</p>;
  return (
    <div className=' absolute top-0 z-50 w-full m-4 mb-0 mt-0 flex justify-center items-center px-4 py-2 pl-6'>
        <div className=' bg-black/10  font-fustat font-bold px-4 py-2 rounded-lg backdrop-blur-sm'>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <a className='font-bold text-2xl px-2 cursor-pointer'>:</a></div>
    </div>
  )
}

export default Header