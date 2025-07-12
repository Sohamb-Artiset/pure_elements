import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Store = Database['public']['Tables']['stores']['Row'];

export const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (!error && data) {
        setStores(data);
      }
      setLoading(false);
    };
    fetchStores();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Auto-scroll every 4 seconds
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-16 bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Stores</h2>
          <p className="text-gray-600">Visit our stores for a personalized shopping experience</p>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading stores...</div>
        ) : stores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No stores found.</div>
        ) : (
        <div className="relative overflow-x-hidden">
          <div className="embla overflow-x-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {stores.map((store) => (
                <div key={store.id} className="embla__slide flex-[0_0_25%] px-3">
                  <Card className="hover:shadow-lg transition-shadow bg-white">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-6xl rounded-t-lg overflow-hidden relative">
                        {store.images && store.images.length > 0 ? (
                          <img src={store.images[0]} alt={store.name} className="w-full h-full object-cover" />
                        ) : (
                          <span role="img" aria-label="store">🏪</span>
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                          <h3 className="font-semibold text-sm m-0">{store.name}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-teal-600" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-teal-600" />
          </button>
        </div>
        )}
      </div>
    </section>
  );
};
