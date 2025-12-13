/* eslint-disable */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
      const getProfile = async () => {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
  
        if (userError) {
          console.error("Error fetching user:", userError);
          navigate("/login");
          return;
        }
  
        if (user) {
          navigate('https://switchstyle.app/dashboard');
        } else {
          
        }
      };
  
      getProfile();
    }, [navigate]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", data.user.id);

      if (profileError) {
        alert(profileError.message);
      } else {
        const profile = profiles && profiles[0]; 

        if (profile && profile.avatar_url) {
          navigate("/dashboard");
        } else {
          navigate("/setup");
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex overflow-hidden font-fustat">
      {/* Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Left Side - Branding */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col justify-center gap-10 w-1/2 min-h-screen p-12 bg-black z-10"
      >
        <div>
          <h1 className="font-jolly text-6xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-primary-tint">S</span>witch
          </h1>
          <p className="mt-4 text-white/60 max-w-md">
            Welcome back. Instantly generate, try-on, and modify clothing with the power of AI.
          </p>
        </div>
        <div className="w-full h-1/2 rounded-2xl bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Sign in to Switch
            </h2>
            <p className="text-white/60 mt-2">
              Enter your details below.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg bg-white/5 px-4 py-3 text-base text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-tint transition-all"
                />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg bg-white/5 px-4 py-3 text-base text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-tint transition-all"
                />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center bg-primary-tint text-black text-base font-bold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint px-6 py-3 rounded-lg transition-opacity mt-4 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            New here?{" "}
            <a
              href="/signup"
              className="font-semibold text-primary-tint hover:text-primary-tint/80 transition"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
