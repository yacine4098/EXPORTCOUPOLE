'use client'

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, description, image, category }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          key={image}
          src={image}
          alt={title}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <div className="text-sm text-primary font-medium mb-2">{category}</div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Link href={`/products/${id}`}>
          <Button variant="ghost" className="gap-2 px-0 group/btn">
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
