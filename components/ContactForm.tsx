'use client';
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name,
      email: !formData.email,
      message: !formData.message,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      alert('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section className="py-24 px-6 bg-white" id="contato">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-4xl font-extrabold text-[#2e140a] mb-8 text-center">Entre em Contato</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#f3f3f3] p-8 rounded-3xl">
          <div>
            <label className="block font-bold mb-2 text-[#4B2C20]">Nome</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full p-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-transparent'} bg-white`} />
            {errors.name && <p className="text-red-500 text-sm mt-1">Nome é obrigatório</p>}
          </div>
          <div>
            <label className="block font-bold mb-2 text-[#4B2C20]">E-mail</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-transparent'} bg-white`} />
            {errors.email && <p className="text-red-500 text-sm mt-1">E-mail é obrigatório</p>}
          </div>
          <div>
            <label className="block font-bold mb-2 text-[#4B2C20]">Mensagem</label>
            <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full p-4 rounded-xl border ${errors.message ? 'border-red-500' : 'border-transparent'} bg-white h-32`} />
            {errors.message && <p className="text-red-500 text-sm mt-1">Mensagem é obrigatória</p>}
          </div>
          <button type="submit" className="w-full bg-[#f28c28] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
}
