import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlipbookNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  canFlipPrev: boolean;
  canFlipNext: boolean;
}

export const FlipbookNavigation = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  canFlipPrev,
  canFlipNext,
}: FlipbookNavigationProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto mt-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onPrevPage}
        disabled={!canFlipPrev}
        className="bg-secondary/50 hover:bg-secondary border-border text-secondary-foreground disabled:opacity-30"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === currentPage
                ? "bg-primary"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={onNextPage}
        disabled={!canFlipNext}
        className="bg-secondary/50 hover:bg-secondary border-border text-secondary-foreground disabled:opacity-30"
      >
        Next
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};