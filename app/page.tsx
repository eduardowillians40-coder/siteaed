import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import About from '@/components/About';
import Mural from '@/components/Mural';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { PawPrint, Scissors, Cookie, Sparkles, Stethoscope } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-[#f9f9f9]">
      <Navbar />
      <Hero />
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 to-orange-100"></div>
      <section id="produtos" className="py-16 bg-[#f3f3f3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-extrabold text-[#2e140a] mb-4">Categorias em Destaque</h2>
            <div className="w-20 h-1.5 bg-[#f28c28] rounded-full"></div>
          </div>

            {/* Seção Cães */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500">
                <Image src="/cão.png" alt="Filhote de cachorro" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-3xl font-bold text-[#2e140a]">Para Cães</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <CategoryCard title="Rações" description="Marcas para cães." icon={<PawPrint size={32} className="text-[#914d00]" />} href="/categoria/Rações para Cães" />
              <CategoryCard title="Acessórios" description="Coleiras e brinquedos." icon={<Scissors size={32} className="text-[#914d00]" />} href="/categoria/Acessórios para Cães" />
              <CategoryCard title="Petiscos" description="Mimos saudáveis." icon={<Cookie size={32} className="text-[#914d00]" />} href="/categoria/Petiscos para Cães" />
              <CategoryCard title="Higiene" description="Shampoos e perfumes." icon={<Sparkles size={32} className="text-[#914d00]" />} href="/categoria/Produtos de Higiene para Cães" />
              <CategoryCard title="Medicamentos" description="Tratamentos." icon={<Stethoscope size={32} className="text-[#914d00]" />} href="/categoria/Medicamentos para Cães" />
            </div>
          </div>

          {/* Seção Gatos */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500">
                <Image src="/Gato.png" alt="Filhote de gato" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-3xl font-bold text-[#2e140a]">Para Gatos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <CategoryCard title="Rações" description="Marcas para gatos." icon={<PawPrint size={32} className="text-[#914d00]" />} href="/categoria/Rações para Gatos" />
              <CategoryCard title="Acessórios" description="Coleiras e brinquedos." icon={<Scissors size={32} className="text-[#914d00]" />} href="/categoria/Acessórios para Gatos" />
              <CategoryCard title="Petiscos" description="Mimos saudáveis." icon={<Cookie size={32} className="text-[#914d00]" />} href="/categoria/Petiscos para Gatos" />
              <CategoryCard title="Higiene" description="Shampoos e perfumes." icon={<Sparkles size={32} className="text-[#914d00]" />} href="/categoria/Produtos de Higiene para Gatos" />
              <CategoryCard title="Medicamentos" description="Tratamentos." icon={<Stethoscope size={32} className="text-[#914d00]" />} href="/categoria/Medicamentos para Gatos" />
            </div>
          </div>
        </div>
      </section>
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 to-orange-100"></div>
      <About />
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 to-orange-100"></div>
      <Mural />
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 to-orange-100"></div>
      <Footer />
    </main>
  );
}
