import React, { useState, useEffect } from "react";
import Prism from "../../components/reactbits/Prism.jsx";
import supabase from "../supaBase.js";
import { useNavigate } from "react-router-dom";
import ColorBends from "../../components/reactbits/ColorBends.jsx";
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
          navigate('/dashboard');
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
    <div className="relative bg-black overflow-hidden flex min-h-screen flex-col justify-center font-fustat">
      <div className="absolute z-0"></div>
      {/* <div style={{ position: 'absolute', overflow: 'hidden' }} className="z-0 w-full h-full">
  <FaultyTerminal
    scale={1.5}
    gridMul={[2, 1]}
    digitSize={1.2}
    timeScale={0.8}
    pause={false}
    scanlineIntensity={1}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    dither={0}
    curvature={0.1}
    tint="#A3B087"
    mouseReact={true}
    mouseStrength={0.5}
    pageLoadAnimation={false}
    brightness={0.1}
  />
</div> */}
{/* <img className="absolute blur-3xl" src="https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/generated-images/logos/signupBack.jpeg" alt="" /> */}
      {/* <div style={{ width: '100%', height: '100vh', position: 'absolute' }}>
          <Prism
            animationType="rotate"
            timeScale={0.1}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={0.25}
            noise={0}
            glow={1}
          />
          </div> */}
      <div className="relative z-10 flex flex-col justify-center mx-80 py-20 rounded-lg bg-primary-dark">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10 rounded-lg">
        <h2 className=" mt-10 text-center text-4xl font-bold tracking-tight text-white">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-10">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="font-fustat block text-sm font-medium text-gray-100"
            >
              Email 
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="font-fustat block w-full rounded-md bg-white/5 p-4 text-base text-white placeholder:text-gray-500 outline-none sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-fustat block text-sm font-medium text-gray-100"
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
                className="font-fustat block w-full rounded-md bg-white/5 p-4 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-primary sm:text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <div className='absolute h-1/2 w-3/4 bg-primary-tint rounded-t-full'></div>
        
            <button
              type="submit"
              disabled={loading}
              style={{backdropFilter:"blur(200px)"}}
              className="flex w-full justify-center bg-white/5 text-sm font-semibold text-white font-fustat hover:bg-primary-tint/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-tint px-6 py-2 rounded-full border border-white/10"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="font-fustat mt-10 text-center text-sm text-gray-400">
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
      
    </div>
  );
}
