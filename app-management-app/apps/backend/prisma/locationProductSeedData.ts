import { Category, Manufacturer } from "@prisma/client"

export const locationSeedData = [
  {
    name: "Warehouse A",
    address: "123 Industrial Rd",
    city: "Winnipeg",
    province: "Manitoba",
  },
  {
    name: "Warehouse B",
    address: "456 Commerce St",
    city: "Winnipeg",
    province: "Manitoba",
  },
  {
    name: "Warehouse C",
    address: "789 Logistics Ave",
    city: "Winnipeg",
    province: "Manitoba",
  },
  {
    name: "Warehouse D",
    address: "101 Supply Chain Blvd",
    city: "Winnipeg", 
    province: "Manitoba",
  },
];


export const productSeedData = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with USB receiver",
    category: Category.ELECTRONICS, 
    manufacturer: Manufacturer.LOGITEC, 
    price: 24.99,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard",
    category: Category.ELECTRONICS,
    manufacturer: Manufacturer.LOGITEC,
    price: 79.99,
  },
  {
    name: "Surge Protector",
    description: "8-outlet power surge protector",
    manufacturer: Manufacturer.SAMSUNG,
    category: Category.ELECTRONICS,
    price: 19.99,
  },
  {
    name: "Vitamin C 1000mg",
    description: "High-potency immune support supplement",
    category: Category.HEALTH,
    manufacturer: Manufacturer.ORGANIKA,
    price: 15.49,
  },
  {
    name: "LED Smart TV 55-inch",
    description: "4K Ultra HD smart television with HDR",
    category: Category.ELECTRONICS,
    manufacturer: Manufacturer.SONY,
    price: 899.99,
  },
  {
    name: "Anti-Aging Night Cream",
    description: "Hydrating cream with retinol and hyaluronic acid",
    category: Category.BEAUTY,
    manufacturer: Manufacturer.LOREAL,
    price: 49.99 
  },
  {
    name: "Frozen French Fries",
    description: "Golden extra-crispy crinkle-cut fries",
    category: Category.FOOD,
    manufacturer: Manufacturer.MCCAIN,
    price: 5.99,
  },
  {
    name: "Multivitamin Gummies",
    description: "Complete daily multivitamin for adults",
    category: Category.HEALTH,
    manufacturer: Manufacturer.BAYER,
    price: 12.99,
  },
  {
    name: "Organic Peanut Butter",
    description: "Creamy all-natural roasted peanut butter",
    category: Category.FOOD,
    manufacturer: Manufacturer.KRAFT,
    price: 7.49,
  }
]
