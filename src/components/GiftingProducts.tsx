import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { supabase } from '@/integrations/supabase/client';
import type { ProductWithImages } from '@/integrations/supabase/types';

export const GiftingProducts = () => {
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'start',
    skipSnaps: false,
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`*, product_images (image_url)`)
        .eq('sub_category', 'Gifting');
      if (!error && data) {
        setProducts(data as ProductWithImages[]);
      }
    };
    fetchProducts();
  }, []);

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      resetTimer();
    }
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      resetTimer();
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startTimer();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    }, 3000);
  };

  useEffect(() => {
    if (!emblaApi) return;
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [products, emblaApi]);

  if (products.length === 0) return null;

  return (
    <section className="py-8 md:py-16" style={{ background: '#fff4e4' }}>
      <div className="w-full">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Gifting Collection</h2>
        </div>
        <div className="relative overflow-hidden" style={{ paddingLeft: '3%', paddingRight: '3%' }}>
          <div className="relative">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="embla__slide box-border"
                    style={{ flex: '0 0 355px', maxWidth: '355px' }}
                  >
                    <Card style={{ width: 355, height: 424, boxSizing: 'border-box', border: 'none', borderRadius: 0, boxShadow: 'none', background: 'none' }}>
                      <CardContent className="p-0 h-full w-full flex flex-col items-center justify-center" style={{ boxSizing: 'border-box' }}>
                        <div className="flex flex-col items-center justify-center w-full relative" style={{ padding: 0, height: '100%' }}>
                          <div
                            className="bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center relative"
                            style={{ width: 335, height: 335 }}
                          >
                            {product.product_images?.[0]?.image_url ? (
                              <img
                                src={product.product_images[0].image_url}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <span className="text-4xl md:text-8xl">
                                {product.name.charAt(0)}
                              </span>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-start justify-center pt-4">
                              <h3 className="font-medium text-white text-sm md:text-lg text-center px-4">{product.name}</h3>
                            </div>
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent rounded-full p-2 z-10"
            >
              <ChevronLeft className="w-8 h-8 text-white font-bold" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent rounded-full p-2 z-10"
            >
              <ChevronRight className="w-8 h-8 text-white font-bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftingProducts; 