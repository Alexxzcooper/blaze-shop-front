
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  LogIn,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsOpen: setCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">BlazeShop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="font-medium transition-colors hover:text-primary">
            Shop
          </Link>
          <Link to="/products?category=clothing" className="font-medium transition-colors hover:text-primary">
            Clothing
          </Link>
          <Link to="/products?category=accessories" className="font-medium transition-colors hover:text-primary">
            Accessories
          </Link>
        </nav>

        {/* Search, Cart, User (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Cart Button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User Dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  Hello, {user.displayName || user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          
          <Button variant="outline" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/products?category=clothing" 
                className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/products?category=accessories" 
                className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              
              {user ? (
                <>
                  <div className="px-2 py-2 font-medium">Hello, {user.displayName || user.email}</div>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="px-2 py-2 font-medium hover:bg-secondary rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center px-2 py-2 font-medium hover:bg-secondary rounded-md w-full text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center px-2 py-2 font-medium hover:bg-secondary rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
