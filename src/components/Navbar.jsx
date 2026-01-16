import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
            <h1
                className="text-sm font-bold tracking-[0.2em] uppercase text-white/80 cursor-pointer hover:text-white transition-colors"
                onClick={() => navigate('/')}
            >
                Switch
            </h1>
            <div className="flex gap-6 text-xs font-mono text-white/60 uppercase tracking-wider">
                <button
                    className="hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
