import { motion } from 'motion/react';
import { Flame, Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Caution Tape Marquee */}
      <div className="fixed top-0 left-0 w-full overflow-hidden bg-amber-500 text-black py-1 z-40 -translate-y-full">
        <div className="animate-marquee whitespace-nowrap flex gap-4 text-xs font-black uppercase tracking-widest">
          <span>/// CAUTION /// UNDERGROUND STREET COLLECTIVE /// CAUTION /// HUSTLE HARD /// CAUTION ///</span>
          <span>/// CAUTION /// UNDERGROUND STREET COLLECTIVE /// CAUTION /// HUSTLE HARD /// CAUTION ///</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-block bg-red-600 text-white px-4 py-2 font-black uppercase tracking-widest text-sm mb-6 -rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Parental Advisory: Raw Business
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
              <span className="block mb-2">Underground</span>
              <span className="block text-amber-500">Street</span>
              <span className="block text-zinc-500">Collective</span>
            </h1>
            
            <div className="mt-8 max-w-2xl border-l-8 border-amber-500 pl-6">
              <p className="text-xl md:text-2xl text-zinc-300 font-bold uppercase tracking-wide">
                Garáž. Ulica. Hip-Hop. Hustle.
                <br />
                Pravidlá sa menia tu dolu.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest transition-all border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3">
                <Wrench className="w-5 h-5" />
                Otvoriť Garáž
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative concrete elements */}
        <div className="absolute right-10 bottom-20 opacity-10 pointer-events-none hidden lg:block text-9xl font-black">
          369
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="w-full overflow-hidden bg-amber-500 text-black py-4 border-y-4 border-black">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-2xl font-black uppercase tracking-widest items-center">
          <span>/// STREET HUSTLE</span>
          <Flame className="w-8 h-8" />
          <span>GARAGE RULES</span>
          <Flame className="w-8 h-8" />
          <span>NO EXCUSES</span>
          <Flame className="w-8 h-8" />
          <span>STREET HUSTLE</span>
          <Flame className="w-8 h-8" />
          <span>GARAGE RULES</span>
          <Flame className="w-8 h-8" />
          <span>NO EXCUSES ///</span>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                Naša Práca
              </h2>
              <div className="w-24 h-4 bg-red-600 mb-6"></div>
              <p className="text-zinc-400 text-xl max-w-xl font-bold uppercase tracking-wide">
                5 pilierov nášho impéria. Surová sila a precízne doručenie. Vyber si svoj smer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link to={service.path} key={service.id} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 h-full bg-zinc-900 border-4 border-zinc-800 transition-all duration-200 hover:-translate-y-2 hover:translate-x-2 ${service.shadow}`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 bg-zinc-950 border-2 ${service.accent}`}>
                      {service.icon}
                    </div>
                    <span className="text-5xl font-black text-zinc-800">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-amber-500">{service.title}</h3>
                  {service.subtitle && <p className="text-sm text-zinc-500 mb-6 font-bold uppercase tracking-widest">{service.subtitle}</p>}
                  {!service.subtitle && <div className="h-4 mb-6" />}
                  
                  <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mt-auto inline-flex items-center gap-2 font-black uppercase tracking-widest text-amber-500 text-sm border-b-2 border-amber-500 pb-1 hover:text-white hover:border-white transition-colors">
                    Vstúpiť <Wrench className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About/Vibe Section */}
      <section id="about" className="py-32 px-6 bg-amber-500 text-black border-y-8 border-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
              Podvedomie<br/>369
            </h2>
            <div className="space-y-6 text-xl font-bold tracking-wide">
              <p>
                Začínali sme v garážach, na uliciach. Sme formovaní hip-hopom a snahou prežiť. Hustle je v našej DNA. Žiadne obleky, žiadne pretvárky.
              </p>
              <p>
                Budujeme impérium, ktoré spája hrubú silu ulice so sieťou kontaktov. 
              </p>
              <div className="bg-black text-white p-6 mt-8 border-4 border-white transform rotate-1">
                <p className="font-black text-2xl uppercase italic">
                  "Dokážeme predať aj zákazníka samému sebe."
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black p-8 border-4 border-zinc-800 flex flex-col items-center justify-center text-center hover:bg-zinc-900 transition-colors">
              <span className="text-6xl font-black text-amber-500 mb-4">3</span>
              <span className="text-white font-bold uppercase tracking-widest">Začiatok</span>
            </div>
            <div className="bg-red-600 p-8 border-4 border-black flex flex-col items-center justify-center text-center mt-12 hover:bg-red-700 transition-colors">
              <span className="text-6xl font-black text-white mb-4">6</span>
              <span className="text-black font-bold uppercase tracking-widest">Hustle</span>
            </div>
            <div className="bg-zinc-100 p-8 border-4 border-black flex flex-col items-center justify-center text-center hover:bg-zinc-200 transition-colors col-span-2">
              <span className="text-6xl font-black text-black mb-4">9</span>
              <span className="text-black font-bold uppercase tracking-widest">Impérium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
              Kontakt
            </h2>
            <div className="w-24 h-4 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-zinc-400 text-xl font-bold uppercase tracking-wide">
              Underground street colective s.r.o.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Phone */}
            <div className="bg-zinc-900 border-4 border-zinc-800 p-8 flex flex-col items-center text-center hover:border-amber-500 transition-colors">
              <div className="w-16 h-16 bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-amber-500" />
              </div>
              <h4 className="text-zinc-500 font-black uppercase tracking-widest mb-4">Telefón</h4>
              <p className="text-white text-2xl font-black">+421 949 521 777</p>
            </div>
            
            {/* Email */}
            <div className="bg-zinc-900 border-4 border-zinc-800 p-8 flex flex-col items-center text-center hover:border-red-600 transition-colors">
              <div className="w-16 h-16 bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-zinc-500 font-black uppercase tracking-widest mb-4">E-mail</h4>
              <p className="text-white text-xl font-black break-all">Uscolective@gmail.com</p>
            </div>

            {/* Location */}
            <div className="bg-zinc-900 border-4 border-zinc-800 p-8 flex flex-col items-center text-center hover:border-zinc-100 transition-colors">
              <div className="w-16 h-16 bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-zinc-100" />
              </div>
              <h4 className="text-zinc-500 font-black uppercase tracking-widest mb-4">Lokácia</h4>
              <p className="text-white text-2xl font-black">Bratislava<br/><span className="text-amber-500">& Celý svet</span></p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
