'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NextImage from 'next/image';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoriaPage() {
  const params = useParams();
  const categoria = decodeURIComponent(params.nome as string);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutosPorCategoria = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('categoria', categoria);
      
      if (error) console.error('Erro ao buscar produtos:', error);
      else setProdutos(data || []);
      setLoading(false);
    };

    fetchProdutosPorCategoria();
  }, [categoria]);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-10 border-b-4 border-orange-500 pb-4 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-[#2e140a] capitalize">{categoria}</h1>
        <Link href="/" className="flex items-center gap-2 text-[#914d00] font-bold hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Voltar
        </Link>
      </div>
      
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {produtos.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-2xl shadow-md border-2 border-orange-100 hover:border-orange-300 transition-all duration-300">
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                <NextImage 
                  src={p.image_url} 
                  alt={p.nome} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-lg text-[#2e140a]">{p.nome}</h3>
              <p className="text-gray-600 text-sm mt-1 mb-2">{p.descricao}</p>
              <p className="font-bold text-orange-600 text-lg">R$ {p.preco ? parseFloat(p.preco).toFixed(2) : '0.00'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
