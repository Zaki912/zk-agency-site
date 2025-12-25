"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // Import important pour les liens internes
import { ArrowRight, ExternalLink, Box, Layout, Rocket, Smartphone, MessageSquare, Star, Globe, Users, Menu, X, ChevronDown, Send, MessageCircle, ArrowUp, Cookie, Loader2, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

// --- DONNÉES ---
const STATS = [
  { label: "Projets livrés", value: "100+" },
  { label: "Satisfaction", value: "99%" },
  { label: "Années d'exp.", value: "5+" },
];

const CLIENT_LOCATIONS = [
  { city: "Paris", top: "27%", left: "49%", client: "Siège Social", project: "Hub Principal" },
  { city: "Bruxelles", top: "25%", left: "50%", client: "Client Retail", project: "E-commerce" },
  { city: "Londres", top: "24%", left: "47%", client: "Client BTP", project: "Site Corporate" },
  { city: "New York", top: "32%", left: "28%", client: "Start-up Tech", project: "App SaaS" },
];

const PROJECTS = [
  { 
    id: "01", title: "Plateforme VTC", category: "SaaS & Mobile", 
    desc: "Gestion de flotte complète avec dispatch automatique et tracking GPS.",
    longDesc: "Développement d'une solution complexe pour un acteur majeur du VTC. Le défi était de gérer des milliers de connexions simultanées en temps réel. Architecture Node.js / WebSockets.",
    tags: ["React Native", "Node.js", "WebSockets", "Google Maps"],
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "02", title: "Mode & Luxe", category: "E-commerce", 
    desc: "Site marchand haute performance avec gestion des stocks unifiée.",
    longDesc: "Refonte complète pour une marque de luxe. Objectif : fluidité absolue (< 1s chargement). Architecture Headless Shopify Plus + Next.js.",
    tags: ["Next.js", "Shopify", "Framer Motion", "Stripe"],
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "03", title: "Groupe BTP", category: "Corporate", 
    desc: "Portail corporate valorisant l'expertise technique et les chantiers.",
    longDesc: "Portail institutionnel pour un géant de la construction. Carte interactive des chantiers et module recrutement connecté à l'ATS.",
    tags: ["React", "Tailwind", "Mapbox", "CMS Headless"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "04", title: "Location Premium", category: "Booking Engine", 
    desc: "Système de réservation automatisé avec calendrier temps réel.",
    longDesc: "Digitalisation de la location de véhicules de prestige. Disponibilités temps réel, cautions bancaires API et signature électronique.",
    tags: ["Next.js", "PostgreSQL", "Stripe Connect", "DocuSign"],
    img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "05", title: "Immobilier Luxe", category: "Catalogue 3D", 
    desc: "Site d'agence intégrant des visites virtuelles et recherche par carte.",
    longDesc: "Interface immersive mettant en avant des visites virtuelles Matterport et une recherche cartographique fluide.",
    tags: ["React", "Matterport", "Google Maps", "Algolia"],
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    id: "06", title: "Restaurant Étoilé", category: "Expérience", 
    desc: "Interface élégante pour menus et réservations connectées.",
    longDesc: "Site expérientiel retranscrivant l'atmosphère du restaurant. Animations au scroll et module de réservation Zenchef.",
    tags: ["Gatsby", "Framer Motion", "Zenchef API", "UI/UX"],
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" 
  }
];

const TESTIMONIALS = [
  { text: "Depuis la mise en ligne, nos propres clients nous appellent pour nous dire à quel point le site est agréable à utiliser. Une simplicité qui fait toute la différence.", author: "Claire V.", role: "Directrice Marketing" },
  { text: "On avait peur que ce soit compliqué, mais c'est tout l'inverse. L'interface est intuitive et nos ventes ont décollé grâce à la clarté du parcours client.", author: "Thomas L.", role: "Fondateur E-commerce" },
];

const FAQ_ITEMS = [
  { q: "Pourquoi un site sur-mesure augmente mes ventes ?", a: "Un design premium inspire immédiatement confiance. 75% des utilisateurs jugent la crédibilité d'une entreprise sur l'allure de son site. Nous créons un outil fait pour convertir." },
  { q: "Je n'y connais rien en technique, est-ce un problème ?", a: "Absolument pas. Nous gérons toute la complexité (hébergement, sécurité, responsive). Vous n'avez qu'à valider le design, nous nous occupons du reste." },
  { q: "Serais-je autonome pour modifier mes textes ?", a: "C'est à la carte. Vous pouvez opter pour la tranquillité totale (nous gérons vos mises à jour sous 24h via maintenance) ou choisir l'autonomie complète avec une interface d'administration dédiée." },
];

export default function AgenceVioletElectric() {
  // --- STATES ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", type: "Site Vitrine", budget: "Budget estimé ?", message: "" });

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);
  const openContact = () => { setIsContactOpen(true); setIsMobileMenuOpen(false); setFormStatus("idle"); };
  
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // --- ENVOI EMAIL ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
        const response = await fetch("https://formsubmit.co/ajax/elheftizakaria@gmail.com", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setFormStatus("success");
            setFormData({ name: "", email: "", type: "Site Vitrine", budget: "Budget estimé ?", message: "" });
        } else {
            console.error("Erreur lors de l'envoi");
            setFormStatus("idle");
            alert("Une erreur est survenue. Merci de nous contacter directement par email.");
        }
    } catch (error) {
        console.error(error);
        setFormStatus("idle");
        alert("Erreur de connexion. Vérifiez votre réseau.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen text-gray-100 selection:bg-violet-500/30 selection:text-violet-200">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-40 bg-[#030712]/80 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer z-50 group" onClick={scrollToTop}>
                {/* Logo Gradient */}
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/50 group-hover:scale-105 transition-transform">
                    <Box size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">ZK <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AGENCY</span>.</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
                <a href="#work" className="hover:text-white transition-colors">Réalisations</a>
                <button onClick={openContact} className="btn-electric px-6 py-2.5 rounded-lg text-sm">
                    Démarrer un projet
                </button>
            </div>

            <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-30 bg-[#030712] pt-24 px-6 md:hidden flex flex-col gap-6"
            >
                <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white border-b border-white/10 pb-4">Expertise</a>
                <a href="#work" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-white border-b border-white/10 pb-4">Réalisations</a>
                <button onClick={openContact} className="btn-electric w-full py-4 rounded-xl text-lg shadow-lg">
                    Démarrer un projet
                </button>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING BUTTONS --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <AnimatePresence>
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-gray-800 border border-white/10 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-violet-600 transition-colors"
                >
                    <ArrowUp size={20} />
                </motion.button>
            )}
        </AnimatePresence>
        <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform">
            <MessageCircle size={28} fill="white" className="text-white" />
        </a>
      </div>

      {/* --- CONTACT MODAL --- */}
      <AnimatePresence>
        {isContactOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContactOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="bg-[#0F172A] border border-white/10 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl shadow-violet-900/20">
                    <button onClick={() => setIsContactOpen(false)} className="absolute top-5 right-5 text-gray-500 hover:text-white transition"><X size={20}/></button>
                    
                    {formStatus === "success" ? (
                        <div className="text-center py-10">
                             <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce"><CheckCircle2 size={32} /></div>
                             <h3 className="text-2xl font-bold text-white mb-2">Reçu 5/5 !</h3>
                             <p className="text-gray-400 mb-6 text-sm">Merci {formData.name}, nous avons bien reçu votre demande.</p>
                             <button onClick={() => setIsContactOpen(false)} className="text-violet-400 font-medium hover:text-violet-300 underline">Fermer</button>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-white mb-2">On démarre ?</h3>
                            <p className="text-gray-400 text-sm mb-6">Dites-nous tout sur votre idée.</p>
                            
                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                <input type="hidden" name="_subject" value="Nouveau prospect ZK Agency !" />
                                
                                <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full input-dark rounded-lg px-4 py-3 text-sm" placeholder="Nom complet" />
                                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full input-dark rounded-lg px-4 py-3 text-sm" placeholder="Email professionnel" />
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative">
                                        <select name="type" value={formData.type} onChange={handleInputChange} className="w-full input-dark appearance-none rounded-lg px-3 py-3 text-sm cursor-pointer">
                                            <option>Site Vitrine</option>
                                            <option>E-commerce</option>
                                            <option>App SaaS</option>
                                            <option>Autre</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full input-dark appearance-none rounded-lg px-3 py-3 text-sm cursor-pointer">
                                            <option>Budget ?</option>
                                            <option>&lt; 2 000 €</option>
                                            <option>2k - 5k €</option>
                                            <option>+ 5k €</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full input-dark rounded-lg px-4 py-3 text-sm" placeholder="Détails du projet..." />
                                
                                <button disabled={formStatus === "loading"} className="btn-electric w-full py-3 rounded-lg mt-2 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70">
                                    {formStatus === "loading" ? <Loader2 size={18} className="animate-spin"/> : <Send size={18} />} 
                                    {formStatus === "loading" ? "Envoi..." : "Envoyer"}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 px-6 text-center overflow-hidden min-h-[80vh] flex flex-col justify-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[100px] -z-10"></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8 text-xs font-semibold text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                ZK Agency • Studio Digital Paris
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
                Nous sommes <br className="hidden md:block"/>
                <span className="text-gradient">ZK Agency.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Fusionnons design immersif et technologie de pointe pour propulser votre marque.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
                <button onClick={openContact} className="btn-electric px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2">
                    Lancer un projet <ArrowRight size={20}/>
                </button>
                <a href="#work" className="px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/10 hover:bg-white/5 transition-all">
                    Découvrir
                </a>
            </div>

            {/* Stats */}
            <div className="mt-20 pt-8 border-t border-white/10 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {STATS.map((stat, i) => (
                    <div key={i}>
                        <div className="text-2xl md:text-4xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs uppercase tracking-wider text-gray-400 font-medium mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
        </motion.div>
      </section>

      {/* --- SERVICES --- */}
      <section id="expertise" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-white">Notre Expertise</h2>
            <p className="text-gray-400 mt-2">Solutions 360° pour dominer votre marché.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            <div className="card-dark p-8 md:col-span-2">
                <div className="w-12 h-12 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-xl flex items-center justify-center mb-6"><Layout size={28}/></div>
                <h3 className="text-xl font-bold text-white mb-3">UI/UX Design & Branding</h3>
                <p className="text-gray-400 leading-relaxed">Interfaces futuristes et intuitives. Nous créons des identités visuelles fortes qui marquent les esprits et convertissent les visiteurs en clients fidèles.</p>
            </div>
            <div className="card-dark p-8 bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 border-violet-500/30">
                <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6"><Rocket size={28}/></div>
                <h3 className="text-xl font-bold text-white mb-3">Tech Elite</h3>
                <p className="text-violet-100 leading-relaxed">Next.js, React, Node. Performance maximale et sécurité militaire.</p>
            </div>
            <div className="card-dark p-8">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6"><Smartphone size={28}/></div>
                <h3 className="text-xl font-bold text-white mb-3">Mobile First</h3>
                <p className="text-gray-400 leading-relaxed">Applications réactives parfaitement adaptées, PWA ou natives.</p>
            </div>
            <div className="card-dark p-8 md:col-span-2">
                <div className="w-12 h-12 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl flex items-center justify-center mb-6"><Zap size={28}/></div>
                <h3 className="text-xl font-bold text-white mb-3">SEO & Performance</h3>
                <p className="text-gray-400 leading-relaxed">Optimisation radicale pour Google. Votre site charge en un éclair et remonte dans les résultats de recherche.</p>
            </div>
        </div>
      </section>

      {/* --- CARTE MONDE --- */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="text-left max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6">
                    Présence <span className="text-violet-400">Globale.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    Nous travaillons sans frontières pour des clients ambitieux.
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <Globe size={20} className="text-violet-400"/>
                        <span className="font-medium text-gray-300">International</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users size={20} className="text-violet-400"/>
                        <span className="font-medium text-gray-300">Support 24/7</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-2xl relative">
                <div className="relative aspect-[16/9] bg-[#0B1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" className="absolute inset-0 w-full h-full object-contain opacity-20 p-8 invert brightness-0" alt="World Map"/>
                    {CLIENT_LOCATIONS.map((loc, i) => (
                        <div key={i} className="absolute group z-20" style={{ top: loc.top, left: loc.left }}>
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 border-2 border-black"></span>
                            </span>
                            <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-gray-800 border border-white/20 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-xs">
                                    <p className="font-bold text-violet-300">{loc.project}</p>
                                    <p className="text-gray-400">{loc.city}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- PROJECTS AVEC MODALE --- */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-white">Projets Récents</h2>
                    <p className="text-gray-400 mt-2">Qualité pixel-perfect. Cliquez pour explorer.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-violet-400 font-semibold hover:text-white transition-all">
                    Voir tout <ArrowRight size={18}/>
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((p) => (
                    <div key={p.id} onClick={() => setSelectedProject(p)} className="group cursor-pointer">
                        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg relative aspect-[4/3] mb-5 bg-gray-800">
                            <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                <ExternalLink size={16} className="text-white"/>
                            </div>
                        </div>
                        <div className="px-1">
                            <span className="text-violet-400 text-xs font-bold uppercase tracking-wider">{p.category}</span>
                            <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-violet-400 transition-colors">{p.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2">{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF & FAQ --- */}
      <section id="testimonials" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-2xl font-bold text-white mb-8">La confiance de nos clients</h2>
                <div className="space-y-6">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="card-dark p-6 relative">
                            <div className="flex gap-1 mb-3 text-violet-400"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                            <p className="text-gray-300 italic mb-4 text-sm leading-relaxed">"{t.text}"</p>
                            <div>
                                <div className="font-bold text-white text-sm">{t.author}</div>
                                <div className="text-xs text-gray-500">{t.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 p-6 bg-violet-900/10 rounded-2xl border border-violet-500/20 flex items-start gap-4">
                    <ShieldCheck className="text-violet-400 shrink-0" size={24}/>
                    <div>
                        <h4 className="font-bold text-violet-200 text-sm">Garantie Qualité</h4>
                        <p className="text-violet-300/70 text-xs mt-1">Tous nos projets incluent une phase de recette, des tests de sécurité et une garantie de correction de bugs.</p>
                    </div>
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-white mb-8">Questions Fréquentes</h2>
                 <div className="space-y-3">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                            <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors">
                                <span className="font-semibold text-gray-200 text-sm">{item.q}</span>
                                <ChevronDown className={`text-gray-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-violet-400' : ''}`} size={18} />
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                        <div className="px-5 pb-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-[#02040a] text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
                <Box size={14} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">ZK <span className="text-violet-500">AGENCY</span>.</span>
        </div>
        <div className="flex justify-center gap-8 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/mentions-legales" className="hover:text-violet-400 transition">Mentions Légales</Link>
            <Link href="/mentions-legales" className="hover:text-violet-400 transition">Politique de Confidentialité</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); openContact(); }} className="hover:text-violet-400 transition">Nous Contacter</a>
        </div>
        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} ZK Agency. Tous droits réservés.</p>
      </footer>

      {/* --- COOKIES --- */}
      <AnimatePresence>
        {!cookiesAccepted && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed bottom-0 w-full bg-[#0F172A] border-t border-white/10 p-4 z-40 shadow-2xl">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Cookie size={20} className="text-violet-400 hidden md:block"/>
                        <p className="text-sm text-gray-300">En poursuivant votre navigation, vous acceptez l'utilisation de cookies.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setCookiesAccepted(true)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white">Refuser</button>
                        <button onClick={() => setCookiesAccepted(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">Accepter</button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODALE DÉTAIL PROJET --- */}
      <AnimatePresence>
        {selectedProject && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 p-4 md:p-8">
                {/* Overlay sombre flouté */}
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)} 
                    className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                />
                
                {/* Contenu de la modale */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 50 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    className="bg-[#0F172A] border border-white/10 rounded-2xl w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                >
                    <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full text-gray-300 hover:text-white hover:bg-violet-600 transition"><X size={20}/></button>
                    
                    {/* Image */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
                        <img src={selectedProject.img} className="absolute inset-0 w-full h-full object-cover" alt={selectedProject.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent md:bg-gradient-to-r"></div>
                    </div>

                    {/* Contenu texte */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar relative z-20">
                        <span className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-2 block">{selectedProject.category}</span>
                        <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                        
                        <p className="text-gray-300 text-lg mb-6 font-medium">
                            {selectedProject.desc}
                        </p>

                        <div className="text-gray-400 text-sm leading-relaxed mb-8 space-y-4 border-t border-white/10 pt-6">
                            <p>{selectedProject.longDesc}</p>
                            <p>Nous avons relevé le défi technique pour offrir une expérience utilisateur fluide et une interface d'administration puissante pour le client.</p>
                        </div>
                        
                        <div className="mb-8">
                            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Stack Technique</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tags && selectedProject.tags.map((tag: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full text-xs text-violet-300 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button className="btn-electric w-full py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
                            Voir le projet en ligne <ExternalLink size={18}/>
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}