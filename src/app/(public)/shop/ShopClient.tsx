"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Search,
  Star,
  ExternalLink,
  ChevronDown,
  Check,
  AlertTriangle,
  XCircle,
  Package,
  MessageCircle,
  Zap,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  shortDesc: string | null;
  price: number;
  comparePrice: number | null;
  category: string;
  images: string | null;
  stock: number;
  features: string | null;
  isFeatured: boolean;
}

const categories = [
  { value: "ALL", label: "All" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "ACCESSORIES", label: "Accessories" },
  { value: "PERIPHERALS", label: "Peripherals" },
  { value: "NETWORKING", label: "Networking" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const categoryGradients: Record<string, string> = {
  ELECTRONICS: "from-orange-400 to-red-500",
  ACCESSORIES: "from-emerald-400 to-teal-500",
  PERIPHERALS: "from-violet-400 to-purple-500",
  NETWORKING: "from-sky-400 to-cyan-500",
};

const categoryIcons: Record<string, React.ElementType> = {
  ELECTRONICS: Package,
  ACCESSORIES: Star,
  PERIPHERALS: Zap,
  NETWORKING: ChevronDown,
};

const handleBuyOnWhatsApp = (product: Product) => {
  const message = encodeURIComponent(
    `Hello CYBER WEB! I'm interested in buying:\n\n*${product.title}*\nPrice: ${product.price.toLocaleString()} XAF\n\nPlease provide more details.`
  );
  window.open(`https://wa.me/237654492653?text=${message}`, "_blank");
};

function formatPrice(price: number): string {
  return price.toLocaleString() + " XAF";
}

function getDiscount(price: number, comparePrice: number): number {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

function getStockInfo(stock: number) {
  if (stock <= 0)
    return { label: "Out of Stock", color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", icon: XCircle };
  if (stock <= 10)
    return { label: "Low Stock", color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-500", icon: AlertTriangle };
  return { label: "In Stock", color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-500", icon: Check };
}

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "ALL") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        break;
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedProduct((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div>
      {/* ━━ HERO SECTION ━━ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Electronics Store
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Premium Electronics at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Best Prices
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover quality laptops, monitors, peripherals, and accessories at competitive
              prices. All products are genuine and backed by CYBER WEB&apos;s trusted service in Yaounde.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━ FILTER BAR (Sticky) ━━ */}
      <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-3">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    activeCategory === cat.value
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-9 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* ━━ PRODUCT GRID ━━ */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Product count */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
              {activeCategory !== "ALL" && (
                <span>
                  {" "}
                  in <span className="text-primary font-medium">{categories.find((c) => c.value === activeCategory)?.label}</span>
                </span>
              )}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-sm overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <CardContent className="p-5">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-7 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
              {filteredProducts.map((product) => {
                const stockInfo = getStockInfo(product.stock);
                const hasDiscount = product.comparePrice && product.comparePrice > product.price;
                const discount = hasDiscount ? getDiscount(product.price, product.comparePrice!) : 0;
                const images: string[] = product.images ? JSON.parse(product.images) : [];
                const features: string[] = product.features ? JSON.parse(product.features) : [];
                const isExpanded = expandedProduct === product.id;
                const IconComp = categoryIcons[product.category] || Package;
                const gradient = categoryGradients[product.category] || "from-orange-400 to-amber-500";

                return (
                  <StaggerItem key={product.id}>
                    <Card
                      className={`group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden flex flex-col ${
                        product.isFeatured ? "ring-2 ring-orange-400/60" : ""
                      }`}
                    >
                      {/* Image Area */}
                      <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                        {images.length > 0 ? (
                          <img
                            src={images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconComp className="w-16 h-16 text-white/40" />
                        )}

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.isFeatured && (
                            <Badge className="bg-amber-500 text-white border-0 shadow-sm text-xs font-semibold">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {hasDiscount && (
                            <Badge className="bg-red-500 text-white border-0 shadow-sm text-xs font-semibold">
                              -{discount}% OFF
                            </Badge>
                          )}
                        </div>

                        {/* Stock badge */}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stockInfo.bg} ${stockInfo.color}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${stockInfo.dot}`} />
                            {stockInfo.label}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-5 flex flex-col flex-1">
                        {/* Category */}
                        <Badge variant="outline" className="w-fit mb-2 text-xs">
                          {product.category}
                        </Badge>

                        {/* Title */}
                        <h3 className="font-semibold text-base mb-1 line-clamp-1">{product.title}</h3>

                        {/* Short Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                          {product.shortDesc || product.description}
                        </p>

                        {/* Price Section */}
                        <div className="mt-auto">
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-xl font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(product.comparePrice!)}
                              </span>
                            )}
                          </div>

                          {/* Expanded Features */}
                          {isExpanded && features.length > 0 && (
                            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Specifications
                              </p>
                              <ul className="space-y-1.5">
                                {features.map((f, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => handleBuyOnWhatsApp(product)}
                              disabled={product.stock <= 0}
                              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-10 gap-2 shadow-sm"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Buy on WhatsApp
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => toggleExpand(product.id)}
                              className="w-full h-9 text-sm gap-1"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                              {isExpanded ? "Hide Details" : "View Details"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No products found</h3>
              <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                {searchQuery
                  ? `No products match "${searchQuery}". Try a different search term.`
                  : `No products available in ${categories.find((c) => c.value === activeCategory)?.label || "this category"} yet.`}
              </p>
              {(searchQuery || activeCategory !== "ALL") && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("ALL");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ━━ SHOPPING INFO CTA ━━ */}
      <AnimatedSection>
        <section className="py-20 bg-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Easy Ordering via WhatsApp
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Contact us directly on WhatsApp and
              we&apos;ll help you find the perfect product at the best price. We deliver across Yaounde and Cameroon.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 h-12 font-semibold shadow-lg"
              onClick={() => {
                const msg = encodeURIComponent("Hello CYBER WEB! I'm looking for a specific product. Can you help?");
                window.open(`https://wa.me/237654492653?text=${msg}`, "_blank");
              }}
            >
              <span>
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat With Us on WhatsApp
              </span>
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
