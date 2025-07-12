import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

const heroImages = [
  'https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Hero/Kumkumadi-Oil-Website-Banner-1.jpg',
  'https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Hero/suncreen-2-web-size-2048x798.png',
  'https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Hero/sunscreen-desktop.jpg',
];

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    }, 10000);
  };

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    startTimer();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="relative h-screen overflow-hidden pt-24 mt-[-96px]"
    >
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_100%] h-[calc(100vh-96px)] bg-black flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Hero Slide ${index + 1}`}
                className=" w-full h-full"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6 text-teal-600" />
      </button>
      
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all z-10"
      >
        <ChevronRight className="w-6 h-6 text-teal-600" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (emblaApi) {
                emblaApi.scrollTo(index);
                resetTimer();
              }
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex ? 'bg-teal-600' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
