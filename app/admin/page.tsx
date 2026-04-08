'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('Erro login:', err);
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-[#2e140a]">Login Admin</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 border rounded-xl"
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-6 border rounded-xl"
          required 
        />
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#f28c28] text-white p-3 rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}