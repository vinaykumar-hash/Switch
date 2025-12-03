import React from 'react'
import Prism from '../../components/reactbits/Prism'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react';
function Lander() {
   const boxA = useRef();
  const boxB = useRef();
  const navigate = useNavigate();
  return (
    <div className='relative flex flex-col bg-primary-dark w-screen h-screen'>
      {/* <div  ref={boxA} className='h-2 w-2 bg-white absolute bottom-80 left-80'></div>
      <div  ref={boxB} className='h-2 w-2 bg-white absolute bottom-20 left-1/4'></div> */}
      
      <div className='relative '>
        {/* <div style={{ width: '100%', height: '100vh', position: 'absolute' }}>
          <Prism
            // animationType="rotate"
            // timeScale={0.1}
            // height={3} 
            // baseWidth={55}
            // scale={3}
            // hueShift={0.1}
            // colorFrequency={5}
            // noise={0}
            // glow={0.4}
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
        
        </div>
        
      <div className='relative gap-4 flex flex-col justify-center items-center h-full w-full bg-primary-dark/40 '>
      <div className='fixed top-0 p-4 sm:p-8 w-full flex  justify-between '>
        <h1 className='font-jolly text-4xl text-white '>Switch</h1>
        <button onClick={()=>{navigate('\login')}} className='shadow-xl shadow-black/10 bg-white text-primary-dark font-fustat font-bold tracking-tight px-4 text-lg py-1 rounded-full'>Log in</button>
      </div>
      <div className='relative rounded-full'>
        <p className='backdrop-blur-2xl z-10 relative text-white/60 mb-4 font-fustat font-normal tracking-tight bg-black/10 px-4 py-1 border-white/10 border rounded-full '>Powered by Google Nano Banana</p>
      <div className='z-0 w-3/4 h-2 bg-white absolute top-0 left-4'></div>
      
      </div>
      
      <p className='font-fustat text-6xl text-white tracking-tight'>Super <a className='font-semibold bg-primary-tint pr-2'>Charge Ideas</a></p>
      <p className='font-fustat text-6xl text-white tracking-tight'>with <a className='font-semibold'>Switch</a></p>
      <p className='text-white/80 font-fustat font-thin'>Generate 1000+ clothes with different art styles 
with no limits</p>
      <div className='relative'>
        <div className='absolute h-1/2 w-3/4 bg-primary-tint rounded-t-full'></div>
        <button onClick={()=>{navigate("/login")}} className='font-fustat text-white font-bold bg-black/80 px-6 py-2 rounded-full border border-white/20' style={{backdropFilter:"blur(200px)"}}>Get Started</button>
      </div>
      <div className='opacity-0 mt-8 flex justify-center items-start gap-4 text-white font-thin font-fustat text-lg tracking-tight'>
        <p className='flex flex-col items-center'>
          <p className='opacity-80'>State of the</p>
          <p className='-translate-y-1 opacity-70'>Art Image</p>
          <p className='-translate-y-2 opacity-60'>Generation</p>
          </p>
          <div style={{width:"2px"}} className='opacity-50 h-1/2 bg-gradient-to-b from-white/0 via-white/100 to-white/0
'></div>
        <p className='flex flex-col items-center'>
          <p className='opacity-80'>Access to </p>
          <p className='-translate-y-1 opacity-70'>Community</p>
          <p className='-translate-y-2 opacity-60'>Generated </p>
          <p className='-translate-y-3 opacity-50'>Clothes</p>
        </p>
          <div style={{width:"2px"}} className='opacity-50 h-1/2 bg-gradient-to-b from-white/0 via-white/100 to-white/0
'></div>
        <p className='flex flex-col items-center'>
          <p className='opacity-80'>20+</p>
          <p className='-translate-y-1 opacity-70'>Art Style</p>
          <p className='-translate-y-2 opacity-60'>Presets</p>
        </p>
      </div>
      </div>
      
    </div>
  )
}

export default Lander