import { categories } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-lg text-muted-foreground">
          Explore our wide range of categories and find exactly what you're looking for.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={`/categories/${category.slug}`}>
            <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="h-full w-full bg-black/40 p-6 flex flex-col justify-end">
                    <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}