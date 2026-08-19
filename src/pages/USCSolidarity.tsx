import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import { HeartHandshake, Shield, HandCoins, ArrowRight, Car } from 'lucide-react';
import solidarityImg from '../assets/images/usc_solidarity_brutalist_1787064778469.jpg';

export default function USCSolidarity() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-red-600 text-white font-black uppercase tracking-widest px-4 py-2 mb-6 border-2 border-white">
              /// U.S.C. Solidarity
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
              Kód ulice. <br/>
              <span className="text-zinc-600">Nezabúdame.</span>
            </h1>
            <p className="text-xl text-zinc-400 font-medium mb-8 leading-relaxed max-w-lg border-l-4 border-red-600 pl-4">
              Silnejší ťahá slabšieho. U.S.C. nevzniklo v korporáte, ale na ulici. Náš zisk nekončí len v systéme – vraciame ho späť do betónu, odkiaľ sme vzišli.
            </p>
            <button className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 flex items-center gap-3 hover:bg-zinc-200 transition-colors border-4 border-zinc-500 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.4)]">
              Chcem pomôcť <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-zinc-900 border-8 border-zinc-800 relative overflow-hidden">
              <img 
                src={solidarityImg} 
                alt="USC Solidarity" 
                className="w-full h-full object-cover grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay pointer-events-none"></div>
            </div>
            {/* Brutalist Decorator */}
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white font-black text-4xl p-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              /// 369
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section className="py-24 bg-zinc-900 border-t-4 border-b-4 border-black relative overflow-hidden">
        {/* Tape Decorator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden bg-black text-zinc-500 py-1 z-10 transform -rotate-1 origin-left">
          <div className="animate-marquee whitespace-nowrap flex gap-4 text-xs font-black uppercase tracking-widest opacity-50">
            <span>/// SOLIDARITY /// NO EXCUSES /// REAL HELP ///</span>
            <span>/// SOLIDARITY /// NO EXCUSES /// REAL HELP ///</span>
            <span>/// SOLIDARITY /// NO EXCUSES /// REAL HELP ///</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">Ako to funguje</h2>
            <p className="text-zinc-400 font-bold tracking-widest uppercase">Žiadne reči. Iba činy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border-4 border-black p-8 group hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]">
              <div className="w-16 h-16 bg-zinc-900 border-2 border-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                <HandCoins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-4">Drop pre blok</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                Z každého predaného kusu oblečenia U.S.W. ide priamo určená čiastka (alebo %) do fondu Solidarity. Nekupuješ len mikinu, kupuješ jedlo a oblečenie pre tých, čo padli.
              </p>
            </div>

            <div className="bg-zinc-950 border-4 border-black p-8 group hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(245,158,11,1)]">
              <div className="w-16 h-16 bg-zinc-900 border-2 border-amber-500 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-4">Transport pomoci</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                Naše vozidlá z divízie "Rent a wheel" nestoja, keď nemajú kšeft. Využívame ich na bezplatný rozvoz potravín, oblečenia alebo presťahovanie rodín v núdzi.
              </p>
            </div>

            <div className="bg-zinc-950 border-4 border-black p-8 group hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
              <div className="w-16 h-16 bg-zinc-900 border-2 border-white flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white mb-4">Práca & Reštart</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">
                Cez U.S.C. Work neberieme len čistých. Dávame šancu ľuďom po výkone trestu alebo z ulice reštartovať život. Pomáhame so živnosťou, byrokratickými vecami a hľadaním fleku.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifest Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <HeartHandshake className="w-16 h-16 text-red-600 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-8 tracking-tighter leading-tight">
          "Úspech nemá hodnotu, ak ho nemáš s kým zdieľať."
        </h2>
        <p className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
          Nepýtame si dary od iných. Financujeme to sami z nášho hustlu. Pretože my nepotrebujeme medaily za charitu. Potrebujeme vedieť, že naša štvrť a naši ľudia nepadnú. U.S.C. je rodina.
        </p>
      </section>

    </div>
  );
}
