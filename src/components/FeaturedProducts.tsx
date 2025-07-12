import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

const featuredProducts = [
  { id: 1, name: "Lemon Ginger Scrubbing Body Wash", price: "₹550.00", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/Ginger-Shower-Gel.jpg" },
  { id: 2, name: "Body Mist", price: "₹600", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/mist-copy.jpg" },
  { id: 3, name: "Clean Skin Anti Pigmentation Serum", price: "₹950", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/Serum.jpg" },
  { id: 4, name: "Tra Tree Body Wash For Men", price: "₹400", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/Shower-Gel-001.jpg" },
  { id: 5, name: "Solid Perfumes", price: "₹450", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/Solid-perfumes-copy.jpg" },
  { id: 6, name: "Natural Incense Sticks", price: "₹160", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/sticks-copy.jpg" },
  { id: 7, name: "Exotic Chocolate Creamy Bath Gel", price: "₹550", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Featured%20Products/Exotic-Chocolate.jpg" },
];

export const FeaturedProducts = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'start',
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="w-full">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
        </div>
        <div className="relative overflow-hidden" style={{ paddingLeft: '3%', paddingRight: '3%' }}>
          <div className="relative">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="embla__slide box-border"
                    style={{ flex: '0 0 355px', maxWidth: '355px' }}
                  >
                    <Card style={{ width: 355, height: 424, boxSizing: 'border-box', border: 'none', borderRadius: 0, boxShadow: 'none', background: 'none' }}>
                      <CardContent className="p-0 h-full w-full flex flex-col items-center justify-center" style={{ boxSizing: 'border-box' }}>
                        <div className="flex flex-col items-center justify-center w-full" style={{ padding: 0, height: '100%' }}>
                          <div
                            className="bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center"
                            style={{ width: 335, height: 335 }}
                          >
                            {typeof product.image === 'string' && product.image.startsWith('http') ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <span className="text-4xl md:text-8xl">
                                {product.image}
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-800 text-sm md:text-lg mb-2 text-center pt-4">{product.name}</h3>
                          <p className="font-normal text-gray-800 text-sm md:text-lg text-center">{product.price}</p>
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

export default FeaturedProducts;