import React, { useState , useEffect } from "react";
import { supabase } from "../supaBase";
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

    // The 'name' is no longer used here, but will be collected on the setup page.
    const { email, password } = formData;

    try {
      // Step 1: Sign up the user. The trigger will automatically create the profile.
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

      // Step 2: Handle session and navigate
      if (authData.session) {
        // User is signed in (e.g., email confirmation is disabled)
        // The trigger has already created their profile.
        alert("Signup successful! Welcome.");
        navigate("/setup");
      } else {
        // User needs to confirm their email. The trigger has already created their profile.
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
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-primary-dark font-kollektif">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignup}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-100"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-primary-tint px-3 py-1.5 text-sm font-semibold text-primary-dark hover:bg-primary-tint/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-primary-tint/60 hover:text-primary-tint/80"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
