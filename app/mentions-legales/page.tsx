"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#030712] text-gray-300 font-sans selection:bg-violet-500/30 selection:text-violet-200 py-20 px-6">
      
      <div className="max-w-3xl mx-auto">
        {/* Navigation Retour */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-violet-400 hover:text-white transition-colors mb-12 text-sm font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour à l'accueil
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10">Mentions Légales & Confidentialité</h1>

        <div className="space-y-12">
          
          {/* Section 1 : Éditeur */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-violet-600 pl-4">1. Édition du site</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
              <p className="leading-relaxed text-gray-400">
                Le site <strong>ZK Agency</strong> est édité par : <br/><br/>
                <strong className="text-white">Nom / Raison Sociale :</strong> ZK Agency (Zakaria El Hefti)<br/>
                <strong className="text-white">Contact :</strong> elheftizakaria@gmail.com<br/>
                <strong className="text-white">Adresse :</strong> [TON ADRESSE À COMPLÉTER]<br/>
                <strong className="text-white">SIRET :</strong> [TON NUMÉRO SIRET À COMPLÉTER]
              </p>
            </div>
          </section>

          {/* Section 2 : Hébergement */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-violet-600 pl-4">2. Hébergement</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
              <p className="leading-relaxed text-gray-400">
                Le site est hébergé par la société :<br/><br/>
                <strong className="text-white">Vercel Inc.</strong><br/>
                440 N Barranca Ave #4133<br/>
                Covina, CA 91723<br/>
                États-Unis
              </p>
            </div>
          </section>

          {/* Section 3 : Confidentialité & RGPD */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-violet-600 pl-4">3. Politique de Confidentialité (RGPD)</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
              <p className="leading-relaxed text-gray-400">
                <strong>Données collectées :</strong> Nous collectons uniquement les données transmises via le formulaire de contact (Nom, Email, Message) dans le strict but de répondre à votre demande commerciale.<br/><br/>
                <strong>Conservation :</strong> Ces données sont conservées pendant une durée raisonnable nécessaire au traitement commercial et ne sont jamais vendues à des tiers.<br/><br/>
                <strong>Vos droits :</strong> Conformément au RGPD, vous pouvez demander la suppression de vos données en nous contactant à : <span className="text-violet-400">elheftizakaria@gmail.com</span>.
              </p>
            </div>
          </section>

          {/* Section 4 : Propriété Intellectuelle */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-violet-600 pl-4">4. Propriété Intellectuelle</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
              <p className="leading-relaxed text-gray-400">
                Tout le contenu de ce site (textes, images, code, logos) est la propriété exclusive de ZK Agency. Toute reproduction totale ou partielle est interdite sans autorisation écrite préalable.
              </p>
            </div>
          </section>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} ZK Agency. Tous droits réservés.</p>
        </div>

      </div>
    </div>
  );
}