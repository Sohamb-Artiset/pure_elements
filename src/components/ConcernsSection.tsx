import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

// Replace these with your actual images and links
const concerns = [
  {
    name: "Hair Strengthening",
    image: "/public/Concerns/hair-strengthening.jpg",
    link: "/product/hair-strengthening"
  },
  {
    name: "Anti Dandruff",
    image: "/public/Concerns/anti-dandruff.jpg",
    link: "/product/anti-dandruff"
  },
  {
    name: "Anti Acne",
    image: "/public/Concerns/anti-acne.jpg",
    link: "/product/anti-acne"
  },
  {
    name: "Anti Aging",
    image: "/public/Concerns/anti-aging.jpg",
    link: "/product/anti-aging"
  },
  {
    name: "Skin Brightening",
    image: "/public/Concerns/skin-brightening.jpg",
    link: "/product/skin-brightening"
  },
  {
    name: "Anti Pigmentation",
    image: "/public/Concerns/anti-pigmentation.jpg",
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
        <div className="relative overflow-visible">
          <div className="embla overflow-visible" ref={emblaRef}>
            <div className="embla__container flex">
              {concerns.map((concern, index) => (
                <a
                  key={index}
                  href={concern.link}
                  className="embla__slide px-2 group relative block min-h-[400px]"
                  style={{ flex: '0 0 25%', minWidth: '25%' }}
                >
                  <div
                    className="w-full h-[400px] bg-cover bg-center rounded-xl overflow-hidden relative shadow-md group-hover:shadow-xl transition-shadow"
                    style={{ backgroundImage: `url(${concern.image})` }}
                  >
                    <div className="absolute bottom-0 left-0 w-full bg-white/80 group-hover:bg-white/90 transition-colors p-6 text-2xl font-medium text-gray-900 font-sans" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {concern.name}
                    </div>
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
