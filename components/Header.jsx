import React, { use } from 'react'
import supabase from '../src/supaBase'
import { useState,useEffect } from 'react'
import Hamburger from 'hamburger-react'
import { useNavigate } from 'react-router-dom'
import MyGenerations from './MyGenerations'
function Header({userID}) {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showGenerations, setShowGenerations] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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
    <div className=' absolute top-0 z-100 w-full m-4 mb-0 mt-0 flex justify-center items-center px-4 py-2 pl-6 gap-2'>
        <div className='shadow-xl shadow-black/20 bg-black/10  font-fustat font-bold px-4 py-2 rounded-lg backdrop-blur-sm'>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <a onClick={()=>{setShowMenu(!showMenu)}} className='font-bold text-2xl px-2 cursor-pointer'>:</a></div>
        
        <div className={` shadow-xl shadow-black/20 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all ease-in-out duration-100 ${showMenu ? "scale-x-100 translate-x-0 ":"-translate-x-1/2 scale-x-0"} `}><a className='bg-black/10  font-fustat font-bold px-4 py-3 rounded-lg backdrop-blur-sm' onClick={()=>{setShowGenerations(!showGenerations)}}>My Switchs</a></div>
        <a className={`${showMenu ? "scale-x-100 translate-x-0 ":"-translate-x-1/2 scale-x-0"}`}><img className='w-10 rounded-full' src={profile.avatar_url} alt="" /></a>
        <MyGenerations show = {showGenerations} onClose={() => setShowGenerations(false)}/>

    </div>
  )
}

export default Header