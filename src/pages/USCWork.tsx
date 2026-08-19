import { motion } from 'motion/react';
import { Briefcase, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function USCWork() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'partners'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPartners(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-blue-600 selection:text-white pt-24 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white uppercase font-black tracking-widest mb-12 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Späť na Centrálu
        </Link>

        {/* Header */}
        <section className="mb-16">
          <div className="inline-block bg-blue-600 text-white px-4 py-2 font-black uppercase tracking-widest text-sm mb-6 border-2 border-black">
            B2B // U.S.C WORK & PARTNERS
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Sieť <span className="text-blue-600">Partnerov</span>
          </h1>
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-lg max-w-2xl leading-relaxed">
            Spolupráce, firmy a subjekty, ktoré s nami tvoria kód ulice. 
            Žiadny bullshit, iba reálne spojenia a funkčný ekosystém.
          </p>
        </section>

        {/* Partners Grid */}
        {loading ? (
          <div className="text-center text-zinc-500 font-bold uppercase py-24 text-2xl">
            Načítavam sieť...
          </div>
        ) : partners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900 border-4 border-black p-8 hover:border-blue-600 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-black border-2 border-zinc-800 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                    <Briefcase className="w-8 h-8 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase">{p.name}</h3>
                </div>
                
                <p className="text-zinc-400 font-bold uppercase tracking-widest leading-relaxed mb-8">
                  {p.description}
                </p>

                <button className="text-blue-500 font-black uppercase tracking-widest flex items-center gap-2 hover:text-blue-400 transition-colors text-sm border-b-2 border-transparent hover:border-blue-400 pb-1">
                  <LinkIcon className="w-4 h-4" /> Detail spolupráce
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-zinc-500 font-bold uppercase py-24 text-xl border-4 border-dashed border-zinc-800">
            Sieť partnerov sa formuje.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
