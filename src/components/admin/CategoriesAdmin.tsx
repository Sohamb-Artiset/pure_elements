import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { List, arrayMove } from 'react-movable';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sub_categories?: string[];
}

export const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
  });

  // Add subcategory dialog state
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<{ catIdx: number; subIdx: number | null; name: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description, image_url, sub_categories')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error: unknown) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      image_url: formData.image_url,
    };

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Category updated successfully!" });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Category created successfully!" });
      }

      setDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image_url: category.image_url || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Category deleted successfully!" });
      fetchCategories();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
    });
    setEditingCategory(null);
  };

  // Handler to update category order
  const handleCategoryReorder = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const newCategories = arrayMove(categories, oldIndex, newIndex);
    setCategories(newCategories);
    // TODO: Save new order to database
  };

  // Handler to update subcategory order for a specific category
  const handleSubcategoryReorder = async (catIdx: number, oldIndex: number, newIndex: number) => {
    const newCategories = [...categories];
    const subcats = newCategories[catIdx].sub_categories || [];
    const newSubcats = arrayMove(subcats, oldIndex, newIndex);
    newCategories[catIdx].sub_categories = newSubcats;
    setCategories(newCategories);

    try {
      const { error } = await supabase
        .from('categories')
        .update({ sub_categories: newSubcats })
        .eq('id', newCategories[catIdx].id);

      if (error) {
        toast({
          title: "Error updating order",
          description: error.message,
          variant: "destructive",
        });
        // Revert to original order
        fetchCategories();
        return;
      }
      toast({ title: "Success", description: "Subcategory order updated!" });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
      fetchCategories();
    }
  };

  // Add subcategory handler
  const handleAddSubcategory = (catIdx: number) => {
    setEditingSub({ catIdx, subIdx: null, name: '' });
    setSubDialogOpen(true);
  };

  // Edit subcategory handler
  const handleEditSubcategory = (catIdx: number, subIdx: number, name: string) => {
    setEditingSub({ catIdx, subIdx, name });
    setSubDialogOpen(true);
  };

  // Delete subcategory handler
  const handleDeleteSubcategory = async (catIdx: number, subIdx: number) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;
    const newCategories = [...categories];
    const newSubcats = (newCategories[catIdx].sub_categories || []).filter((_, i) => i !== subIdx);
    newCategories[catIdx].sub_categories = newSubcats;

    try {
      const { error } = await supabase
        .from('categories')
        .update({ sub_categories: newSubcats })
        .eq('id', newCategories[catIdx].id);

      if (error) throw error;
      toast({ title: "Success", description: "Subcategory deleted successfully!" });
      setCategories(newCategories);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  // Save subcategory (add or edit)
  const handleSaveSubcategory = async () => {
    if (!editingSub) return;
    const { catIdx, subIdx, name } = editingSub;
    const newCategories = [...categories];
    const subcats = newCategories[catIdx].sub_categories || [];
    let newSubcats: string[];
    if (subIdx === null) {
      // Add
      newSubcats = [...subcats, name];
    } else {
      // Edit
      newSubcats = subcats.map((s, i) => (i === subIdx ? name : s));
    }
    newCategories[catIdx].sub_categories = newSubcats;

    try {
      const { error } = await supabase
        .from('categories')
        .update({ sub_categories: newSubcats })
        .eq('id', newCategories[catIdx].id);

      if (error) throw error;
      toast({ title: "Success", description: "Subcategory saved successfully!" });
      setCategories(newCategories);
      setSubDialogOpen(false);
      setEditingSub(null);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      });
    }
  };

  // Collapsible state for categories
  const [openCatIds, setOpenCatIds] = useState<Set<string>>(new Set());
  const toggleCat = (id: string) => {
    setOpenCatIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
      return newSet;
    });
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories Management</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <List
          values={categories}
          onChange={({ oldIndex, newIndex }) => handleCategoryReorder({ oldIndex, newIndex })}
          renderList={({ children, props, isDragged }) => (
            <div {...props} className="space-y-4">
              {children}
            </div>
          )}
          renderItem={({ value: category, index: catIdx, props, isDragged }) => {
            const hasSubcategories = Array.isArray(category.sub_categories) && category.sub_categories.length > 0;
            const isOpen = openCatIds.has(category.id);
            return (
              <div
                {...props}
                key={category.id}
                className={`bg-white rounded-lg shadow p-4 border border-gray-200 flex items-start gap-2 ${isDragged ? 'opacity-70' : ''}`}
              >
                {/* Drag handle icon only, always visible, does not intercept click events */}
                <span
                  data-movable-handle
                  className="flex items-center pr-2 cursor-grab select-none text-gray-500 hover:text-gray-700 focus:text-gray-700"
                  tabIndex={-1}
                  aria-label="Drag to reorder"
                  onClick={e => e.stopPropagation()} // Prevent drag handle from toggling subcategories
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <circle cx="6" cy="6" r="1.5" fill="black"/>
                    <circle cx="6" cy="14" r="1.5" fill="black"/>
                    <circle cx="14" cy="6" r="1.5" fill="black"/>
                    <circle cx="14" cy="14" r="1.5" fill="black"/>
                  </svg>
                </span>
                <div className="flex-1" onClick={hasSubcategories ? () => toggleCat(category.id) : undefined}>
                  <div
                    className={`flex justify-between items-center mb-2${hasSubcategories ? ' cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center">
                      {hasSubcategories && (
                        <span className="mr-2 text-gray-400">
                          <svg className={`w-4 h-4 inline transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                      <div>
                        <div className="text-lg font-bold">{category.name}</div>
                        <div className="text-xs text-gray-500">Slug: {category.slug}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleEdit(category); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); handleDelete(category.id); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {hasSubcategories && isOpen && (
                    <div className="ml-6 border-l pl-4 mt-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-sm">Subcategories</div>
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleAddSubcategory(catIdx); }}>+ Add Subcategory</Button>
                      </div>
                      <List
                        values={category.sub_categories || []}
                        onChange={({ oldIndex, newIndex }) => handleSubcategoryReorder(catIdx, oldIndex, newIndex)}
                        renderList={({ children, props }) => (
                          <div {...props} className="flex flex-col gap-3">
                            {children}
                          </div>
                        )}
                        renderItem={({ value: sub, index: subIdx, props: itemProps, isDragged: isSubDragged }) => (
                          <div
                            {...itemProps}
                            className={`bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between min-w-[180px] shadow-sm group ${isSubDragged ? 'opacity-70' : ''}`}
                          >
                            <span
                              data-movable-handle
                              className="cursor-grab select-none text-gray-500 mr-2"
                              onClick={e => e.stopPropagation()}
                            >
                              <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
                                  <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
                                  <circle cx="6" cy="14" r="1.5" fill="currentColor"/>
                                  <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
                                  <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
                              </svg>
                            </span>
                            <span className="text-gray-800 text-sm font-medium flex-1">{sub}</span>
                            <span className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition">
                              <Button size="sm" variant="outline" onClick={(e) => {e.stopPropagation(); handleEditSubcategory(catIdx, subIdx, sub)}}>Edit</Button>
                              <Button size="sm" variant="outline" onClick={(e) => {e.stopPropagation(); handleDeleteSubcategory(catIdx, subIdx)}}>Delete</Button>
                            </span>
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
      {/* Subcategory Dialog */}
      <Dialog open={subDialogOpen} onOpenChange={setSubDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSub?.subIdx === null ? 'Add Subcategory' : 'Edit Subcategory'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={e => { e.preventDefault(); handleSaveSubcategory(); }} className="space-y-4">
            <div>
              <Label htmlFor="sub_name">Subcategory Name</Label>
              <Input
                id="sub_name"
                value={editingSub?.name || ''}
                onChange={e => setEditingSub(editingSub ? { ...editingSub, name: e.target.value } : null)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingSub?.subIdx === null ? 'Add' : 'Update'}</Button>
              <Button type="button" variant="outline" onClick={() => setSubDialogOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
