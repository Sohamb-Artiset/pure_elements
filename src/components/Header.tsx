import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { CartSidebar } from "@/components/CartSidebar";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Define types for navigation items
interface NavSubItem {
  name: string;
  href: string;
}
interface NavItem {
  title: string;
  href: string;
  items: NavSubItem[];
}

export const Header = () => {
  const { user, profile, signOut } = useAuth();
  const [cartItems, setCartItems] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  // Fetch categories from Supabase and build nav items

  
  useEffect(() => {
    const fetchNavItems = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name, slug, sub_categories')
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }
      // Type guard and slugify
      const slugify = (str: string) =>
        str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      let categories: { name: string; slug: string; sub_categories: string[] | null }[] = [];
      if (Array.isArray(data)) {
        categories = (data as unknown[]).filter((cat): cat is { name: string; slug: string; sub_categories: string[] | null } =>
          cat && typeof cat === 'object' &&
          'name' in cat && typeof (cat as { name: unknown }).name === 'string' &&
          'slug' in cat && typeof (cat as { slug: unknown }).slug === 'string' &&
          ('sub_categories' in cat ? Array.isArray((cat as { sub_categories: unknown }).sub_categories) || (cat as { sub_categories: unknown }).sub_categories === null : true)
        );
      }
      // Sort categories by desired order
      const desiredOrder = [
        'skin-care',
        'hair-care',
        'body-care',
        'mens-care',
        'kids-care',
        'gifting',
        'offers',
        'regimes',
        'wellness',
        'perfumes'
      ];
      categories.sort((a, b) => {
        const aIndex = desiredOrder.indexOf(a.slug);
        const bIndex = desiredOrder.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
      const dynamicCategories = categories.map((cat) => {
        const items = Array.isArray(cat.sub_categories) && cat.sub_categories.length > 0
          ? cat.sub_categories.map((sub: string) => ({
              name: sub,
              href: `/products/${cat.slug}/${slugify(sub)}`,
            }))
          : [];
        return {
          title: cat.name,
          href: `/products/${cat.slug}`,
          items,
        };
      });
      // Add static links
      const aboutUsLink: NavItem = { title: 'About Us', href: '/about-us', items: [] };
      const storesLink: NavItem = { title: 'Stores', href: '/stores', items: [] };
      setNavItems([aboutUsLink, ...dynamicCategories, storesLink]);
    };
    fetchNavItems();
  }, []);

  // Fetch real cart count for the logged-in user
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user) {
        setCartItems(0);
        return;
      }
      const { count, error } = await supabase
        .from('cart')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      if (!error) {
        setCartItems(count || 0);
      }
    };
    fetchCartCount();
  }, [user, isCartOpen]); // refetch when user changes or cart sidebar is closed

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className={`bg-white shadow-sm sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} >
        <div className="container mx-auto px-4 py-4 h-full flex flex-col justify-between">
          {/* Top row with search, logo, and user actions */}
          <div className="pb-4" style={{ borderBottom: '1px solid #f99f36', height: '100px' }}>
            <div className="relative flex items-center justify-between h-auto">
              {/* Search Bar - Left */}
              <div className="max-w-xs pt-8">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 pr-4 py-1.5 w-full border-gray-300 text-sm h-8"
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                </div>
              </div>

              {/* Logo - Center */}
              <div className="absolute left-0 right-0 mx-auto flex justify-center items-center pt-8" style={{height: '100%'}}>
                <Link to="/">
                  <img src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/logo/Logo-01.svg" alt="Pure Elements Logo" style={{ width: '315px', height: '44px' }} className="mx-auto block" />
                </Link>
              </div>

              {/* User Actions - Right */}
              <div className="flex items-center justify-end space-x-4 pt-8" style={{ zIndex: 10 }}>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                        <User className="w-5 h-5 mr-2" />
                        {profile?.full_name || user.email}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-orders">My Orders</Link>
                      </DropdownMenuItem>
                      {profile?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    variant="outline" 
                    className="border-teal-600 text-teal-600 hover:bg-teal-50"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="relative border-teal-600 text-teal-600 hover:bg-teal-50"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Menu - Bottom row */}
          <div className="flex justify-center items-end flex-1 pb-0 m-0">
            <nav className="flex items-center w-full">
              {navItems.map((navItem, index) => (
                navItem.items && navItem.items.length > 0 ? (
                  <div
                    key={index}
                    className="relative group flex items-center flex-1 justify-center"
                    onMouseEnter={() => setOpenDropdown(navItem.title)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={navItem.href}
                      className="text-gray-700 hover:text-teal-600 transition-colors px-1.5 py-1.5 font-sans text-xs md:text-sm font-normal uppercase whitespace-nowrap text-center w-full flex items-center justify-center"
                      style={{ zIndex: 2 }}
                    >
                      {navItem.title}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Link>
                    <div
                      className={`absolute top-full left-0 bg-white shadow-lg rounded-md border z-50 min-w-[200px] mt-1 transition-all duration-300 delay-100 ${openDropdown === navItem.title ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    >
                      <ul className="py-2">
                        {navItem.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="relative group flex items-center flex-1 justify-center">
                    <Link
                      to={navItem.href}
                      className="text-gray-700 hover:text-teal-600 transition-colors px-1.5 py-1.5 font-sans text-xs md:text-sm font-normal uppercase whitespace-nowrap text-center w-full flex items-center justify-center"
                    >
                      {navItem.title}
                    </Link>
                  </div>
                )
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Auth Modal */}
      <AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
};

<style>
{`
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`}
</style>
