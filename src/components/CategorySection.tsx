import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Skin Care", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_1-1.png" },
  { name: "Hair Care", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_2-1.png" },
  { name: "Body Care", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_3-1.png" },
  { name: "Men's Care", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_4-1.png" },
  { name: "Wellness", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_5-1.png" },
  { name: "Kids Care", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_6-1.png" },
  { name: "Gifting Collection", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_7-1.png" },
  { name: "Luxury Perfumes", image: "https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/shop-by-category/ICON_8-1.png" },
];

export const CategorySection = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[3000px] mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center justify-start cursor-pointer group" style={{ width: 280, height: 320 }}>
              <div className="w-[280px] h-[280px] bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg">
                <img src={category.image} alt={category.name} className="w-[280px] h-[280px] object-cover rounded-full" />
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors text-2xl mt-2 text-center w-full">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
