import { useState, useEffect, useCallback } from "react";
import { MenuCard } from "./MenuCard";
import { FlipbookNavigation } from "./FlipbookNavigation";
import { useFlipSound } from "@/hooks/useFlipSound";
import { menuData } from "@/data/menuItems";
import { MenuItem } from "@/types/menu";

export const MenuFlipbook = () => {
  // Flatten all menu items into pages
  const allItems: MenuItem[] = [
    ...menuData.appetizers,
    ...menuData.mains,
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const { playFlipSound } = useFlipSound();

  const totalPages = allItems.length;

  const handlePageFlip = useCallback(
    (direction: "next" | "prev") => {
      if (isFlipping) return;

      setIsFlipping(true);
      playFlipSound();

      setTimeout(() => {
        if (direction === "next" && currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
        setIsFlipping(false);
      }, 300);
    },
    [currentPage, totalPages, isFlipping, playFlipSound]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handlePageFlip("next");
      } else if (event.key === "ArrowLeft") {
        handlePageFlip("prev");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlePageFlip]);

  const getCategoryTitle = (item: MenuItem) => {
    switch (item.category) {
      case "appetizer":
        return "Appetizers";
      case "main":
        return "Main Courses";
      case "dessert":
        return "Desserts";
      default:
        return "";
    }
  };

  const currentItem = allItems[currentPage];
  const isFirstOfCategory = currentPage === 0 || 
    allItems[currentPage - 1]?.category !== currentItem?.category;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8">
      {/* Restaurant Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-warmth bg-clip-text text-transparent mb-4">
          DottPizza
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Fine Dining Experience
        </p>
      </div>

      {/* Flipbook Container */}
      <div className="relative perspective-1000">
        <div
          className={`relative w-80 md:w-96 h-[500px] md:h-[600px] transform-style-preserve-3d transition-transform duration-600 ease-in-out ${
            isFlipping ? "animate-flip-page" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Current Page */}
          <div className="absolute inset-0 backface-hidden bg-menu-page rounded-lg shadow-flipbook border border-border overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Category Header */}
              {isFirstOfCategory && (
                <div className="bg-menu-spine p-6 border-b border-border">
                  <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
                    {getCategoryTitle(currentItem)}
                  </h2>
                </div>
              )}
              
              {/* Menu Item */}
              <div className="flex-1 p-4 flex items-center">
                <MenuCard item={currentItem} />
              </div>
            </div>
          </div>

          {/* Next Page Preview (hidden behind) */}
          {currentPage < totalPages - 1 && (
            <div 
              className="absolute inset-0 backface-hidden bg-menu-page rounded-lg shadow-page border border-border overflow-hidden transform rotateY-180"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 p-4 flex items-center">
                  <MenuCard item={allItems[currentPage + 1]} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <FlipbookNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={() => handlePageFlip("prev")}
        onNextPage={() => handlePageFlip("next")}
        canFlipPrev={currentPage > 0 && !isFlipping}
        canFlipNext={currentPage < totalPages - 1 && !isFlipping}
      />

      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Use arrow keys or navigation buttons to flip through the menu</p>
      </div>
    </div>
  );
};