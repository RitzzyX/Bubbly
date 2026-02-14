
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- CONSTANTS ---
const NICKNAMES = {
  HER: "Vaibhavi",
  HIS: "Ritesh",
  SIDHU: "Sidhu",
  MUNCHKIN: "Munchkin",
  BUBS: "Bub's",
  BUBBLY: "Bubbly",
  LOVE: "Love",
  BABY: "Baby"
};

const AFFIRMATIONS = [
  { id: 1, front: "On Strength", back: "Your resilience and grace in every situation leave me in awe, Munchkin. You are my strongest pillar." },
  { id: 2, front: "On Beauty", back: "Beyond your stunning face, it's the beauty of your soul that captures me every single day, Bubbly." },
  { id: 3, front: "On Peace", back: "In this chaotic world, you are my sanctuary. Just a minute with you, Bub's, and everything feels right again." },
  { id: 4, front: "On Growth", back: "I love the person you are, and I am honored to witness the person you are becoming. I'm with you, always." },
  { id: 5, front: "On Connection", back: "Our souls didn't just meet; they recognized each other. You are my missing piece, Baby." },
  { id: 6, front: "On Kindness", back: "The way you care for the world makes me want to be a better man. Your heart is pure gold, Love." },
  { id: 7, front: "On Purpose", back: "You are the 'why' behind my hardest days and the 'how' behind my happiest ones." },
  { id: 8, front: "On Laughter", back: "Your laugh is my favorite symphony. I'd spend a thousand lifetimes just to keep you smiling." },
  { id: 9, front: "On Support", back: "In every dream you chase, I'll be the wind beneath your wings. You'll never walk alone, Vaibhavi." },
  { id: 10, front: "On Authenticity", back: "I love you most when you're just being you—messy hair, loud laughs, and all. You're perfect to me." },
  { id: 11, front: "On Home", back: "I used to look for home in places, but now I know home is wherever you are, my Love." },
  { id: 12, front: "On Forever", back: "Loving you isn't a choice; it's a destiny I'm grateful for every second. Happy Valentine's Day." }
];

// --- COMPONENTS ---

const TransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className={`transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );
};

const FlipCard: React.FC<{ front: string; back: string }> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div 
      className="perspective-1000 w-full h-72 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d`}
           style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-white border border-[#E4D3CC] rounded-3xl shadow-[0_10px_30px_-10px_rgba(62,29,29,0.1)]">
          <span className="text-[#AB272D] mb-3 uppercase tracking-[0.3em] text-[10px] font-bold">Thought</span>
          <h3 className="text-xl font-serif text-[#3E1D1D] text-center px-4 leading-relaxed">{front}</h3>
          <div className="mt-6 w-8 h-px bg-[#C85157]/20"></div>
        </div>
        <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-8 bg-[#EAC3B4] border border-[#E4D3CC] rounded-3xl [transform:rotateY(180deg)] shadow-inner">
          <p className="text-[#3E1D1D] text-center leading-relaxed font-light italic text-base">"{back}"</p>
        </div>
      </div>
    </div>
  );
};

// --- APP ---

