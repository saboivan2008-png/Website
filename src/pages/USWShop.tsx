import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function USWShop() {
  const [activeCategory, setActiveCategory] = useState('mikiny');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('status', '!=', 'hidden'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayProducts = products.filter(p => p.category === activeCategory);
  const categories = ['mikiny', 'tepláky', 'tričká', 'tenisky', 'bundy', 'pomôcky'];

  return (
    <div className="min-h-[100dvh] bg-black font-sans text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link to="/" className="text-white hover:text-zinc-400 transition-colors flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em]">
          <ArrowLeft className="w-4 h-4" /> Späť
        </Link>
        <div className="font-black text-xl tracking-tighter">U.S.W</div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-zinc-500 font-black text-xs tracking-[0.3em] uppercase mb-4">Streetwear</h2>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Store
            </h1>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-black uppercase tracking-widest pb-1 border-b-2 transition-colors ${
                  activeCategory === cat ? 'border-white text-white' : 'border-transparent text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-zinc-600 font-black uppercase text-sm tracking-widest animate-pulse">
            Načítavam kolekciu...
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product, index) => {
              const isSoldOut = product.status === 'sold_out';

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group flex flex-col ${isSoldOut ? 'opacity-50' : 'cursor-pointer'}`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-6">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isSoldOut ? 'grayscale' : 'group-hover:scale-105'}`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-4xl">
                        U.S.W
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    {isSoldOut && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                        <span className="bg-white text-black px-4 py-2 font-black text-xs uppercase tracking-[0.3em]">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight mb-1">{product.name}</h3>
                      <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                        {product.color}
                      </p>
                    </div>
                    <div className="text-lg font-black tracking-tighter">
                      {product.price}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-zinc-600 font-black uppercase text-sm tracking-widest">
            V tejto kategórii zatiaľ nič nie je.
          </div>
        )}
      </main>
    </div>
  );
}
