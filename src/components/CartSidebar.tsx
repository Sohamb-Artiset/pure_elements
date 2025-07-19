
import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch real cart items when sidebar opens or user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user || !isOpen) {
        setCartItems([]);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("cart")
        .select(`id, quantity, product:product_id (name, price, size, product_images(image_url))`)
        .eq("user_id", user.id);
      if (!error && Array.isArray(data)) {
        setCartItems(
          data.map((item: any) => ({
            id: item.id,
            name: item.product?.name || "",
            price: item.product?.price ? `₹${item.product.price}` : "",
            image: item.product?.product_images?.[0]?.image_url || "/placeholder.svg",
            quantity: item.quantity,
            size: item.product?.size || undefined,
          }))
        );
      } else {
        setCartItems([]);
      }
      setLoading(false);
    };
    fetchCartItems();
  }, [user, isOpen]);

  const recommendedProducts = [
    { id: "3", name: "Nourishing Body Massage Oil", price: "₹500.00", image: "/placeholder.svg" },
    { id: "4", name: "Almond Moisturising Lotion", price: "₹300.00", image: "/placeholder.svg" },
    { id: "5", name: "Pomegranate Intimate Wash", price: "₹400.00", image: "/placeholder.svg" }
  ];

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-xl flex">
        {/* Cart Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Shopping Cart ({cartItems.length})</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!user ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Please sign in to view your cart</p>
                <Button onClick={onClose}>Sign In</Button>
              </div>
            ) : loading ? (
              <div className="text-center py-8 text-gray-500">Loading cart...</div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 mb-1 truncate">{item.name}</h3>
                        {item.size && <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>}
                        <p className="text-green-600 font-bold mb-3">{item.price}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
          
          {user && cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total: ₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={onClose}>
                  Continue Shopping
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Recommendations Section */}
        <div className="w-80 border-l bg-gray-50 flex flex-col">
          <div className="p-4 border-b bg-white">
            <h3 className="font-bold text-lg">Recommended for you</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-green-600 font-bold text-sm mb-3">{product.price}</p>
                  <Button 
                    size="sm" 
                    className="w-full bg-green-600 hover:bg-green-700 text-xs"
                    disabled={!user}
                  >
                    {user ? 'Add to Cart' : 'Sign in to Add'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
