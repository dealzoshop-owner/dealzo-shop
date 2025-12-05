import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Header />

      <main className="relative flex flex-col items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

        <div className="text-center max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-Powered Price Comparison
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 pb-2">
            Find the best price <br />
            <span className="text-indigo-500">in seconds.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Paste a product URL or search by name. We scan Amazon, Flipkart, Walmart, and more to find you the lowest price instantly.
          </p>

          <div className="pt-8">
            <SearchBar />
          </div>

          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Logos */}
            {['Amazon', 'Flipkart', 'Walmart', 'BestBuy'].map(store => (
              <div key={store} className="flex items-center justify-center font-bold text-xl text-white">
                {store}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 Dealzo. All rights reserved.</p>
      </footer>
    </div>
  );
}
