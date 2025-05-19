import { products } from "@/lib/data";
import ProductGrid from "@/components/products/product-grid";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-lg text-muted-foreground">
          Browse our complete collection of unique products from talented creators.
        </p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
}