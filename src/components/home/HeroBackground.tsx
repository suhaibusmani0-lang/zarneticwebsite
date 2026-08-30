export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020202] pointer-events-none">
      
      {/* Cinematic AI Generated Background Video Effect */}
      <div 
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] opacity-40 mix-blend-screen animate-ken-burns bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')"
        }}
      />

      {/* Massive Glowing Orbs for ambiance */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF2020]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Vertical Data Streams (Matrix style minimal) */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ken-burns {
            0% { transform: scale(1) translate(0, 0); }
            50% { transform: scale(1.15) translate(-2%, -2%); }
            100% { transform: scale(1) translate(0, 0); }
          }
          .animate-ken-burns {
            animation: ken-burns 40s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
        `
      }} />
    </div>
  );
}

