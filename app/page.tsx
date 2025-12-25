"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Star, Droplets, ChevronDown, Wind, Crown, Sparkles, X, Search, CreditCard, Lock, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Données des avis
const testimonials = [
  { name: "Clara M.", text: "J'ai triplé mes ventes en parfumerie.", stars: 5 },
  { name: "Lucas D.", text: "Je sais enfin décrypter une pyramide olfactive.", stars: 5 },
  { name: "Sophie R.", text: "Le guide sur les familles olfactives est or pur.", stars: 5 },
  { name: "Amine K.", text: "Mes clients ne jurent plus que par mes conseils.", stars: 5 },
  { name: "Emma B.", text: "L'approche psychologique du parfum est bluffante.", stars: 4 },
  { name: "Julien P.", text: "Simple, élégant, rentabilisé en une vente.", stars: 5 },
];

export default function PerfumeLandingPage() {
  const [showMobileBar, setShowMobileBar] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Fonction pour ouvrir le paiement
  const openCheckout = (e: any) => {
    e.preventDefault();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen text-white selection:bg-violet-500/30 font-sans overflow-x-hidden pb-20 md:pb-0 bg-[#05020a]">
      
      {/* --- MODALE DE PAIEMENT (Nouveau) --- */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <PaymentModal onClose={() => setIsCheckoutOpen(false)} />
        )}
      </AnimatePresence>

      {/* --- LUMIÈRES D'AMBIANCE --- */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#05020a]/80 backdrop-blur-xl transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
               <Droplets size={16} className="text-white" />
            </div>
            ScentMastery.
          </div>
          <button onClick={openCheckout} className="hidden md:flex bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-violet-50 transition border border-transparent hover:border-violet-200 shadow-lg shadow-white/5">
            Devenir Expert - 27€
          </button>
        </div>
      </nav>

      <div className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-12 flex flex-col items-center text-center px-6">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-xs font-medium text-violet-300 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Formation Consultant Parfum v2.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05]"
          >
            Maîtrise l'art du <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-rose-200">Sillage & de la Vente.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-10 leading-relaxed"
          >
            Ne vends plus un produit, vends une émotion. La méthode complète pour 
            <span className="text-white font-medium"> diagnostiquer, conseiller et closer</span> n'importe quel client en parfumerie ou en privé.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <button onClick={openCheckout} className="group bg-white text-black h-14 px-8 rounded-full font-bold text-lg hover:bg-violet-50 transition flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)] duration-300">
              Accéder à la méthode
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-violet-700" />
            </button>
            <a href="#sommaire" className="h-14 px-8 rounded-full border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 transition font-medium backdrop-blur-md flex items-center justify-center">
              Découvrir le programme
            </a>
          </motion.div>
        </section>

        {/* --- MARQUEE --- */}
        <section className="py-8 border-y border-white/5 bg-white/[0.02] overflow-hidden mb-12">
            <div className="flex w-full">
                <motion.div 
                    initial={{ x: 0 }} 
                    animate={{ x: "-50%" }} 
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="flex gap-8 px-4 flex-shrink-0"
                >
                    {[...testimonials, ...testimonials].map((item, i) => (
                          <div key={i} className="flex-shrink-0 w-64 p-4 rounded-xl bg-[#0f0a16] border border-white/10">
                            <div className="flex gap-1 mb-2">
                                {[...Array(item.stars)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400"/>)}
                            </div>
                            <p className="text-sm text-neutral-300 mb-2 font-medium">"{item.text}"</p>
                            <p className="text-xs text-neutral-500 font-bold uppercase">{item.name}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>

        {/* --- GRID AVEC SPOTLIGHT --- */}
        <section id="sommaire" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">L'essence de la réussite.</h2>
             <p className="text-neutral-400">Tout ce dont tu as besoin pour devenir une référence olfactive.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SpotlightCard color="rgba(139, 92, 246, 0.15)">
                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div className="w-14 h-14 mb-6 bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20">
                     <Crown size={28} className="text-violet-400" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold mb-4 text-white">L'Art du Diagnostic Client</h3>
                     <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
                       Arrête de proposer des parfums au hasard. Apprends à poser les 3 questions magiques qui révèlent la signature olfactive de ton client instantanément.
                     </p>
                   </div>
                </div>
              </SpotlightCard>
            </div>

            <SpotlightCard color="rgba(244, 63, 94, 0.15)">
              <div className="relative z-10 h-full flex flex-col justify-center">
                <Search className="text-rose-400 mb-6" size={40} />
                <h3 className="text-xl font-bold mb-2 text-white">Le "Nez" Numérique</h3>
                <p className="text-neutral-400">Un template Notion recensant 150+ parfums classés par accords, saisons et personnalités.</p>
              </div>
            </SpotlightCard>

            <SpotlightCard color="rgba(251, 191, 36, 0.15)">
               <div className="relative z-10 h-full flex flex-col justify-center">
                <Wind className="text-amber-400 mb-6" size={40} />
                <h3 className="text-xl font-bold mb-2 text-white">Sillage & Tenue</h3>
                <p className="text-neutral-400">Les techniques techniques pour conseiller sur la projection et faire durer un parfum toute la journée.</p>
              </div>
            </SpotlightCard>

            <div className="md:col-span-2">
                <SpotlightCard color="rgba(139, 92, 246, 0.15)">
                  <div className="relative z-10 flex items-center justify-between h-full">
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-white">Bonus : Le Script de Vente Hypnotique</h3>
                      <p className="text-neutral-400">Les mots exacts pour décrire une odeur et déclencher l'achat impulsif.</p>
                    </div>
                    <Sparkles size={48} className="text-violet-500/50" />
                  </div>
                </SpotlightCard>
            </div>
          </div>
        </section>

        {/* --- PRICING FINAL --- */}
        <section id="pricing" className="py-24 px-6 border-t border-white/5 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-violet-600/20 blur-[120px] -z-10"></div>
            
            <div className="inline-block glass-panel p-8 md:p-12 rounded-[32px] max-w-lg w-full mx-auto border border-white/10 shadow-2xl relative overflow-hidden bg-[#0a0510]/60 backdrop-blur-md">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">OFFRE LIMITÉE</div>
                
                <div className="flex items-baseline justify-center gap-3 mb-8">
                    <span className="text-7xl font-extrabold text-white tracking-tighter">27€</span>
                    <span className="text-xl text-neutral-500 line-through">149€</span>
                </div>
                
                <ul className="space-y-4 text-left mb-10 pl-4">
                    <CheckItem text="Ebook : L'Art de Vendre du Parfum" />
                    <CheckItem text="Template Notion : Database Olfactive" />
                    <CheckItem text="Guide des correspondances (Dupes)" />
                    <CheckItem text="Accès : Masterclass Vidéo (1h)" />
                </ul>

                <button onClick={openCheckout} className="group w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-violet-50 transition shadow-lg transform hover:-translate-y-1 flex justify-center items-center gap-2">
                    Obtenir mon accès <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <p className="text-xs text-neutral-500 mt-4">Accès immédiat par email après achat.</p>
            </div>
        </section>

        <footer className="py-12 text-center text-sm text-neutral-600 border-t border-white/5">
            &copy; 2025 ScentMastery. L'excellence olfactive.
        </footer>
        
        {/* --- MOBILE BAR --- */}
        {showMobileBar && (
            <motion.div 
                initial={{ y: 100 }} animate={{ y: 0 }}
                className="fixed bottom-0 left-0 w-full p-4 bg-[#05020a]/90 backdrop-blur-lg border-t border-white/10 md:hidden z-50 flex items-center justify-between"
            >
                <div className="flex flex-col">
                    <span className="text-xs text-neutral-400 line-through">149€</span>
                    <span className="text-xl font-bold text-violet-400">27€</span>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={openCheckout} className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-violet-50 transition shadow-lg shadow-violet-500/20">
                        Je me lance
                    </button>
                    <button onClick={() => setShowMobileBar(false)} className="p-2 text-neutral-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
            </motion.div>
        )}

      </div>
    </div>
  );
}

// --- NOUVEAU COMPOSANT : FENÊTRE DE PAIEMENT ---
function PaymentModal({ onClose }: { onClose: () => void }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleFakePay = () => {
        setIsLoading(true);
        // Simulation d'un chargement
        setTimeout(() => {
            alert("Ceci est une démo ! Intégrez Stripe ici.");
            setIsLoading(false);
            onClose();
        }, 2000);
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            {/* Arrière-plan sombre */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* La boîte modale */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#0f0a16] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-rose-500" />
                
                <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition">
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-1">Finaliser la commande</h3>
                    <p className="text-neutral-400 text-sm">Pack Consultant Parfum v2.0</p>
                </div>

                {/* Formulaire factice */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Adresse Email</label>
                        <input type="email" placeholder="toi@exemple.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition placeholder:text-neutral-600" />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Informations de carte</label>
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 gap-3">
                            <CreditCard size={20} className="text-neutral-500" />
                            <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent w-full text-white focus:outline-none placeholder:text-neutral-600" />
                            <div className="flex gap-1">
                                <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] text-neutral-400 font-bold">VISA</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                         <div className="w-1/2">
                            <input type="text" placeholder="MM / AA" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition placeholder:text-neutral-600 text-center" />
                         </div>
                         <div className="w-1/2">
                            <input type="text" placeholder="CVC" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition placeholder:text-neutral-600 text-center" />
                         </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4 text-sm">
                        <span className="text-neutral-400">Total à payer</span>
                        <span className="text-xl font-bold text-white">27.00€</span>
                    </div>

                    <button 
                        onClick={handleFakePay}
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-violet-50 transition flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <> <Lock size={16} /> Payer et Accéder </>}
                    </button>
                    
                    <p className="text-center text-[10px] text-neutral-600 mt-4 flex items-center justify-center gap-1">
                        <Lock size={10} /> Paiement chiffré SSL 256-bit. Satisfait ou remboursé 30j.
                    </p>
                </div>

            </motion.div>
        </div>
    )
}

// --- AUTRES COMPOSANTS (Inchangés) ---
function SpotlightCard({ children, color = "rgba(16, 185, 129, 0.1)" }: { children: React.ReactNode, color?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative h-full p-8 rounded-3xl bg-[#0f0a16]/80 border border-white/10 overflow-hidden group transition-colors hover:border-violet-500/30"
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
    return (
        <li className="flex gap-3 items-center text-neutral-300">
            <div className="min-w-[20px] h-[20px] rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
              <Check size={12} className="text-violet-400" />
            </div>
            {text}
        </li>
    )
}
