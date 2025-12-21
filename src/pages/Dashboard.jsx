import React, { useEffect, useState } from "react";
import supabase from "../supaBase";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import Main from "../../components/Main";
import Radio from "../../components/Radio";
import QuickBar from "../../components/QuickBar";
import MyGenerations from "../../components/MyGenerations";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showGenerations, setShowGenerations] = useState(false);


  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError);
        navigate("/login");
        return;
      }

      // console.log(" Logged in user:", user);
      setUser(user);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(" Error fetching profile:", profileError);
      } else {
        // console.log(" User profile:", profile);
      }
    };

    getProfile();
  }, [navigate]);

  return (
    <div className="text-white font-kollektif bg-[#111] h-screen w-screen overflow-hidden grid grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] cursor-none">
      {/* Header Area: Spans both columns at the top */}
      <div className="col-span-2 z-50">
        {user ? <Header userID={user.id} onShowGenerations={() => setShowGenerations(true)} /> : null}
      </div>

      {/* Sidebar/QuickBar Area: Left column, second row */}
      <div className="h-full z-[100]">
        <QuickBar />
      </div>

      {/* Main Content Area: Right column, second row */}
      <div className="relative overflow-hidden w-full h-full">
        {user ? <Main userID={user.id} /> : null}
      </div>

      <MyGenerations show={showGenerations} onClose={() => setShowGenerations(false)} userID={user?.id} />
      {/* <Radio/> */}
    </div>
  );
}
