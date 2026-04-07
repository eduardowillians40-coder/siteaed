import React from 'react';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="relative w-32 h-12">
          <Image src="/logo.png" alt="A e D Pet Logo" fill className="object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-[#f28c28] border-b-2 border-[#f28c28] pb-1 font-medium transition-all">Início</a>
          <a href="#produtos" className="text-[#554336] hover:text-[#f28c28] transition-colors font-medium">Produtos</a>
          <a href="#sobre" className="text-[#554336] hover:text-[#f28c28] transition-colors font-medium">Sobre</a>
          <a href="#mural" className="text-[#554336] hover:text-[#f28c28] transition-colors font-medium">Mural</a>
          <a href="#contato" className="text-[#554336] hover:text-[#f28c28] transition-colors font-medium">Contato</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/5512981311170?text=Olá,%20vim%20pelo%20site!" target="_blank" rel="noopener noreferrer" className="bg-[#f28c28] text-white px-6 py-2 rounded-xl font-bold hover:opacity-80 transition-all flex items-center gap-2">
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
