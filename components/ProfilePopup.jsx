import React, { useState, useEffect } from "react";
import supabase from "../src/supaBase";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Camera, Save } from "lucide-react";

export default function ProfilePopup({ isOpen, onClose, currentUserProfile, onUpdate }) {
    const [name, setName] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState(0);
    const [loading, setLoading] = useState(false);

    const supabaseBase = (import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
    const avatarFilenames = [
        "p1.png",
        "p2.png",
        "p3.png",
        "p4.png",
        "p5.png",
    ];

    const avatars = avatarFilenames.map(
        (f) => `${supabaseBase}/storage/v1/object/public/avatars/${f}`
    );

    useEffect(() => {
        if (currentUserProfile) {
            setName(currentUserProfile.full_name || "");
            if (currentUserProfile.avatar_url) {
                const idx = avatars.indexOf(currentUserProfile.avatar_url);
                if (idx !== -1) setSelectedAvatar(idx);
            }
        }
    }, [currentUserProfile, isOpen]);

    const handleSave = async () => {
        if (!name.trim()) return;
        setLoading(true);

        try {
            const avatarToSave = avatars[selectedAvatar];
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: name,
                    avatar_url: avatarToSave,
                })
                .eq("id", currentUserProfile.id);

            if (error) throw error;

            onUpdate({ ...currentUserProfile, full_name: name, avatar_url: avatarToSave });
            onClose();
        } catch (error) {
            alert("Error updating profile: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-[#1a1a1a] border border-white/10 rounded-lg p-6 w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-fustat font-bold text-white">Edit Profile</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Avatar Selection */}
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-primary-tint mb-4 text-center">Choose Avatar</p>
                            <div className="flex justify-center flex-wrap gap-3">
                                {avatars.map((avatar, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedAvatar(index)}
                                        className={`relative w-14 h-14 rounded-full transition-all duration-200 ${selectedAvatar === index
                                            ? "ring-2 ring-primary-tint scale-110"
                                            : "opacity-60 hover:opacity-100 hover:scale-105"
                                            }`}
                                    >
                                        <img
                                            src={avatar}
                                            alt={`Avatar ${index + 1}`}
                                            className="w-full h-full rounded-full object-cover bg-black/30"
                                        />
                                        {selectedAvatar === index && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                                                <Check className="w-5 h-5 text-white drop-shadow-md" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold font-fustat uppercase  text-white/40 mb-2">Display Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-fustat"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-full bg-white text-black font-thin py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="h-5 w-5 font-fustat border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
