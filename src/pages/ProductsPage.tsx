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

      if (category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id, sub_categories")
          .eq("slug", category)
          .single();

        if (categoryError) {
          console.error("Error fetching category:", categoryError);
          return;
        }

        if (categoryData) {
          if (subCategory) {
            const slugify = (str: string) =>
              str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            const originalSubCategory =
              categoryData.sub_categories?.find(
                (sc) => slugify(sc) === subCategory
              ) || null;

            if (originalSubCategory) {
              query = query.eq("sub_category", originalSubCategory);
            } else {
              // Handle case where subCategory slug doesn't match any sub_category
              setProducts([]);
              return;
            }
          } else {
            query = query.eq("category_id", categoryData.id);
          }
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
