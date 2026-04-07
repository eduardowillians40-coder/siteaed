import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section className="py-16 px-6 bg-[#f9f9f9]" id="sobre">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-4xl font-extrabold text-[#2e140a] mb-6">Sobre Nós</h2>
          <p className="text-lg text-[#554336] mb-6 leading-relaxed">
            A A e D Pet nasceu da paixão por animais e do desejo de oferecer o melhor cuidado possível. Nossa missão é proporcionar produtos de alta qualidade que promovam a saúde e o bem-estar dos pets em Guaratinguetá e região.
          </p>
          <p className="text-lg text-[#554336] leading-relaxed">
            Nossos valores são baseados no respeito, na transparência e no amor incondicional pelos animais. Buscamos sempre curadoria de produtos que garantam felicidade e conforto para seus melhores amigos.
          </p>
        </div>
        <div className="relative h-[400px] w-full">
          <Image src="/frente2.png" alt="Sobre nós" fill className="object-cover rounded-[2rem]" referrerPolicy="no-referrer" />
        </div>
      </div>
    </section>
  );
}
