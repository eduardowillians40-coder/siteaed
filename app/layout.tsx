import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const headline = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-headline' });
const body = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'A e D Pet - Tudo para seu melhor amigo',
  description: 'Referência em nutrição e cuidado animal em Guaratinguetá.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${headline.variable} ${body.variable}`}>
      <body suppressHydrationWarning className="font-body text-[#4B2C20] bg-[#f9f9f9]">{children}</body>
    </html>
  );
}
