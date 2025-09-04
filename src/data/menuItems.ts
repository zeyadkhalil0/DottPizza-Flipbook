import menuImg from "@/assets/Menu.png";
import pizzaImg from "@/assets/Pizza.png";
import pastaImg from "@/assets/Pasta.png";
import appetizersImg from "@/assets/Appetizers.png";


export const menuData = {
  appetizers: [
    {
      id: 1,
      name: "Lobster Bisque",
      description:
        "Rich and creamy soup with fresh lobster, finished with a touch of cognac and chive oil",
      price: 18,
      category: "appetizer",
      image: menuImg,
      featured: true,
    },
    {
      id: 2,
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, house-made croutons, parmesan cheese with our signature dressing",
      price: 14,
      category: "appetizer",
      image: pizzaImg,
    },
  ],
  mains: [
    {
      id: 3,
      name: "Beef Wellington",
      description:
        "Tender beef fillet wrapped in puff pastry with mushroom duxelles, served with red wine reduction",
      price: 45,
      category: "main",
      image: pastaImg,
      featured: true,
    },
    {
      id: 4,
      name: "Grilled Atlantic Salmon",
      description:
        "Fresh salmon fillet with herb crust, roasted vegetables, and lemon butter sauce",
      price: 32,
      category: "main",
      image: appetizersImg,
    },
  ],
};
