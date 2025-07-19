
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Type for product with images
export type ProductWithImages = Tables<'products'> & { product_images: { image_url: string }[] };

const ProductDetail = () => {
  const { id } = useParams(); // id is actually the slug
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setProduct(null);
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(image_url)")
        .eq("slug", id)
        .single();
      if (error || !data) {
        setError("Product not found.");
        setLoading(false);
        return;
      }
      setProduct(data as ProductWithImages);
      setCurrentImageIndex(0);
      setLoading(false);
    };
    if (id) fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % (product.product_images?.length || 1));
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev - 1 + (product.product_images?.length || 1)) % (product.product_images?.length || 1));
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast({ title: "Please sign in to add to cart", variant: "destructive" });
      return;
    }
    if (!product) return;
    setAddingToCart(true);
    const { error } = await supabase.from("cart").insert({
      user_id: user.id,
      product_id: product.id,
      quantity,
    });
    setAddingToCart(false);
    if (error) {
      toast({ title: "Failed to add to cart", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Added to cart!", description: `${product.name} x${quantity} added to your cart.` });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-red-500 text-lg">{error || "Product not found."}</span>
      </div>
    );
  }

  // Key ingredients and badges (if you want to keep them, you may want to parse from product.key_ingredients or similar fields)
  const keyIngredients = product.key_ingredients || [];
  // Example badges, you may want to map from product fields
  const badges = [
    { name: "VEGAN", icon: "🌱" },
    { name: "Paraben Free", icon: "✨" },
    { name: "No Harmful Ingredients", icon: "🚫" },
    { name: "FDA Approved Formulation", icon: "✅" },
    { name: "Cruelty Free", icon: "🐰" },
    { name: "Based on Ayurveda", icon: "🕉️" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.product_images?.[currentImageIndex]?.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.product_images && product.product_images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail Images */}
            {product.product_images && product.product_images.length > 1 && (
              <div className="flex gap-2">
                {product.product_images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-teal-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={img.image_url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
                {product.original_price && (
                  <span className="text-xl text-gray-500 line-through">₹{product.original_price}</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">Size: {product.size}</p>
            </div>
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
              {/* Special Offer */}
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 text-center">
                <p className="text-orange-800 font-medium">Buy 2 for ₹{product.price && product.price * 2 - 50}</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-2">
                  BUY NOW
                </Button>
              </div>
            </div>
            {/* Product Description */}
            <div className="space-y-4">
              <div className="prose max-w-none">
                {(product.additional_information || product.description)?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Key Ingredients */}
        {keyIngredients.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Key Ingredients</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {keyIngredients.map((ingredient, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <p className="text-sm text-gray-700">{ingredient}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Certification Badges */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-6">
            {badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 border-2 border-green-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg">{badge.icon}</span>
                </div>
                <p className="text-xs text-center text-gray-700 max-w-16">{badge.name}</p>
              </div>
            ))}
          </div>
        </section>
        {/* You may also like & Frequently Bought Together - Placeholder for now */}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
