import { featuredCreators } from "@/lib/data";
import CreatorGrid from "@/components/creators/creator-grid";

export default function CreatorsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Featured Creators</h1>
        <p className="text-lg text-muted-foreground">
          Discover talented creators and shop their curated collections.
        </p>
      </div>
      
      <CreatorGrid creators={featuredCreators} />
    </div>
  );
}