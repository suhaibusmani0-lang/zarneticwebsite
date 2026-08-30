export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bagel text-white animate-pulse tracking-widest">
          ZARNETIC
        </h1>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce"></div>
        </div>
      </div>
    </div>
  )
}
