import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

const youtubeVideos = [
  { id: "1", title: "Customer Review 1", videoId: "dQw4w9WgXcQ" },
  { id: "2", title: "Customer Review 2", videoId: "dQw4w9WgXcQ" },
  { id: "3", title: "Customer Review 3", videoId: "dQw4w9WgXcQ" },
  { id: "4", title: "Customer Review 4", videoId: "dQw4w9WgXcQ" },
  { id: "5", title: "Customer Review 5", videoId: "dQw4w9WgXcQ" },
  { id: "6", title: "Customer Review 6", videoId: "dQw4w9WgXcQ" },
  { id: "7", title: "Customer Review 7", videoId: "dQw4w9WgXcQ" },
  { id: "8", title: "Customer Review 8", videoId: "dQw4w9WgXcQ" },
];

export const TestimonialsSection = () => {
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
    <section className="py-8 md:py-16 bg-white">
      <div className="w-full">
        <div className="text-center mb-2 md:mb-4 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Customer Testimonials</h2>
          <a href="#" className="text-lg md:text-xl text-orange-500 hover:underline mb-4 inline-block">View All</a>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {youtubeVideos.map((video) => (
                <div key={video.id} className="embla__slide flex-[0_0_50%] md:flex-[0_0_25%] px-2 md:px-4 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center" style={{ width: 342, height: 608 }}>
                    <iframe
                      width="342"
                      height="608"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-[342px] h-[608px]"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all z-10"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />
          </button>
        </div>
      </div>
    </section>
  );
};
