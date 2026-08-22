import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  Cpu, 
  Code2, 
  Database, 
  Bot, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Server, 
  FileSpreadsheet, 
  TrendingUp, 
  ArrowLeft,
  Sparkles,
  Send,
  Terminal,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AuruTrinity() {
  // AI Audit Simulator State
  const [businessType, setBusinessType] = useState('ecommerce');
  const [currentBottleneck, setCurrentBottleneck] = useState('accounting');
  const [teamSize, setTeamSize] = useState('1-5');
  const [calculatedPlan, setCalculatedPlan] = useState<any | null>(null);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    serviceInterest: 'full_trinity',
    description: '',
    budget: '1000-3000'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Diagnostic generator
  const runDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hoursSaved = '18 - 25 hodín týždenne';
    let revenueBoost = '+35% až +60%';
    let modules = ['Auru Web Engine 3.69', 'Automatizovaná Dochádzka & Fakturácia', 'AI B2B Lead Hunter'];

    if (businessType === 'craftsman') {
      hoursSaved = '15 hodín týždenne (menej papierovačiek)';
      revenueBoost = '+40% viac zákaziek vďaka online objednávkam';
      modules = ['Mobilný Terminál Zákaziek', 'Automatické cenové ponuky & faktúry', 'Integrácia U.S.C. Work'];
    } else if (businessType === 'logistics') {
      hoursSaved = '30+ hodín na dispečingu';
      revenueBoost = 'Zníženie prestojov o 45%';
      modules = ['Rent a Wheel Fleet Sync', 'Automatický Dispečing & Trasy', 'Cloud Účtovníctvo & CMR'];
    } else if (businessType === 'services') {
      hoursSaved = '20 hodín týždenne';
      revenueBoost = '+50% konverzia dopytov';
      modules = ['Auru Booking Platform', 'Automatické SMS & Email notifikácie', 'Mzdová AI Matrica'];
    }

    setCalculatedPlan({
      hoursSaved,
      revenueBoost,
      modules,
      timestamp: new Date().toLocaleTimeString()
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'auru_trinity_leads'), {
        ...formData,
        diagnosticPlan: calculatedPlan || null,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting Auru Trinity lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-amber-500 selection:text-black pt-24 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        {/* Navigation back */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white uppercase font-black tracking-widest transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Späť na Centrálu
          </Link>

          <div className="flex items-center gap-2 text-amber-500 text-xs font-mono font-bold bg-amber-950/60 border border-amber-600 px-3 py-1.5">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>AURU NEURAL CORE // ONLINE 3.69</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-4 py-2 font-black uppercase tracking-widest text-sm mb-6 border-2 border-black">
              <Cpu className="w-4 h-4" /> PILIER 1 // DIGITÁLNA DIELŇA & A.I. MATRIX
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
              A.I. Auru_<span className="text-amber-500">trinity</span>
            </h1>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-lg md:text-xl max-w-3xl leading-relaxed">
              Digitálna dielňa, ktorá riadi a udržiava web, pracovné platformy, dochádzku a mzdové účtovníctvo.
              Vyvíjame moderné systémy, automatizujeme rutinu a hľadáme zákazníkov pre tvoj hustle.
            </p>
          </motion.div>
        </section>

        {/* 4 Pillars of Auru Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border-4 border-black p-6 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]"
          >
            <div>
              <div className="w-14 h-14 bg-black border-2 border-zinc-800 flex items-center justify-center mb-6 text-amber-500 group-hover:border-amber-500 transition-colors">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-2">Web & App Architektúra</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                Rýchle, bezpečné klientske a firemné portály, moderné e-shopy s brutálnym konverzným dizajnom.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
              REACT // VITE // TAILWIND // CLOUD RUN
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border-4 border-black p-6 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]"
          >
            <div>
              <div className="w-14 h-14 bg-black border-2 border-zinc-800 flex items-center justify-center mb-6 text-amber-500 group-hover:border-amber-500 transition-colors">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-2">Automatizované Účtovníctvo</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                Generovanie faktúr, sledovanie dochádzky, mzdové podklady a automatické reporty pre daňové priznania.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
              INVOICING BOT // PAYROLL AI // ZERO MANUAL ERRORS
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border-4 border-black p-6 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]"
          >
            <div>
              <div className="w-14 h-14 bg-black border-2 border-zinc-800 flex items-center justify-center mb-6 text-amber-500 group-hover:border-amber-500 transition-colors">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-2">AI Lead Hunter & CRM</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                Automatizovaný zber zákazníkov, B2B scraping a prediktívny matchmaking s partnermi zo siete U.S.C.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
              AUTONOMOUS OUTREACH // AI FILTERING
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900 border-4 border-black p-6 hover:border-amber-500 transition-all flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]"
          >
            <div>
              <div className="w-14 h-14 bg-black border-2 border-zinc-800 flex items-center justify-center mb-6 text-amber-500 group-hover:border-amber-500 transition-colors">
                <Server className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-2">Cloud Guardian & Uptime</h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                24/7 dohľad nad tvojou infraštruktúrou, zálohovanie dát, SSL certifikáty a ochrana pred výpadkami.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
              99.9% UPTIME // FIRESTORE CLOUD // ENCRYPTED
            </div>
          </motion.div>
        </section>

        {/* Interactive AI Automation Diagnostic Generator */}
        <section className="mb-24 bg-zinc-900 border-4 border-amber-500 p-8 md:p-12 relative overflow-hidden shadow-[10px_10px_0px_0px_rgba(245,158,11,0.4)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b-2 border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 bg-black text-amber-500 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-2 border border-amber-500">
                <Sparkles className="w-3.5 h-3.5" /> INTERAKTÍVNY SIMULÁTOR
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Auru AI Hustle Diagnostika
              </h2>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-1">
                Zisti, koľko hodín manuálnej driny a nákladov dokáže Auru Trinity ušetriť tvojej firme.
              </p>
            </div>

            <div className="text-zinc-500 text-xs font-mono">
              DIAGNOSTIC ALGORITHM: 3.69 MATRIX
            </div>
          </div>

          <form onSubmit={runDiagnostic} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                Oblasť Podnikania / Hustlu
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono text-xs focus:border-amber-500 outline-none uppercase"
              >
                <option value="ecommerce">E-Shop & Predaj tovaru</option>
                <option value="craftsman">Remeslá, Stavby & Dielne</option>
                <option value="logistics">Doprava, Kuriéri & Taxi</option>
                <option value="services">Služby, Agentúry & Gastronómia</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                Najväčšia Brzda (Bottleneck)
              </label>
              <select
                value={currentBottleneck}
                onChange={(e) => setCurrentBottleneck(e.target.value)}
                className="w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono text-xs focus:border-amber-500 outline-none uppercase"
              >
                <option value="accounting">Papierovačky, Fakturácie, Dane</option>
                <option value="leads">Nedostatok nových zákazníkov</option>
                <option value="website">Zastaraný alebo nefunkčný web</option>
                <option value="dispatch">Chaos v objednávkach a dispečingu</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                Veľkosť Tímu / Zákaziek
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full bg-black border-2 border-zinc-700 p-3 text-white font-mono text-xs focus:border-amber-500 outline-none uppercase"
              >
                <option value="1">Sólo jednotlivec (SZČO)</option>
                <option value="1-5">2 až 5 ľudí</option>
                <option value="6-20">6 až 20 ľudí</option>
                <option value="20+">20+ ľudí (Flotila / Firma)</option>
              </select>
            </div>

            <div className="sm:col-span-3 mt-2">
              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Zap className="w-5 h-5" /> Vypočítať Automatizačný Plán
              </button>
            </div>
          </form>

          {calculatedPlan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black border-2 border-amber-500 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div>
                <div className="text-amber-500 font-mono text-xs font-bold uppercase mb-1">
                  /// VÝSLEDOK ANALÝZY PRE TVOJ BIZNIS
                </div>
                <div className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  Odhadovaná úspora: <span className="text-amber-400">{calculatedPlan.hoursSaved}</span>
                </div>
                <div className="text-zinc-400 text-xs font-bold uppercase mt-1">
                  Rast konverzie a efektivity: <strong className="text-white">{calculatedPlan.revenueBoost}</strong>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {calculatedPlan.modules.map((m: string, i: number) => (
                    <span key={i} className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-mono px-2 py-1 uppercase">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#inquiry-form"
                className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-black uppercase text-xs tracking-widest whitespace-nowrap transition-colors border-2 border-black"
              >
                Aplikovať Riešenie &raquo;
              </a>
            </motion.div>
          )}
        </section>

        {/* Inquiry / Consultation Form */}
        <section id="inquiry-form" className="max-w-3xl mx-auto bg-zinc-900 border-4 border-black p-8 md:p-12 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <Hammer className="absolute -bottom-10 -right-10 w-64 h-64 text-zinc-950 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
              Objednať Digitálnu Dielňu
            </h2>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-8">
              Povedz nám o svojom projekte, platforme alebo systéme, ktorý potrebuješ vybudovať.
            </p>

            {submitted ? (
              <div className="bg-amber-500 text-black p-6 font-black uppercase tracking-widest text-center border-2 border-black">
                Požiadavka odoslaná! Auru Trinity tím ťa bude čoskoro kontaktovať.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Meno / Názov Firmy
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tvoje meno alebo brand..."
                    className="w-full bg-black border-2 border-zinc-700 p-4 text-white font-mono focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Kontakt (Telefón / WhatsApp / Email)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="+421 9xx xxx xxx alebo email..."
                    className="w-full bg-black border-2 border-zinc-700 p-4 text-white font-mono focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                      Služba
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full bg-black border-2 border-zinc-700 p-4 text-white font-mono text-xs focus:border-amber-500 focus:outline-none transition-colors uppercase"
                    >
                      <option value="full_trinity">Kompletná Digitálna Dielňa</option>
                      <option value="web_app">Vývoj Webu / Aplikácie na kľúč</option>
                      <option value="accounting_automation">Automatizácia Účtovníctva & Mzdy</option>
                      <option value="lead_hunter">AI Lead Hunter & Zákazníci</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                      Orientačný Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-black border-2 border-zinc-700 p-4 text-white font-mono text-xs focus:border-amber-500 focus:outline-none transition-colors uppercase"
                    >
                      <option value="under_1000">Do €1 000</option>
                      <option value="1000-3000">€1 000 - €3 000</option>
                      <option value="3000-7000">€3 000 - €7 000</option>
                      <option value="custom">Veľký projekt / Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                    Popis Požiadavky
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Opíš, čo potrebuješ naprogramovať, prepojiť alebo zautomatizovať..."
                    className="w-full bg-black border-2 border-zinc-700 p-4 text-white font-mono focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-colors mt-2 border-2 border-black disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Odosielam do Dielne...' : 'Odoslať Dopyt do Auru Trinity'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
