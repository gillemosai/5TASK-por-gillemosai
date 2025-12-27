import React, { useEffect, useState } from 'react';
import { Mood } from '../types';
import { AVATAR_IMAGES } from '../constants';

interface EinsteinAvatarProps {
  mood: Mood;
  quote: string;
}

export const EinsteinAvatar: React.FC<EinsteinAvatarProps> = ({ mood, quote }) => {
  const [animateQuote, setAnimateQuote] = useState(false);

  useEffect(() => {
    setAnimateQuote(true);
    const timer = setTimeout(() => setAnimateQuote(false), 500);
    return () => clearTimeout(timer);
  }, [quote]);

  return (
    <div className="flex flex-col items-center justify-center p-4 mb-6 relative">
      {/* Speech Bubble */}
      <div 
        className={`bg-white text-slate-900 rounded-2xl p-4 mb-4 shadow-[0_0_15px_rgba(0,243,255,0.5)] 
        max-w-xs text-center border-2 border-neon-blue relative transform transition-all duration-300
        ${animateQuote ? 'scale-105' : 'scale-100'}`}
      >
        <p className="font-bold text-sm md:text-base font-mono">
          "{quote}"
        </p>
        {/* Triangle for bubble */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-neon-blue rotate-45"></div>
      </div>

      {/* Avatar Image Container */}
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <div className="absolute inset-0 bg-neon-pink rounded-full blur-lg opacity-40 animate-pulse"></div>
        <img 
          src={AVATAR_IMAGES[mood]} 
          alt={`Einstein ${mood}`}
          className="relative w-full h-full object-cover rounded-full border-4 border-neon-blue shadow-lg z-10 bg-slate-800 transition-all duration-500 ease-in-out"
        />
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 text-2xl animate-bounce-slow">⚛️</div>
      </div>
    </div>
  );
};