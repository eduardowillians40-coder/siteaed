'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Mural() {
  const [posts, setPosts] = useState<any[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('mural_posts').select('*');
      if (error) console.error('Error fetching posts:', error);
      else setPosts(data || []);
    }
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 px-6 bg-white" id="mural">
      <div className="max-w-4xl mx-auto relative">
        <h2 className="font-headline text-4xl font-extrabold text-[#2e140a] mb-12 text-center bg-orange-500 py-4 px-8 rounded-2xl inline-block w-full border-4 border-[#d7ccc8] text-white">Mural de Avisos</h2>
        
        <div className="overflow-hidden px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {posts.map((post) => (
              <div key={post.id} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 bg-[#f3f3f3] p-5 rounded-3xl shadow-sm border-4 border-transparent hover:border-orange-500 transition-all duration-300">
                {post.image_url && (
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded-2xl">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <h3 className="font-bold text-xl text-[#2e140a] mb-2">{post.title}</h3>
                <p className="text-[#554336] text-sm leading-relaxed line-clamp-3">{post.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="absolute top-1/2 -left-4 md:-left-12 bg-orange-500 text-white p-2 rounded-full shadow-lg" onClick={scrollPrev}>
          <ChevronLeft size={24} />
        </button>
        <button className="absolute top-1/2 -right-4 md:-right-12 bg-orange-500 text-white p-2 rounded-full shadow-lg" onClick={scrollNext}>
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
