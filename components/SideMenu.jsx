import React from 'react'
import { useState } from 'react'
import ClothsSideMenu from './ClothsSideMenu'
function SideMenu() {
    const [selected , setSelected] = useState(0)
  return (
            <div className="ml-8 max-w-96 bg-white/10 rounded-xl">
        {/* Outer flex — aligns buttons and dots side-by-side */}
        <div className="flex justify-between items-center rounded-xl p-2">
            {/* Button group (takes remaining space) */}
            <div className="flex w-full bg-white/5 rounded-xl overflow-hidden">
            <button
                className={`flex-1 py-2 text-white hover:bg-primary-dark transition rounded-l-xl ${
                selected === 0 ? "bg-primary-dark" : ""
                }`}
                onClick={() => setSelected(0)}
            >
                Cloths
            </button>
            <button
                className={`flex-1 py-2 text-white hover:bg-primary-dark transition rounded-r-xl ${
                selected === 1 ? "bg-primary-dark" : ""
                }`}
                onClick={() => setSelected(1)}
            >
                My Generations
            </button>
            </div>

            {/* Three-dot vertical menu — aligned center */}
            <div className="flex flex-col items-center justify-center gap-1 ml-4 mr-4">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
        </div>

        {/* Conditional content below */}
        {selected === 0 ? <ClothsSideMenu /> : null}
        </div>


  )
}

export default SideMenu