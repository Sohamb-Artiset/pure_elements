import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";

// Local type for product with images
export type ProductWithImages = Tables<'products'> & { product_images: { image_url: string }[] };

export const ProductCard = ({ product }: { product: ProductWithImages }) => {
  return (
    <Card>
      <CardHeader>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.product_images?.[0]?.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-gray-500">{product.sub_category}</p>
        <p className="text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-lg font-bold">₹{product.price}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};
