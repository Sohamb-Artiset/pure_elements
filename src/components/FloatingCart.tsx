
import { useState } from "react";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingCart = () => {
  const [cartItems, setCartItems] = useState(2);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      <Button 
        size="lg" 
        className="w-16 h-16 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {cartItems}
          </span>
        )}
      </Button>
      
      <Button 
        size="lg" 
        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => window.open('https://wa.me/your-number', '_blank')}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};
