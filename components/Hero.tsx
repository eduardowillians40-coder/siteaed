'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[80vh] flex items-center px-6 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#914d00] font-bold tracking-widest text-sm font-label uppercase bg-[#feccba]/50 px-3 py-1 rounded-full mb-6 inline-block"
          >
            Cuidado Premium
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline font-extrabold text-[#2e140a] text-4xl md:text-6xl leading-[1.1] mb-6 tracking-tighter"
          >
            Tudo o que seu melhor amigo precisa em um só lugar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#554336] mb-10 max-w-lg leading-relaxed"
          >
            As melhores rações e acessórios com entrega rápida em Guaratinguetá. Qualidade que o seu pet sente no dia a dia.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="https://wa.me/5512981311170?text=Olá,%20vim%20pelo%20site!" target="_blank" rel="noopener noreferrer" className="bg-[#f28c28] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-95 hover:shadow-lg hover:shadow-orange-300">
              Ver Catálogo no WhatsApp
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-[#feccba]/30 rounded-[3rem] rotate-3 -z-10 scale-95"></div>
          <Image src="/logo.png" alt="A e D Pet Logo" fill className="w-full h-full object-contain rounded-[3rem] transform -rotate-2 hover:rotate-0 transition-transform duration-700" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    </section>
  );
}