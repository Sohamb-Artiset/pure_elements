import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoreCard } from "@/components/StoreCard";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Store = Database['public']['Tables']['stores']['Row'];

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setStores(data);
      }
      setLoading(false);
    };
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontStyle: "normal",
              fontWeight: 500,
              color: "rgb(61, 92, 41)",
              fontSize: "24px",
              lineHeight: "24px",
            }}
          >
            Pure Elements Flagship Stores
          </h1>
        </div>
        <div className="space-y-16">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading stores...</div>
          ) : stores.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No stores found.</div>
          ) : (
            stores.map((store, index) => (
              <div key={store.id}>
                <StoreCard store={store} />
                {index < stores.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <img 
                      src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/stores//leaves.svg"
                      alt="Decorative leaves"
                      className="w-64 h-8"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stores;
