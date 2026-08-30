export function HeroBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#020202] pointer-events-none">
      
      {/* Dynamic Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          animation: 'grid-move 15s linear infinite',
        }}
      />

      {/* Massive Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF2020]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Vertical Data Streams (Matrix style minimal) */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes grid-move {
            0% { transform: perspective(1000px) rotateX(60deg) translateY(0) translateZ(-200px); }
            100% { transform: perspective(1000px) rotateX(60deg) translateY(4rem) translateZ(-200px); }
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

