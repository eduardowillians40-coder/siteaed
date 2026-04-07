import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#f3f3f3] w-full rounded-t-3xl mt-20" id="contato">
      <div className="flex flex-col md:flex-row justify-between items-start p-12 gap-8 w-full max-w-7xl mx-auto font-body text-[#554336]">
        <div className="max-w-xs">
          <div className="relative w-48 h-20 mb-6 -ml-4">
            <Image src="/logo.png" alt="A e D Pet Logo" fill className="object-contain" referrerPolicy="no-referrer" />
          </div>
          <p className="leading-relaxed">Referência em nutrição e cuidado animal em Guaratinguetá e região. Entrega rápida e o melhor preço.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h5 className="font-bold text-[#4B2C20] mb-6">Contato</h5>
            <ul className="space-y-4">
              <li><a href="https://wa.me/5512981311170?text=Olá,%20vim%20pelo%20site!" target="_blank" rel="noopener noreferrer" className="text-[#554336] hover:text-[#f28c28] transition-all flex items-center gap-2"><Phone size={20} />(12) 98131-1170</a></li>
              <li><a href="mailto:alineverreschi81@gmail.com" className="text-[#554336] hover:text-[#f28c28] transition-all flex items-center gap-2"><Mail size={20} />alineverreschi81@gmail.com</a></li>
              <li className="text-[#554336] flex flex-col gap-1">
                <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Helenir+Carioca+dos+Reis+Barros+539+Guaratinguetá+São+Paulo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold hover:text-[#f28c28] transition-all">
                  <MapPin size={20} />Endereço:
                </a>
                <p className="text-sm">Avenida Helenir Carioca dos Reis Barros, 539</p>
                <p className="text-sm">Guaratinguetá, São Paulo, Brasil</p>
                <p className="text-sm">CEP 12512-348</p>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#4B2C20] mb-6">Redes Sociais</h5>
            <ul className="space-y-4">
              <li><a href="https://www.facebook.com/profile.php?id=100057516846572" target="_blank" rel="noopener noreferrer" className="text-[#554336] hover:text-[#f28c28] transition-all">Facebook</a></li>
              <li><a href="https://www.instagram.com/aedpet20/" target="_blank" rel="noopener noreferrer" className="text-[#554336] hover:text-[#f28c28] transition-all">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-12 py-8 border-t border-[#e2e2e2] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#554336]">
        <p>© 2024 A e D Pet. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#f28c28]">Privacidade</a>
          <a href="#" className="hover:text-[#f28c28]">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
}
