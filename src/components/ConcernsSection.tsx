import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

// Replace these with your actual images and links
const concerns = [
  {
    name: "Hair Strengthening",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_41_Hair-Strengthning-5.jpg",
    link: "/product/hair-strengthening"
  },
  {
    name: "Anti Dandruff",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_42_Anti-Dandruff.jpg",
    link: "/product/anti-dandruff"
  },
  {
    name: "Anti Acne",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_43_Anti-Acne.jpg",
    link: "/product/anti-acne"
  },
  {
    name: "Anti Aging",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_44_Anti-Aging-2.jpg",
    link: "/product/anti-aging"
  },
  {
    name: "Skin Brightening",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_39_Skin-Brightning-3.jpg",
    link: "/product/skin-brightening"
  },
  {
    name: "Anti Pigmentation",
    image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Shop%20by%20Concern/imgi_40_Anti-Pigmantation-4.jpg",
    link: "/product/anti-pigmentation"
  },
  // Add more concerns as needed
];

export const ConcernsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
    dragFree: false,
    containScroll: false,
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
    }, 4000);
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-0" style={{ fontFamily: 'Montserrat, serif' }}>Shop By Concerns</h2>
        </div>
        <div className="relative">
          <div className="embla overflow-x-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {concerns.map((concern, index) => (
                <a
                  key={index}
                  href={concern.link}
                  className="embla__slide px-2 group relative block min-h-[400px]"
                  style={{ flex: '0 0 25%', minWidth: '25%' }}
                >
                  <div
                    className="w-full h-[400px] bg-cover bg-center  overflow-hidden relative "
                    style={{ backgroundImage: `url(${concern.image})` }}
                  >
                    {/* <div className="absolute bottom-0 left-0 w-full bg-white/80 group-hover:bg-white/90 transition-colors p-6 text-2xl font-medium text-gray-900 font-sans" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {concern.name}
                    </div> */}
                    <div className="absolute inset-0 group-hover:bg-black/10 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
            style={{ transform: 'translateY(-50%)' }}
          >
            <ChevronLeft className="w-7 h-7 text-green-900" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all z-10 border border-gray-200"
            style={{ transform: 'translateY(-50%)' }}
          >
            <ChevronRight className="w-7 h-7 text-green-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
