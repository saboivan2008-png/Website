import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo_graffiti_red_recreate_1787059992037.jpg';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-sm border-b-4 border-amber-500 py-3' : 'bg-zinc-950/80 py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logoImg} 
            alt="U.S.C Logo" 
            className="w-12 h-12 object-cover rounded-full border-2 border-red-600 group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]" 
          />
          <span className="font-black tracking-tighter text-white text-2xl uppercase group-hover:text-red-600 transition-colors">
            U.S.C
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <Link to="/" className="hover:text-amber-500 hover:-translate-y-0.5 transition-all">Centrála</Link>
          <Link to="/usw" className="hover:text-amber-500 hover:-translate-y-0.5 transition-all">U.S.W Shop</Link>
        </div>
      </div>
    </nav>
  );
}
