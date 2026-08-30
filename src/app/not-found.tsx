import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="absolute inset-0 z-[-1] overflow-hidden flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>
      <h1 className="text-8xl md:text-9xl font-bagel text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 tracking-wider">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-light text-white/80 mb-8">
        Page Not Found
      </h2>
      <p className="text-white/60 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
