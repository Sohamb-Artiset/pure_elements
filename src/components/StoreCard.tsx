import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Store {
  id: string|number;
  name: string;
  address: string;
  contact: string;
  images: string[];
}

interface StoreCardProps {
  store: Store;
}

export const StoreCard = ({ store }: StoreCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const imageCount = store.images.length;

  const nextImage = () => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imageCount);
      setIsAnimating(false);
    }, 400);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
      setIsAnimating(false);
    }, 400);
  };

  // Calculate the 3 indices to show
  const getIndices = () => [0, 1, 2].map(i => (currentImageIndex + i) % imageCount);
  const indices = getIndices();

  // For animation, duplicate the images at the start and end
  const extendedIndices = [
    (currentImageIndex - 1 + imageCount) % imageCount,
    ...indices,
    (currentImageIndex + 3) % imageCount
  ];

  // Animation offset
  const offset = isAnimating ? (direction === 'right' ? -100 : 100) : 0;
  const transition = isAnimating ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none';

  const handleGetLocation = () => {
    const searchQuery = encodeURIComponent(`Pure Elements ${store.address}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Store Information */}
      <div className="mb-8">
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontStyle: "normal",
            fontWeight: 500,
            color: "rgb(61, 92, 41)",
            fontSize: "20px",
            lineHeight: "20px",
          }}
        >
          {store.name}
        </h2>
        <div style={{ fontFamily: "Montserrat, sans-serif", fontStyle: "normal", fontWeight: 500, color: "rgb(63, 63, 63)", fontSize: "14px", lineHeight: "22px" }}>
          <p>
            {store.address}
          </p>
          <p>
            Contact - {store.contact}
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative mb-8 overflow-hidden" style={{ width: '100%', maxWidth: '768px', margin: '0 auto' }}>
        <div
          ref={carouselRef}
          className="flex"
          style={{
            width: '100%',
            transform: `translateX(calc(-100%/3 + ${offset}%))`,
            transition,
          }}
        >
          {extendedIndices.map((idx, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg shadow-lg min-w-0 w-1/3 flex-shrink-0 px-2">
              <img
                src={store.images[idx]}
                alt={`${store.name} - Image ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {store.images.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? 'bg-teal-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center">
          <img 
            src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/stores//Google%20Maps%20Icon.svg"
            alt="Google Maps"
            className="w-12 h-12"
          />
        </div>
        
        <Button
          onClick={handleGetLocation}
          className="bg-white border border-[#8F9C75] text-[#8F9C75] hover:bg-[#8F9C75] hover:text-white px-8 py-3 text-lg font-medium transition-colors duration-200"
        >
          Get the Store Location
        </Button>
      </div>
    </div>
  );
};
