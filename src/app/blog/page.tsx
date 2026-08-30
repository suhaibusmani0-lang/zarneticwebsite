import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog & Insights | Zarnetic — Tech, SEO & Digital Marketing Articles',
  description: 'Read expert insights from Zarnetic on web development, SEO strategies, digital marketing trends, cloud computing, AI, and business compliance in India.',
  alternates: {
    canonical: 'https://zarnetic.com/blog'
  }
}

export default function BlogHub() {
  const posts = [
    {
      id: 1,
      title: 'Why Next.js is the Future of Web Development in 2025',
      category: 'Web Development',
      date: 'Aug 30, 2026',
      excerpt: 'Discover why top companies are migrating to Next.js for better performance, SEO, and developer experience in the modern web era.',
      href: '#'
    },
    {
      id: 2,
      title: 'Top 10 SEO Strategies for Small Businesses in Delhi',
      category: 'SEO',
      date: 'Aug 25, 2026',
      excerpt: 'Learn actionable local SEO tactics to rank higher on Google Maps and search results to drive foot traffic and online sales.',
      href: '#'
    },
    {
      id: 3,
      title: 'How AI is Transforming Business Operations in India',
      category: 'AI & Technology',
      date: 'Aug 20, 2026',
      excerpt: 'From automated customer support to predictive analytics, explore how artificial intelligence is reshaping Indian businesses.',
      href: '#'
    }
  ]

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bagel mb-6">Blog & Insights</h1>
        <p className="text-xl text-white/60">
          Expert articles on web development, SEO strategies, digital marketing, and tech trends to help your business grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {posts.map((post) => (
          <div key={post.id} className="group flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider px-3 py-1 bg-white/10 text-white/80 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-white/40">{post.date}</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                <Link href={post.href}>{post.title}</Link>
              </h2>
              <p className="text-white/60 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            <Link 
              href={post.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors"
            >
              Read More 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center p-12 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
        <h3 className="text-2xl font-semibold mb-4">More Articles Coming Soon</h3>
        <p className="text-white/60 max-w-md mx-auto">
          Our team is working on deep-dive tutorials, case studies, and industry analyses. Subscribe to our newsletter to get notified.
        </p>
      </div>
    </div>
  )
}