type Step = 'PROPOSAL' | 'AFFIRMATIONS' | 'LETTER';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('PROPOSAL');
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [noCount, setNoCount] = useState(0);

  const moveButton = useCallback(() => {
    const btnWidth = 140;
    const btnHeight = 60;
    const padding = 50;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);
    setNoButtonPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
  }, []);

  const renderProposal = () => (
    <TransitionWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F5F5F5]">
        <div className="max-w-xl w-full text-center space-y-12">
          <div className="flex justify-center mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#AB272D] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative w-24 h-24 bg-white border border-[#E4D3CC] rounded-[2.5rem] flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(171,39,45,0.15)] transform rotate-12 transition-transform hover:rotate-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#AB272D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-[12px] uppercase tracking-[0.5em] text-[#C85157] font-bold">To My Forever {NICKNAMES.MUNCHKIN}</h2>
            <h1 className="text-5xl md:text-7xl font-serif text-[#3E1D1D] leading-[1.1] font-bold">
              {NICKNAMES.HER}, <br /> will you be my <span className="text-[#AB272D] italic">Valentine</span>?
            </h1>
            <p className="text-[#3E1D1D] opacity-70 font-light max-w-sm mx-auto text-base leading-relaxed">
              I built this little corner of the digital world just for you. Because you deserve to be celebrated every single day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
            <button 
              onClick={() => setCurrentStep('AFFIRMATIONS')}
              className="px-14 py-5 bg-[#AB272D] text-[#F5F5F5] rounded-full font-semibold shadow-[0_15px_35px_-10px_rgba(171,39,45,0.4)] hover:bg-[#C85157] transition-all hover:-translate-y-1 active:scale-95 w-full sm:w-auto z-10 text-lg"
            >
              Yes, I will
            </button>
            <button 
              onMouseEnter={moveButton}
              onClick={moveButton}
              style={noButtonPos ? { 
                position: 'fixed', 
                left: `${noButtonPos.x}px`, 
                top: `${noButtonPos.y}px`,
                zIndex: 50
              } : {}}
              className={`px-14 py-5 bg-white border-2 border-[#E4D3CC] text-[#3E1D1D] rounded-full font-semibold hover:bg-[#F5F5F5] evasive-transition w-full sm:w-auto ${noButtonPos ? 'shadow-2xl' : ''}`}
            >
              {noCount > 0 ? "You can't say no!" : "No"}
            </button>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );

  const renderAffirmations = () => (
    <TransitionWrapper>
      <div className="min-h-screen py-32 px-6 max-w-7xl mx-auto bg-[#F5F5F5]">
        <div className="text-center mb-24 space-y-6">
          <h3 className="text-[12px] uppercase tracking-[0.6em] text-[#C85157] font-bold">The Magic of Us</h3>
          <h2 className="text-4xl md:text-6xl font-serif text-[#3E1D1D] font-bold italic">Deep Truths & Simple Promises</h2>
          <div className="w-16 h-[2px] bg-[#AB272D]/20 mx-auto mt-8"></div>
          <p className="text-[#3E1D1D] opacity-70 max-w-xl mx-auto italic text-lg tracking-wide pt-4 font-light leading-relaxed">
            Every card here is a piece of my heart, {NICKNAMES.BUBBLY}. Tap to see why I'm so lucky to have you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {AFFIRMATIONS.map((aff) => (
            <FlipCard key={aff.id} front={aff.front} back={aff.back} />
          ))}
        </div>
        <div className="mt-32 text-center pb-20">
          <button 
            onClick={() => setCurrentStep('LETTER')}
            className="group inline-flex flex-col items-center gap-6 text-[#AB272D] font-semibold hover:text-[#C85157] transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] font-black text-[#C85157]">A deeper message awaits</span>
            <div className="flex items-center gap-3 text-xl font-serif italic border-b border-transparent group-hover:border-[#C85157] pb-2 transition-all">
              The Soul of This Place
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </TransitionWrapper>
  );

  const renderLetter = () => (
    <TransitionWrapper>
      <div className="min-h-screen bg-[#F5F5F5] py-24 px-6 md:px-12 flex justify-center overflow-y-auto">
        <article className="max-w-3xl w-full bg-white p-10 md:p-24 shadow-[0_30px_90px_-20px_rgba(62,29,29,0.1)] rounded-[3rem] border border-[#E4D3CC] relative">
          <header className="mb-20 pb-16 text-center border-b border-[#E4D3CC] relative">
            <p className="text-[#C85157] text-[12px] mb-6 font-black uppercase tracking-[0.6em]">Valentine's Day 2024</p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#3E1D1D] font-bold">My Beloved {NICKNAMES.HER}</h1>
          </header>
          <div className="letter-content space-y-8 text-[#3E1D1D] leading-[1.8] font-light text-lg md:text-xl tracking-tight">
            <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#AB272D] first-letter:mr-4 first-letter:float-left first-letter:font-bold first-letter:mt-1">
              My {NICKNAMES.BUBBLY}, my {NICKNAMES.BABY}, my forever {NICKNAMES.MUNCHKIN}.
            </p>
            <p>I don’t even know where to begin because every time I try to write about you, my heart becomes louder than my words. You are not just a part of my life. You are the softest part of it. The safest part of it. The brightest, warmest, most beautiful part of it.</p>
            <p>Before you, life was moving. After you, life started <span className="text-[#AB272D] italic font-normal">meaning</span> something. You walked into my world so quietly, like a gentle breeze, but somehow you became the air I breathe. I didn’t even realize when you stopped being “someone I love” and became “someone I can’t imagine a single day without.”</p>
            <p>{NICKNAMES.HER}, you don’t understand what you are to me. You are the person I think about when something good happens. You are the person I want when something bad happens. You are the first name my heart calls, even before my mind does.</p>
            <p>When you smile, something inside me settles. When you laugh, it feels like the world is okay. When you are sad, it genuinely hurts me, not because I can’t handle it, but because I wish I could take every bit of pain away from you and carry it myself.</p>
            <p>You are so much stronger than you think. So much kinder than the world deserves. So much more beautiful than you see in the mirror. {NICKNAMES.BUBS}, I don’t love you because you’re perfect. I love you because you’re real.</p>
            <p>I love your overthinking. I love your mood swings. I love the way you get emotional. I love the way you pretend to be strong but just want reassurance. I love the way you act tough but melt with affection. I love your clinginess. I love your independence. I love your softness. I love your fire. <span className="block mt-4 italic text-[#C85157]">You are my favorite contradiction.</span></p>
            <p>Sometimes I just sit and think, how did I get so lucky? How did the universe decide that I deserved someone like you? Someone who feels so deeply. Someone who loves so intensely. Someone who chooses me, every single day.</p>
            <p>You are not just my girlfriend. You are my peace. You are my comfort. You are my home. And home is not a place. <span className="text-[#AB272D] font-medium italic">It’s you.</span></p>
            <p>There are nights when I replay our conversations in my head just to feel close to you again. There are moments when I miss you so much that it physically aches. And yet, even in the distance, you feel close, because you live in my thoughts constantly.</p>
            <p>{NICKNAMES.HER}, you have seen sides of me that the world never will. The softer side. The scared side. The vulnerable side. The side that only feels safe because you’re there. You make me want to be better. Not because you demand it. But because loving you makes me want to deserve you.</p>
            <p>You calm my chaos. You balance my intensity. You understand my silence. You read my eyes. And that, that is rare. You are the only person who can quiet my storm without even trying.</p>
            <p>When I think about the future, I don’t see luxury or success first. I see you. I see us laughing over stupid things. I see us fighting and making up. I see us building something meaningful. I see you holding my hand in rooms full of people. I see you beside me when life gets hard. I see you when my hair turns grey.</p>
            <p>Because loving you is not a phase. It is not excitement. It is not infatuation. It is intentional. It is deep. It is permanent.</p>
            <p>You deserve a love that is patient. A love that reassures. A love that protects. A love that chooses you even on the difficult days. And I promise you, {NICKNAMES.MUNCHKIN}, I choose you.</p>
            <p>I choose you every single time. I love the way you care. I love the way you listen. I love the way you remember little details. I love how you make even ordinary days feel special. I love how you become childlike when you’re happy. I love how you soften when you feel safe.</p>
            <p>And I promise to always be the place where you feel safe. You will never have to shrink yourself with me. You will never have to hide your tears. You will never have to question if you are “too much.”</p>
            <p>If the world ever makes you doubt yourself, come to me. If your mind ever tells you you’re not enough, come to me. If you ever feel scared, tired, broken, come to me. Because I will remind you. Every time. That you are loved beyond measure.</p>
            <p>{NICKNAMES.HER}, I don’t just love you in the loud, romantic way. I love you in the quiet way too. In the way I pray for you. In the way I think about your happiness. In the way I plan for a future with you. In the way I imagine protecting your heart.</p>
            <p>You are my softness in a harsh world. My warmth in cold moments. My light when things feel dark. And if someday you forget how beautiful you are, I will spend the rest of my life reminding you.</p>
            <p>You are my {NICKNAMES.BUBS}. My {NICKNAMES.BUBBLY}. My {NICKNAMES.MUNCHKIN}. My {NICKNAMES.HER}. And loving you is the easiest, most natural thing I have ever done.</p>
          </div>
          <div className="mt-24 pt-16 border-t border-[#E4D3CC] flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="font-serif italic text-[#C85157] mb-4 text-xl">Forever yours,</p>
              <p className="text-4xl font-serif text-[#3E1D1D] font-bold tracking-tight">{NICKNAMES.SIDHU}</p>
              <p className="text-[#AB272D] text-[10px] uppercase tracking-[0.4em] font-black mt-2">The man who is completely, deeply, endlessly in love with you 💛</p>
            </div>
            <button 
              onClick={() => {
                setCurrentStep('PROPOSAL');
                setNoButtonPos(null);
                setNoCount(0);
                window.scrollTo(0, 0);
              }}
              className="text-[11px] uppercase tracking-[0.5em] text-[#C85157] hover:text-[#AB272D] transition-colors font-black flex items-center gap-3 border-b border-[#E4D3CC] pb-2"
            >
              Start Our Journey Again
            </button>
          </div>
        </article>
      </div>
    </TransitionWrapper>
  );

  return (
    <main className="selection:bg-[#EAC3B4] selection:text-[#AB272D]">
      {currentStep === 'PROPOSAL' && renderProposal()}
      {currentStep === 'AFFIRMATIONS' && renderAffirmations()}
      {currentStep === 'LETTER' && renderLetter()}
      <footer className="fixed bottom-8 left-0 w-full text-center pointer-events-none z-0">
        <p className="text-[10px] uppercase tracking-[0.6em] text-[#AB272D]/30 font-black">Handcrafted with devotion for {NICKNAMES.HER}</p>
      </footer>
    </main>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
