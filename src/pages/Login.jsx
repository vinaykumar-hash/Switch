import React, { useState, useEffect } from "react";

import { supabase } from "../supaBase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
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
          navigate('/');
          // setUser(user);
          // const { data: profiles, error: profileError } = await supabase
          //   .from("profiles")
          //   .select("*")
          //   .eq("id", user.id)
          //   .single();
  
          // if (profileError) {
          //   console.error("Error fetching profile:", profileError);
          //   // If profile doesn't exist, it's fine, we'll create it.
          // } else {
          //   setProfile(profiles);
          //   setName(profiles.full_name || "");
          //   // Find the index of the current avatar_url if it exists
          //   const currentAvatarIndex = avatars.indexOf(profiles.avatar_url);
          //   if (currentAvatarIndex !== -1) {
          //     setSelected(currentAvatarIndex);
          //   }
          // }
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
          navigate("/");
        } else {
          navigate("/setup");
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-primary-dark font-kollektif">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-primary-tint px-3 py-1.5 text-sm font-semibold text-primary-dark hover:bg-primary-tint/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          New here?{" "}
          <a
            href="/signup"
            className="font-semibold text-primary-tint/60 hover:text-primary-tint/80"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
