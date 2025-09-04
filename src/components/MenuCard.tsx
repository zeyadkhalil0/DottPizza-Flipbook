import { MenuItem } from "@/types/menu";
import { Card, CardContent } from "@/components/ui/card";

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  return (
    <Card className="bg-gradient-page border-border shadow-page hover:shadow-flipbook transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold text-foreground leading-tight">
              {item.name}
            </h3>
            {item.featured && (
              <span className="bg-gradient-warmth text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                Chef's Special
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {item.description}
          </p>
          
          <div className="pt-2">
            <span className="text-2xl font-bold text-price-accent">
              ${item.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};