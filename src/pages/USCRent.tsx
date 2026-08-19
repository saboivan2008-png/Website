import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function USCRent() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'vehicles'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicles(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black font-sans text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link to="/" className="text-white hover:text-zinc-400 transition-colors flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em]">
          <ArrowLeft className="w-4 h-4" /> Späť
        </Link>
        <div className="font-black text-xl tracking-tighter">U.S.C</div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-zinc-500 font-black text-xs tracking-[0.3em] uppercase mb-4">Garage</h2>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Rent A Wheel
          </h1>
        </motion.div>
      </header>

      {/* Fleet Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-zinc-600 font-black uppercase text-sm tracking-widest animate-pulse">
            Načítavam garáž...
          </div>
        ) : vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {vehicles.map((v, idx) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden mb-6">
                  {v.image ? (
                    <img 
                      src={v.image} 
                      alt={v.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-800 font-black text-4xl">
                      U.S.C
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {v.status === 'available' && (
                      <span className="bg-white text-black px-3 py-1 font-black text-xs uppercase tracking-widest">
                        Dostupné
                      </span>
                    )}
                    {v.status === 'rented' && (
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs uppercase tracking-widest">
                        Zapožičané
                      </span>
                    )}
                    {v.status === 'maintenance' && (
                      <span className="bg-zinc-800 text-white px-3 py-1 font-black text-xs uppercase tracking-widest">
                        V servise
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-1">{v.name}</h3>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                      Typ: {v.type}
                    </p>
                  </div>
                  
                  <button 
                    disabled={v.status !== 'available'}
                    className="border border-white/20 px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white"
                  >
                    Rezervovať
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-zinc-600 font-black uppercase text-sm tracking-widest">
            Garáž je momentálne prázdna.
          </div>
        )}
      </main>
    </div>
  );
}
