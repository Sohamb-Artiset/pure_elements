import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export const ProductShowcase = () => {
  type Product = Database["public"]["Tables"]["products"]["Row"] & { categories?: { name: string } };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section
      className="py-16 bg-green-50 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/landing-page/Our%20Best%20/Toxin-Free-e1710503110276.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        backgroundSize: 'auto 100%',
        opacity: 1
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Bestsellers</h2>
          <p className="text-gray-600">Top-rated products loved by our customers</p>
        </div>
        <div className="max-w-8xl mx-auto">
          <div className="md:ml-[370px]">
            {loading ? (
              <div className="text-center py-12 text-green-700 font-semibold">Loading products...</div>
            ) : (
              <Carousel opts={{ loop: true }}>
                <CarouselContent className="-ml-4">
                  {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-4 basis-1/3 max-w-[33.33%]">
                      <Link to={`/product/${product.id}`}>
                        <Card className="hover:shadow-xl transition-shadow bg-white cursor-pointer">
                          <CardContent className="p-0">
                            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-6xl rounded-t-lg">
                                <span role="img" aria-label="product">🧴</span>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-green-600 font-medium">{product.categories?.name || ""}</p>
                              <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                              <div className="flex items-center gap-2 mb-3">
                                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                                  {product.original_price && (
                                    <span className="text-sm text-gray-500 line-through">₹{product.original_price}</span>
                                  )}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <span className="text-yellow-500">⭐</span>
                                    <span className="text-sm text-gray-600">{product.rating?.toFixed(1) ?? "4.8"}</span>
                                </div>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
