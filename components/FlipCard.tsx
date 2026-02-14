
import React, { useState } from 'react';

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-72 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d`}
           style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-white border border-[#F2E8E1] rounded-3xl shadow-[0_10px_30px_-10px_rgba(188,84,73,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(188,84,73,0.15)] transition-all">
          <span className="text-[#BC5449] mb-3 uppercase tracking-[0.3em] text-[10px] font-bold">Thought</span>
          <h3 className="text-xl font-serif text-[#2D2926] text-center px-4 leading-relaxed">{front}</h3>
          <div className="mt-6 w-8 h-px bg-[#E07A5F]/20"></div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-8 bg-[#FDF8F5] border border-[#F2E8E1] rounded-3xl [transform:rotateY(180deg)] shadow-inner">
          <p className="text-[#9E7676] text-center leading-relaxed font-light italic text-base">
            "{back}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
