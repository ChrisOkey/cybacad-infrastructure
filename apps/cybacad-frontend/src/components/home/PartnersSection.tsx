import React from "react";

export default function PartnersSection() {
  const partners = [
    { name: "Google for Education", icon: "G" },
    { name: "CompTIA", icon: "C" },
    { name: "ISC2", icon: "I" },
    { name: "OWASP", icon: "O" },
  ];

  return (
    <section className="py-10 bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
          Curriculum Aligned With Standards From
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Replace these spans with real SVGs/Images later */}
           {partners.map((p) => (
             <div key={p.name} className="flex items-center gap-2 text-xl font-bold text-gray-300">
                <span className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-teal-500 font-mono">
                  {p.icon}
                </span>
                {p.name}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}