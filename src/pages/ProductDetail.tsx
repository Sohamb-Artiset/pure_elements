
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sample product data - in a real app, this would come from an API based on the ID
  const product = {
    id: id || "1",
    name: "Lemon Ginger Scrubbing Body Wash",
    description: "Buffering | Invigorating",
    price: "₹550.00",
    originalPrice: "₹650.00",
    size: "300 ML",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    keyIngredients: [
      { name: "Wild Turmeric", icon: "🌿" },
      { name: "Walnuts", icon: "🌰" },
      { name: "Mandarin", icon: "🍊" },
      { name: "Lemon", icon: "🍋" },
      { name: "Ginger grass", icon: "🌱" }
    ],
    badges: [
      { name: "VEGAN", icon: "🌱" },
      { name: "Paraben Free", icon: "✨" },
      { name: "No Harmful Ingredients", icon: "🚫" },
      { name: "FDA Approved Formulation", icon: "✅" },
      { name: "Cruelty Free", icon: "🐰" },
      { name: "Based on Ayurveda", icon: "🕉️" }
    ],
    description_text: `A unique shower gel which removes dead skin apart from cleansing, with a spicy combo of Ginger Extract and Lemon Zest oil. The fragrance lingers on after the shower, leaving a lemony freshness with the sharpness of Ginger and the freshness of Lemon.

An invigorating body wash, ideal for people who love active lifestyle and prefer some energy booster to start their day.

After showering, your skin will be perfectly cleansed and perfumed. Non-drying out.`,
    relatedProducts: [
      { id: "2", name: "Pomegranate Intimate Wash", price: "₹400.00", image: "/placeholder.svg" },
      { id: "3", name: "Rose Shea Butter Body Cream", price: "₹450.00", image: "/placeholder.svg" },
      { id: "4", name: "Nourishing Body Massage Oil", price: "₹500.00", image: "/placeholder.svg" },
      { id: "5", name: "Almond Moisturising Lotion", price: "₹300.00", image: "/placeholder.svg" }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

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
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
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
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-teal-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <span className="text-3xl font-bold text-green-600">{product.price}</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
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
                
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                  Add to Cart
                </Button>
              </div>
              
              {/* Special Offer */}
              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 text-center">
                <p className="text-orange-800 font-medium">Buy 2 for ₹850</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-2">
                  BUY NOW
                </Button>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <div className="prose max-w-none">
                {product.description_text.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Key Ingredients</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {product.keyIngredients.map((ingredient, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl">{ingredient.icon}</span>
                </div>
                <p className="text-sm text-gray-700">{ingredient.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certification Badges */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-6">
            {product.badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 border-2 border-green-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-lg">{badge.icon}</span>
                </div>
                <p className="text-xs text-center text-gray-700 max-w-16">{badge.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* You may also like */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2 text-sm">{relatedProduct.name}</h3>
                  <p className="text-green-600 font-bold mb-3">{relatedProduct.price}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Frequently Bought Together */}
        <section>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Bought Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={`fbt-${relatedProduct.id}`} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2 text-sm">{relatedProduct.name}</h3>
                  <p className="text-green-600 font-bold mb-3">{relatedProduct.price}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
