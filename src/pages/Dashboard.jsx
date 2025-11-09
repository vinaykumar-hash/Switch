import React, { useEffect,useState } from "react";
import { supabase } from "../supaBase"; // ✅ import your Supabase client
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import Main from "../../components/Main";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      // Get logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError);
        navigate("/login");
        return;
      }

      console.log("✅ Logged in user:", user);
      setUser(user);

      // Get profile from 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("❌ Error fetching profile:", profileError);
      } else {
        console.log("✅ User profile:", profile);
      }
    };

    getProfile();
  }, [navigate]);

  return (
    <div className="text-white font-kollektif bg-[#111] min-h-screen flex items-center justify-start flex-col">
      {user ? <Header userID={user.id} /> : <p>Loading...</p>}
      <div className="flex items-start justify-start w-full">
        <SideMenu/>
        <Main/>
      </div>
    </div>
  );
}
