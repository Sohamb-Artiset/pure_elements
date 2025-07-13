import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, ProductWithImages } from "../components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const ProductsPage = () => {
  const { category, subCategory } = useParams();
  const [products, setProducts] = useState<ProductWithImages[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from("products").select(`
        *,
        product_images (
          image_url
        )
      `);

      if (subCategory) {
        query = query.eq("sub_category", subCategory);
      } else if (category) {
        const { data: categoryData } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", category)
          .single();
        if (categoryData) {
          query = query.eq("category_id", categoryData.id);
        }
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data as ProductWithImages[]);
      }
    };

    fetchProducts();
  }, [category, subCategory]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
