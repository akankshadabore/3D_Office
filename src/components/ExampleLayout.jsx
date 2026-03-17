export default function ExampleLayout() {
  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">

      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-surface-800/70 border-b border-surface-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent"
          >
            3D&nbsp;Office
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-surface-300">
            {['Dashboard', 'Rooms', 'Team', 'Settings'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="relative py-1 transition-colors hover:text-white
                    after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                    after:bg-primary-400 after:transition-all hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button className="px-5 py-2 text-sm font-semibold rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0">
            Get Started
          </button>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl animate-fade-in">
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary-600/20 text-primary-300 border border-primary-500/30">
            Virtual Workspace
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6">
            Your Office,{' '}
            <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Reimagined in 3D
            </span>
          </h1>

          <p className="text-lg text-surface-400 mb-10 leading-relaxed max-w-xl mx-auto">
            Collaborate with your team in an immersive virtual office.
            Walk between desks, join meetings, and stay connected — all from your browser.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 text-sm font-semibold rounded-xl bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-primary-500/40 hover:-translate-y-0.5">
              Enter Office
            </button>
            <button className="px-8 py-3 text-sm font-semibold rounded-xl bg-surface-800 hover:bg-surface-700 text-surface-200 border border-surface-600 transition-all hover:-translate-y-0.5">
              Learn More
            </button>
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-surface-800/40 backdrop-blur-xl border border-surface-700/50 shadow-2xl animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { icon: '🏢', title: 'Virtual Rooms', desc: 'Create custom 3D rooms for every team' },
                { icon: '🎥', title: 'Live Presence', desc: 'See who\'s online with real-time avatars' },
                { icon: '⚡', title: 'Instant Meetings', desc: 'Walk up to a colleague to start talking' },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-4 rounded-xl bg-surface-700/30 hover:bg-surface-700/50 transition-colors group"
                >
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">
                    {card.icon}
                  </span>
                  <h3 className="text-sm font-semibold text-white mb-1">{card.title}</h3>
                  <p className="text-xs text-surface-400">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
