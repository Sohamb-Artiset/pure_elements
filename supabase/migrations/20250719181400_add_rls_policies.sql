-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to categories" ON "public"."categories";
DROP POLICY IF EXISTS "Allow public read access to offers" ON "public"."offers";
DROP POLICY IF EXISTS "Allow public read access to product_images" ON "public"."product_images";
DROP POLICY IF EXISTS "Allow public read access to products" ON "public"."products";
DROP POLICY IF EXISTS "Allow public read access to stores" ON "public"."stores";
DROP POLICY IF EXISTS "Allow individual read access to cart" ON "public"."cart";
DROP POLICY IF EXISTS "Allow individual insert access to cart" ON "public"."cart";
DROP POLICY IF EXISTS "Allow individual update access to cart" ON "public"."cart";
DROP POLICY IF EXISTS "Allow individual delete access to cart" ON "public"."cart";
DROP POLICY IF EXISTS "Allow individual read access to profiles" ON "public"."profiles";
DROP POLICY IF EXISTS "Allow individual update access to profiles" ON "public"."profiles";

-- Enable RLS for all tables
ALTER TABLE "cart" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "offers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "stores" ENABLE ROW LEVEL SECURITY;

--
-- RLS Policies for "public" tables
--
CREATE POLICY "Allow public read access to categories" ON "public"."categories"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access to offers" ON "public"."offers"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access to product_images" ON "public"."product_images"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access to products" ON "public"."products"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read access to stores" ON "public"."stores"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

--
-- RLS Policies for "user-specific" tables
--
CREATE POLICY "Allow individual read access to cart" ON "public"."cart"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow individual insert access to cart" ON "public"."cart"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow individual update access to cart" ON "public"."cart"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow individual delete access to cart" ON "public"."cart"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Allow individual read access to profiles" ON "public"."profiles"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Allow individual update access to profiles" ON "public"."profiles"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (auth.uid() = id);
