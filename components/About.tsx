'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-16 px-6 bg-[#f9f9f9]" id="sobre">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-headline text-4xl font-extrabold text-[#2e140a] mb-6">Sobre Nós</h2>
          <p className="text-lg text-[#554336] mb-6 leading-relaxed">
            A A e D Pet nasceu da paixão por animais e do desejo de oferecer o melhor cuidado possível. Nossa missão é proporcionar produtos de alta qualidade que promovam a saúde e o bem-estar dos pets em Guaratinguetá e região.
          </p>
          <p className="text-lg text-[#554336] leading-relaxed">
            Nossos valores são baseados no respeito, na transparência e no amor incondicional pelos animais. Buscamos sempre curadoria de produtos que garantam felicidade e conforto para seus melhores amigos.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] w-full"
        >
          <Image src="/frente2.png" alt="Sobre nós" fill className="object-cover rounded-[2rem]" referrerPolicy="no-referrer" />
        </motion.div>
      </div>
    </section>
  );
}
