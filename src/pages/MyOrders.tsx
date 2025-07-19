import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Types
interface CartWithProduct {
  id: string;
  created_at: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    size?: string | null;
  } | null;
}

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<CartWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("cart")
        .select(`id, created_at, quantity, product:product_id (name, price, size)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) {
        setOrders(data as CartWithProduct[]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  // Calculate total
  const total = orders.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <Card className="w-full max-w-3xl bg-white rounded shadow">
          <CardHeader>
            <CardTitle className="text-xl">Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-500 py-8">You have no orders yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>In Cart</TableCell>
                      <TableCell>₹{((order.product?.price || 0) * order.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        {order.product ? (
                          <ul className="list-disc pl-4">
                            <li>{order.product.name} x{order.quantity}</li>
                          </ul>
                        ) : (
                          <span className="text-gray-400">Product not found</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders; 