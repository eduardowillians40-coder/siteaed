'use client';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { supabase } from '@/lib/supabase';
import { Camera, Trash2, Loader2 } from 'lucide-react';

const CATEGORIAS = [
  'Rações para Cães',
  'Rações para Gatos',
  'Acessórios para Cães',
  'Acessórios para Gatos',
  'Petiscos para Cães',
  'Petiscos para Gatos',
  'Produtos de Higiene para Cães',
  'Produtos de Higiene para Gatos',
  'Medicamentos para Cães',
  'Medicamentos para Gatos'
];

export default function AdminDashboard() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [imagem, setImagem] = useState<File | null>(null);
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [muralTitle, setMuralTitle] = useState('');
  const [muralDesc, setMuralDesc] = useState('');
  const [muralImage, setMuralImage] = useState<File | null>(null);
  const [muralLoading, setMuralLoading] = useState(false);

  const fetchProdutos = async () => {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) console.error('Erro ao buscar produtos:', error);
    else setProdutos(data || []);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const processImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scale = Math.min(MAX_WIDTH / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        }, 'image/webp', 0.8);
      };
      img.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      let imageUrl = '';
      
      // Se houver imagem nova, faz upload
      if (imagem) {
        const processedBlob = await processImage(imagem);
        const fileName = `produto-${Date.now()}.webp`;
        const { error: uploadError } = await supabase.storage
          .from('produtos')
          .upload(fileName, processedBlob);
        
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from('produtos')
          .getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      if (editingId) {
        // Lógica de Update
        const updateData: any = { nome, descricao, categoria, preco: parseFloat(preco) };
        if (imageUrl) updateData.image_url = imageUrl;

        const { error: updateError } = await supabase
          .from('produtos')
          .update(updateData)
          .eq('id', editingId);
        
        if (updateError) throw updateError;
        alert('Produto atualizado com sucesso!');
      } else {
        // Lógica de Insert
        if (!imageUrl) throw new Error('Selecione uma imagem para o novo produto');
        const { error: insertError } = await supabase.from('produtos').insert({
          nome, descricao, categoria, image_url: imageUrl, preco: parseFloat(preco)
        });
        
        if (insertError) throw insertError;
        alert('Produto cadastrado com sucesso!');
      }

      fetchProdutos();
      setNome('');
      setDescricao('');
      setPreco('');
      setImagem(null);
      setEditingId(null);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar produto. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (p: any) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    
    // 1. Extrair o nome do arquivo da URL
    const fileName = p.image_url.split('/').pop();
    
    // 2. Deletar a imagem do Storage
    const { error: storageError } = await supabase.storage
      .from('produtos')
      .remove([fileName]);

    if (storageError) {
      console.error('Erro ao deletar imagem:', storageError);
      // Não bloqueamos a deleção do banco se a imagem falhar, mas avisamos
    }

    // 3. Deletar o registro do banco
    const { error: dbError } = await supabase.from('produtos').delete().eq('id', p.id);
    
    if (dbError) {
      console.error('Erro ao deletar produto:', dbError);
      alert('Erro ao deletar produto: ' + dbError.message);
    } else {
      fetchProdutos();
    }
  };

  const [muralPosts, setMuralPosts] = useState<any[]>([]);

  const fetchMuralPosts = async () => {
    const { data, error } = await supabase.from('mural_posts').select('*');
    if (error) console.error('Erro ao buscar mural:', error);
    else setMuralPosts(data || []);
  };

  useEffect(() => {
    fetchProdutos();
    fetchMuralPosts();
  }, []);

  const handleMuralDelete = async (p: any) => {
    if (!confirm('Tem certeza que deseja deletar este aviso do mural?')) return;
    
    // 1. Extrair o nome do arquivo da URL de forma mais segura
    const url = p.image_url;
    // Removemos qualquer prefixo de URL pública para pegar apenas o nome do arquivo
    const fileName = url.split('mural/')[1];
    
    console.log("Tentando deletar arquivo:", fileName);
    
    try {
      // 2. Deletar a imagem do Storage
      const { data, error: storageError } = await supabase.storage
        .from('mural')
        .remove([fileName]);

      if (storageError) {
        console.error('Erro detalhado do Storage:', storageError);
        alert('Erro ao deletar imagem do storage: ' + storageError.message);
        return; // Para a execução se falhar
      }
      
      console.log("Resultado da deleção:", data);

      // 3. Deletar o registro do banco
      const { error: dbError } = await supabase.from('mural_posts').delete().eq('id', p.id);
      
      if (dbError) {
        alert('Erro ao deletar aviso do banco: ' + dbError.message);
      } else {
        fetchMuralPosts();
        alert('Aviso deletado com sucesso!');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro inesperado ao deletar.');
    }
  };

  const handleMuralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (muralLoading || !muralImage) return;

    setMuralLoading(true);
    try {
      const processedBlob = await processImage(muralImage);
      const fileName = `mural-${Date.now()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from('mural')
        .upload(fileName, processedBlob);
      
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from('mural')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('mural_posts').insert({
        title: muralTitle,
        description: muralDesc,
        image_url: publicUrl
      });
      
      if (insertError) throw insertError;
      alert('Postado no mural com sucesso!');
      setMuralTitle('');
      setMuralDesc('');
      setMuralImage(null);
      fetchMuralPosts();
    } catch (error) {
      console.error('Erro ao postar no mural:', error);
      alert('Erro ao postar no mural.');
    } finally {
      setMuralLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Painel Administrativo</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna Esquerda: Produtos */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Cadastrar Produto</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-2 border rounded-lg" required />
              <input type="number" placeholder="Preço (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} className="p-2 border rounded-lg" required step="0.01" />
            </div>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full p-2 mt-4 border rounded-lg bg-white" required>
              {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full p-2 mt-4 border rounded-lg h-24" required />
            
            <label className="flex items-center justify-center gap-2 mt-4 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <Camera className="text-gray-400" />
              <span className="text-gray-600">{imagem ? imagem.name : 'Adicionar foto do produto'}</span>
              <input type="file" onChange={(e) => setImagem(e.target.files?.[0] || null)} className="hidden" accept="image/*" />
            </label>
            
            <button type="submit" disabled={loading} className="mt-4 w-full bg-orange-500 text-white p-3 rounded-lg font-bold hover:bg-orange-600 disabled:opacity-50">
              {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
            </button>
          </form>

          <h3 className="text-xl font-semibold">Produtos Cadastrados</h3>
          <div className="grid grid-cols-2 gap-4">
            {produtos.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <div className="relative w-full h-32 mb-2">
                  <NextImage src={p.image_url} alt={p.nome} fill className="object-cover rounded-md" referrerPolicy="no-referrer" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <h4 className="font-bold text-sm truncate">{p.nome}</h4>
                <p className="font-semibold text-sm text-orange-600">R$ {parseFloat(p.preco).toFixed(2)}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => { setEditingId(p.id); setNome(p.nome); setDescricao(p.descricao); setCategoria(p.categoria); setPreco(p.preco); }} className="text-blue-500 text-xs">Editar</button>
                  <button onClick={() => handleDelete(p)} className="text-red-500 text-xs">Deletar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Mural */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Cadastrar no Mural</h2>
          <form onSubmit={handleMuralSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <input type="text" placeholder="Título do aviso" value={muralTitle} onChange={(e) => setMuralTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
            <textarea placeholder="Descrição" value={muralDesc} onChange={(e) => setMuralDesc(e.target.value)} className="w-full p-2 mt-4 border rounded-lg h-24" required />
            
            <label className="flex items-center justify-center gap-2 mt-4 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              <Camera className="text-gray-400" />
              <span className="text-gray-600">{muralImage ? muralImage.name : 'Adicionar foto do aviso'}</span>
              <input type="file" onChange={(e) => setMuralImage(e.target.files?.[0] || null)} className="hidden" accept="image/*" />
            </label>
            
            <button type="submit" disabled={muralLoading} className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50">
              {muralLoading ? 'Postando...' : 'Postar no Mural'}
            </button>
          </form>

          <h3 className="text-xl font-semibold">Avisos no Mural</h3>
          <div className="grid grid-cols-2 gap-4">
            {muralPosts.map(p => (
              <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm border border border-gray-100">
                <div className="relative w-full h-32 mb-2">
                  <NextImage src={p.image_url} alt={p.title} fill className="object-cover rounded-md" referrerPolicy="no-referrer" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <h4 className="font-bold text-sm truncate">{p.title}</h4>
                <button onClick={() => handleMuralDelete(p)} className="text-red-500 text-xs mt-2">Deletar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}