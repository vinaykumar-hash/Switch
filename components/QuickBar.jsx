import { Sidebar } from 'lucide-react'
import React from 'react'
import SideMenu from './SideMenu'
import { useState } from 'react'
function QuickBar() {
    const [Clothes,setClothes] = useState(false);
  return (
    <div className='z-50 h-screen absolute flex flex-row justify-center items-center pl-4 top-0 left-0'>
        <div className=' border border-white/10 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-4'>
        <ul className='flex flex-col justify-center items-center gap-4'>
            <li className='h-8 w-8 hover:scale-105 '><img src="../src/assets/SelectCursor.png" alt="" /></li>
            <li className='h-8 w-8 hover:scale-105 ' onClick={() => setClothes(prev => !prev)}><img src="../src/assets/Jacket.png" alt="" /></li>
            <li className='h-8 w-8 hover:scale-105 '><img src="../src/assets/Undo.png" alt="" /></li>
            <li className='h-8 w-8 hover:scale-105 '><img src="../src/assets/Mountain.png" alt="" /></li>
        </ul>
        
        </div>
        {Clothes? <SideMenu/>:null}
        
    </div>
  )
}

export default QuickBar