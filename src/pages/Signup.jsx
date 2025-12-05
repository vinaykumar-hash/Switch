/* eslint-disable */
import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
    useEffect(() => {

        const getProfile = async () => {
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
    
          if (userError) {
            console.error("Error fetching user:", userError);
            return;
          }
    
          if (user) {
            navigate('/dashboard');
          } else {
            
          }
        };
    
        getProfile();
      }, [navigate]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        alert(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        alert("Signup may have failed. Please try again.");
        setLoading(false);
        return;
      }

      if (authData.session) {
        navigate("/setup");
      } else {
        alert("Signup successful! Please check your email to confirm your account.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error during signup.");
    } finally {
      setLoading(false);
    }
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
            Join the new era of digital fashion. Generate, try-on, and modify clothing with the power of AI.
          </p>
        </div>
        <div className="w-full h-1/2 rounded-2xl bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}>
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
              Create your account
            </h2>
            <p className="text-white/60 mt-2">
              And start generating instantly.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg bg-white/5 px-4 py-3 text-base text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-tint transition-all"
                />
            </div>

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
                  placeholder="•••••••• (8+ characters)"
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
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-primary-tint hover:text-primary-tint/80 transition"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
