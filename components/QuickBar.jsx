import React, { useState } from 'react'
import SideMenu from './SideMenu'
import Artstyle from './Artstyle'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer2, Shirt, Palette, Undo2, MoreHorizontal } from 'lucide-react'

const QuickBarButton = ({ icon, label, onClick, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-3 rounded-lg transition-colors duration-200 cursor-none ${isActive ? 'bg-primary-tint text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
      >
        {icon}
      </button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden sm:block absolute left-full ml-3 px-3 py-1.5 bg-black border border-white/10 rounded-md text-sm font-fustat font-semibold whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function QuickBar() {
  const [activePanel, setActivePanel] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const togglePanel = (panelName) => {
    setActivePanel(prev => (prev === panelName ? null : panelName));
    setMobileMenuOpen(false);
  };

  const handleSelectClick = () => {
    setActivePanel(null);
    setMobileMenuOpen(false);
  }

  return (
    <>
      {/* Desktop QuickBar */}
      <div className='h-full hidden sm:flex flex-row items-start border-r border-white/10 bg-[#111] relative z-50'>
        <div className='w-16 h-full shadow-xl shadow-black/20 border-r border-white/10 bg-black/30 backdrop-blur-md p-2 flex flex-col gap-2 flex-shrink-0 z-50 relative'>
          <QuickBarButton
            icon={<MousePointer2 size={20} />}
            label="Select"
            onClick={() => setActivePanel(null)}
            isActive={activePanel === null}
          />
          <QuickBarButton
            icon={<Shirt size={20} />}
            label="Clothes"
            onClick={() => togglePanel('clothes')}
            isActive={activePanel === 'clothes'}
          />
          <QuickBarButton
            icon={<Palette size={20} />}
            label="Art Styles"
            onClick={() => togglePanel('artstyle')}
            isActive={activePanel === 'artstyle'}
          />
          <div className="w-full h-[1px] bg-white/10 my-1"></div>
          <button className="p-3 text-white/30 cursor-not-allowed cursor-none">
            <Undo2 size={20} />
          </button>
        </div>

        {/* Floating Panel */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-16 top-0 h-full z-40 bg-[#111] border-r border-white/10 shadow-2xl"
            >
              {activePanel === 'clothes' && <SideMenu />}
              {activePanel === 'artstyle' && <Artstyle />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Bar */}
      <div className={`sm:hidden fixed bottom-[6.5rem] left-0 right-0 z-50 p-4 flex-row justify-end items-center pointer-events-auto ${activePanel ? 'hidden' : 'flex'}`}>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='flex items-center gap-2 p-2 mr-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl'
            >
              <QuickBarButton
                icon={<MousePointer2 size={20} />}
                onClick={handleSelectClick}
                isActive={activePanel === null}
              />
              <QuickBarButton
                icon={<Shirt size={20} />}
                onClick={() => togglePanel('clothes')}
                isActive={activePanel === 'clothes'}
              />
              <QuickBarButton
                icon={<Palette size={20} />}
                onClick={() => togglePanel('artstyle')}
                isActive={activePanel === 'artstyle'}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="p-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
        >
          <MoreHorizontal size={24} className="text-white" />
        </button>
      </div>

      {/* Mobile Panels as Modals */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="sm:hidden fixed inset-0 z-[200] bg-black/80 backdrop-blur-lg pointer-events-auto"
          >
            <div className="w-full h-full pt-12 pb-24">
              {activePanel === 'clothes' && <SideMenu isMobile={true} />}
              {activePanel === 'artstyle' && <Artstyle isMobile={true} />}
            </div>
            <button
              onClick={() => setActivePanel(null)}
              className="absolute top-4 right-4 text-white/70 bg-white/10 py-2 px-4 rounded-full"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default QuickBar