import React, { useState , useEffect } from "react";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
import ColorBends from "../../components/reactbits/ColorBends.jsx";
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
    <div className="relative overflow-hidden flex min-h-screen flex-col justify-center  bg-black font-fustat">
    {/* <img className="absolute blur-3xl" src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/signupBack.jpeg" alt="" /> */}
      <div className="relative z-10 flex flex-col justify-center mx-80 py-20 rounded-lg bg-primary-dark shadow-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10">
        <h2 className=" text-center text-2xl font-bold tracking-tight text-white">
          Let's get you started
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-10">
        <form className="space-y-6" onSubmit={handleSignup}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className=" block text-sm font-medium text-gray-100"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 p-4 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
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
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 p-4 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
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
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white/5 p-4 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
              />
            </div>
          </div>

          {/* Button */}
          <div className="relative">
            <div className='absolute h-1/2 w-3/4 bg-primary-tint rounded-t-full'></div>
        
            <button
              type="submit"
              disabled={loading}
              style={{backdropFilter:"blur(200px)"}}
              className="flex w-full justify-center bg-white/5 text-sm font-semibold text-white font-fustat hover:bg-primary-tint/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint px-6 py-2 rounded-full border border-white/10"
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
    </div>
  );
}
