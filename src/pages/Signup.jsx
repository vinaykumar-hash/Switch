/* eslint-disable */
import React, { useState, useEffect } from "react";
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
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center overflow-hidden font-fustat">
      {/* Background Grid */}
      <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Left Side - Branding */}


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

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-white/30 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
              type="button"
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: window.location.origin + '/setup'
                  }
                });
                if (error) alert(error.message);
              }}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-3 group"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 8.16-3.293 2.133-2.133 2.907-5.04 2.907-7.787 0-.76-.08-1.587-.133-2H12.48z" />
              </svg>
              Continue with Google
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
