import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function CategoryCard({ title, description, icon, href }: Props) {
  return (
    <div className="group bg-white p-8 rounded-[2rem] transition-all hover:-translate-y-2 flex flex-col justify-between shadow-sm">
      <div>
        <div className="w-16 h-16 bg-[#f28c28]/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-headline text-2xl font-bold text-[#2e140a] mb-4">{title}</h3>
        <p className="text-[#554336] mb-6">{description}</p>
      </div>
      <Link href={href} className="flex items-center gap-2 text-[#914d00] font-bold group-hover:gap-4 transition-all">
        Explorar <ArrowRight size={20} />
      </Link>
    </div>
  );
}
