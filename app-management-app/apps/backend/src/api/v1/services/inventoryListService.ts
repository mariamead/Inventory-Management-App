import type { FrontendInventoryStock }from "@shared/types/frontend-InventoryStock";
import { prisma } from "../../../../prisma/prismaClient";
import { Category, Manufacturer } from "@prisma/client";


/**
 * A function to return all items in stockData
 * @returns -All items in stock data
 */
export const getAllInventoryStock = async(): Promise<FrontendInventoryStock[]> => {
    // nested read
    try{
        const allStockData = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                manufacturer: true,
                category: true,
                price: true,
                inventory:  {
                    select: {
                        quantity: true,
                        threshold: true,
                        location: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        //Formatting the data to match the oject for backend and frontend as incoming data will be nested.
        const allData: FrontendInventoryStock[] = allStockData.flatMap(product => 
            product.inventory.map((inventory: { quantity: number; threshold: number; location:{name: string}
            }) => ({
                id: product.id.toString(),
                name: product.name,
                description: product.description,
                manufacturer: product.manufacturer,
                category: product.category,
                price: product.price.toNumber(), //converting decimal to number as frontend is a number.
                quantity: inventory.quantity,
                lowStockThreshold: inventory.threshold,
                location: inventory.location.name
            }))
        )

        return allData;
    } catch (error: unknown) {
        console.error("Error fetching inventory stock:", error);
        throw new Error("Failed to fetch inventory stock data.");
    }

};

/**
 * - Function to create a new Inventory item for stock data.
 * @param itemData - The data required to created a new inventory item
 * @returns - the new item created
 */
export const createStockItem = async (
    itemData: FrontendInventoryStock
): Promise<FrontendInventoryStock> => {
    try {
        //Convert manufacturer input to all caps to match Enum
        const manufacturer = itemData.manufacturer.toUpperCase().replace(/ & /g, "_") as Manufacturer;

        const validateManufacturers = Object.values(Manufacturer);
        if(!validateManufacturers.includes(manufacturer)) {
            throw new Error(
                `Invalid manufacturer: ${itemData.manufacturer}. Expected one of 
                ${validateManufacturers.join(', ')}`);
        }

        //Convert category to all caps to match Enum.
        const category = itemData.category.toUpperCase() as Category;
        const validateCategories = Object.values(Category);
        if(!validateCategories.includes(category)) {
            throw new Error(
                `Invalid category: ${itemData.category}. Expected one of 
                ${validateCategories.join(', ')}.`);
        }

        //Create an entry for Product table
        const product = await prisma.product.upsert({
            where: { 
                name_manufacturer: { 
                    name: itemData.name, 
                    manufacturer: manufacturer
                } 
            },
            update: {},
            create: {
                name: itemData.name,
                description: itemData.description,
                category: category,
                manufacturer: manufacturer,
                price: itemData.price,
            },
        });

        // check it the location exists
        const location = await prisma.location.findFirst({
            where: { name: itemData.location }
        });

        if (!location) {
            throw new Error(`Location '${itemData.location}' not found`);
        }

        // Create an entry for Inventory table
        await prisma.inventory.create({
            data: {
                product: { connect: { id: product.id } },
                location: { connect: {id: location.id } },
                quantity: itemData.quantity,
                threshold: itemData.lowStockThreshold,
            },
        });

        // returns 
        return {
            name: itemData.name,
            description: itemData.description,
            manufacturer: itemData.manufacturer,
            category: itemData.category,
            price: itemData.price,
            quantity: itemData.quantity,
            lowStockThreshold: itemData.lowStockThreshold,
            location: itemData.location
        };
            
    } catch (error: unknown) {
        console.error("Error creating stock item:", error);
        if(error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Internal server error while creating stock item.");
    }
};