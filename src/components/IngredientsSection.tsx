
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

const ingredients = [
  { name: "Aloe Vera", benefit: "Soothes & Hydrates", icon: "🌿" },
  { name: "Turmeric", benefit: "Anti-inflammatory", icon: "🟡" },
  { name: "Neem", benefit: "Antibacterial", icon: "🍃" },
  { name: "Argan Oil", benefit: "Deep Nourishment", icon: "🥜" },
  { name: "Vitamin C", benefit: "Brightening", icon: "🍊" },
  { name: "Shea Butter", benefit: "Moisturizing", icon: "🧈" },
  { name: "Rose", benefit: "Anti-aging", icon: "🌹" },
  { name: "Tea Tree", benefit: "Purifying", icon: "🌿" },
];

export const IngredientsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
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
    }, 3500);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Natural Ingredients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We carefully source the finest natural ingredients from around the world, 
            each chosen for their proven benefits and purity
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="embla__slide flex-[0_0_16.666%] px-2">
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{ingredient.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{ingredient.name}</h3>
                      <p className="text-sm text-teal-600">{ingredient.benefit}</p>
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
      </div>
    </section>
  );
};
