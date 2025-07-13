
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables, Json } from '@/integrations/supabase/types';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

type Product = Tables<'products'>;
type Category = Tables<'categories'>;
type ProductImage = Tables<'product_images'>;

interface FaqItem {
  question: string;
  answer: string;
}

export const ProductsAdmin = () => {
  const [products, setProducts] = useState<(Product & { product_images: ProductImage[] })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const initialFormData = {
    name: '',
    description: '',
    price: '',
    original_price: '',
    key_ingredients: '',
    stock_quantity: '',
    model: '',
    best_suited_for: '',
    not_recommended_for: '',
    offer_available: false,
    faq: [] as FaqItem[],
    size: '',
    hsn_code: '',
    good_for: '',
    not_suitable_for: '',
    best_seller: false,
    seasons_demand: false,
    sale_toggle: false,
    top_trending: false,
    sequence: '',
    video_v_url: '',
    video_h_url: '',
    additional_information: '',
    product_tags: '',
    category_id: '',
    sub_category: '',
    channel_visibility: '',
    jet_video_type: '',
    jet_video_poster_url: '',
    jet_video_url: '',
    gallery_files: [] as File[],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(*)')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching products",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      setProducts((data as (Product & { product_images: ProductImage[] })[]) || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, sub_categories')
        .order('name');

      if (error) {
        toast({
          title: "Error fetching categories",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      setCategories((data as Category[]) || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, gallery_files: Array.from(e.target.files as FileList) }));
    }
  };

  const uploadGallery = async (productId: string) => {
    const uploadPromises = formData.gallery_files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${productId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath);

      return {
        product_id: productId,
        image_url: publicUrl,
        media_type: file.type.startsWith('video') ? 'video' : 'image',
      };
    });

    const newImagesData = await Promise.all(uploadPromises);

    if (newImagesData.length > 0) {
      const { error } = await supabase.from('product_images').insert(newImagesData);
      if (error) throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      key_ingredients: formData.key_ingredients.split(',').map(i => i.trim()),
      stock_quantity: parseInt(formData.stock_quantity),
      model: formData.model,
      best_suited_for: formData.best_suited_for,
      not_recommended_for: formData.not_recommended_for,
      offer_available: formData.offer_available,
      faq: formData.faq as unknown as Json,
      size: formData.size,
      hsn_code: formData.hsn_code,
      good_for: formData.good_for,
      not_suitable_for: formData.not_suitable_for,
      best_seller: formData.best_seller,
      seasons_demand: formData.seasons_demand,
      sale_toggle: formData.sale_toggle,
      top_trending: formData.top_trending,
      sequence: formData.sequence ? parseInt(formData.sequence) : null,
      video_v_url: formData.video_v_url,
      video_h_url: formData.video_h_url,
      additional_information: formData.additional_information,
      product_tags: formData.product_tags.split(',').map(t => t.trim()),
      category_id: formData.category_id,
      sub_category: formData.sub_category,
      channel_visibility: formData.channel_visibility,
      jet_video_type: formData.jet_video_type,
      jet_video_poster_url: formData.jet_video_poster_url,
      jet_video_url: formData.jet_video_url,
    };

    try {
      if (editingProduct) {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)
          .select()
          .single();
        
        if (error) throw error;
        if (formData.gallery_files.length > 0) {
          await uploadGallery(data.id);
        }
        toast({ title: "Success", description: "Product updated successfully!" });
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select()
          .single();
        
        if (error) throw error;
        if (formData.gallery_files.length > 0) {
          await uploadGallery(data.id);
        }
        toast({ title: "Success", description: "Product created successfully!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      original_price: product.original_price?.toString() || '',
      key_ingredients: product.key_ingredients?.join(', ') || '',
      stock_quantity: product.stock_quantity?.toString() || '',
      model: product.model || '',
      best_suited_for: product.best_suited_for || '',
      not_recommended_for: product.not_recommended_for || '',
      offer_available: product.offer_available || false,
      faq: (product.faq as unknown as FaqItem[]) || [],
      size: product.size || '',
      hsn_code: product.hsn_code || '',
      good_for: product.good_for || '',
      not_suitable_for: product.not_suitable_for || '',
      best_seller: product.best_seller || false,
      seasons_demand: product.seasons_demand || false,
      sale_toggle: product.sale_toggle || false,
      top_trending: product.top_trending || false,
      sequence: product.sequence?.toString() || '',
      video_v_url: product.video_v_url || '',
      video_h_url: product.video_h_url || '',
      additional_information: product.additional_information || '',
      product_tags: product.product_tags?.join(', ') || '',
      category_id: product.category_id || '',
      sub_category: product.sub_category || '',
      channel_visibility: product.channel_visibility || '',
      jet_video_type: product.jet_video_type || '',
      jet_video_poster_url: product.jet_video_poster_url || '',
      jet_video_url: product.jet_video_url || '',
      gallery_files: [],
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Product deleted successfully!" });
      fetchProducts();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingProduct(null);
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...formData.faq];
    newFaq[index][field] = value;
    setFormData({ ...formData, faq: newFaq });
  };

  const addFaqItem = () => {
    setFormData({ ...formData, faq: [...formData.faq, { question: '', answer: '' }] });
  };

  const removeFaqItem = (index: number) => {
    const newFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: newFaq });
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              
              <div>
                <Label htmlFor="additional_information">Additional Information (Rich Text)</Label>
                <Textarea id="additional_information" value={formData.additional_information} onChange={(e) => setFormData({ ...formData, additional_information: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="original_price">Original Price</Label>
                  <Input id="original_price" type="number" step="0.01" value={formData.original_price} onChange={(e) => setFormData({ ...formData, original_price: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input id="stock_quantity" type="number" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="sequence">Sequence</Label>
                  <Input id="sequence" type="number" value={formData.sequence} onChange={(e) => setFormData({ ...formData, sequence: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Size</Label>
                  <Input id="size" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="hsn_code">HSN Code</Label>
                  <Input id="hsn_code" value={formData.hsn_code} onChange={(e) => setFormData({ ...formData, hsn_code: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="best_suited_for">Best Suited For</Label>
                  <Input id="best_suited_for" value={formData.best_suited_for} onChange={(e) => setFormData({ ...formData, best_suited_for: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="not_recommended_for">Not Recommended For</Label>
                  <Input id="not_recommended_for" value={formData.not_recommended_for} onChange={(e) => setFormData({ ...formData, not_recommended_for: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="good_for">Good For</Label>
                  <Input id="good_for" value={formData.good_for} onChange={(e) => setFormData({ ...formData, good_for: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="not_suitable_for">Not Suitable For</Label>
                  <Input id="not_suitable_for" value={formData.not_suitable_for} onChange={(e) => setFormData({ ...formData, not_suitable_for: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value, sub_category: '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sub_category">Sub-Category</Label>
                  <Select value={formData.sub_category} onValueChange={(value) => setFormData({ ...formData, sub_category: value })} disabled={!formData.category_id}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.find(c => c.id === formData.category_id)?.sub_categories?.map((sub, index) => (
                        <SelectItem key={index} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="key_ingredients">Key Ingredients (comma separated)</Label>
                  <Input id="key_ingredients" value={formData.key_ingredients} onChange={(e) => setFormData({ ...formData, key_ingredients: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="product_tags">Product Tags (comma separated)</Label>
                  <Input id="product_tags" value={formData.product_tags} onChange={(e) => setFormData({ ...formData, product_tags: e.target.value })} />
                </div>
              </div>

              <div className="space-y-4 border p-4 rounded-md">
                <h4 className="font-medium">Toggles</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="offer_available" checked={formData.offer_available} onCheckedChange={(checked) => setFormData({ ...formData, offer_available: checked })} />
                    <Label htmlFor="offer_available">Offer Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="best_seller" checked={formData.best_seller} onCheckedChange={(checked) => setFormData({ ...formData, best_seller: checked })} />
                    <Label htmlFor="best_seller">Best Seller</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="seasons_demand" checked={formData.seasons_demand} onCheckedChange={(checked) => setFormData({ ...formData, seasons_demand: checked })} />
                    <Label htmlFor="seasons_demand">Season’s Demand</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sale_toggle" checked={formData.sale_toggle} onCheckedChange={(checked) => setFormData({ ...formData, sale_toggle: checked })} />
                    <Label htmlFor="sale_toggle">On Sale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="top_trending" checked={formData.top_trending} onCheckedChange={(checked) => setFormData({ ...formData, top_trending: checked })} />
                    <Label htmlFor="top_trending">Top Trending</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">FAQ</h4>
                  <Button type="button" size="sm" onClick={addFaqItem}><Plus className="w-4 h-4 mr-1" /> Add FAQ</Button>
                </div>
                {formData.faq.map((faq, index) => (
                  <div key={index} className="space-y-2 border p-2 rounded-md relative">
                    <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => removeFaqItem(index)}><X className="w-4 h-4" /></Button>
                    <Input placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, 'question', e.target.value)} />
                    <Textarea placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} />
                  </div>
                ))}
              </div>

              <div className="space-y-4 border p-4 rounded-md">
                <h4 className="font-medium">Videos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="video_v_url">Vertical Video URL</Label>
                    <Input id="video_v_url" value={formData.video_v_url} onChange={(e) => setFormData({ ...formData, video_v_url: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="video_h_url">Horizontal Video URL</Label>
                    <Input id="video_h_url" value={formData.video_h_url} onChange={(e) => setFormData({ ...formData, video_h_url: e.target.value })} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border p-4 rounded-md">
                <h4 className="font-medium">Jet Product Gallery Video</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jet_video_type">Video Type</Label>
                      <Select value={formData.jet_video_type} onValueChange={(value) => setFormData({ ...formData, jet_video_type: value })}>
                        <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="vimeo">Vimeo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="jet_video_url">Video URL</Label>
                      <Input id="jet_video_url" value={formData.jet_video_url} onChange={(e) => setFormData({ ...formData, jet_video_url: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="jet_video_poster_url">Video Poster Image URL</Label>
                      <Input id="jet_video_poster_url" value={formData.jet_video_poster_url} onChange={(e) => setFormData({ ...formData, jet_video_poster_url: e.target.value })} />
                    </div>
                 </div>
              </div>

              <div>
                <Label htmlFor="gallery_files">Product Gallery (Images/Videos)</Label>
                <Input id="gallery_files" type="file" multiple onChange={handleFileChange} accept="image/*,video/*" />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="outline">{categories.find(c => c.id === product.category_id)?.name || 'Uncategorized'}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 truncate">{product.description}</p>
                <div className="flex gap-4">
                  <span className="font-bold">₹{product.price}</span>
                  {product.original_price && (
                    <span className="text-gray-500 line-through">₹{product.original_price}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Stock: {product.stock_quantity}</Badge>
                  <Badge variant={product.is_active ? "default" : "destructive"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                   <Badge variant={product.best_seller ? "default" : "secondary"}>
                    {product.best_seller ? "Best Seller" : "Not Best Seller"}
                  </Badge>
                </div>
                {product.key_ingredients && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <p className="text-xs font-semibold w-full">Key Ingredients:</p>
                    {product.key_ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline">{ingredient}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
