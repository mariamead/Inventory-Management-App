import type React from "react";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import "./inventorySearch.css";
import { AddInventoryItemForm } from "../addInventoryItem/addInventoryItem";
import { useEffect, useState } from "react";

import type { InventoryStock } from "../../types/inventoryStock";
import { addInventoryStock } from "../../services/stockService";
import { fetchAllInventoryStock } from "../../apis/inventoryListRepo";
import { useAuth } from "@clerk/clerk-react";

// Function to filter inventory by text in a search field
function InventorySearch() {
    const [stockList, setInventoryStock] = useState<InventoryStock[]>([]);
    //Setting state to prepare for input to change state used a custom hook called useSearch filter
    const { search, setSearch, filteredText } = useSearchFilter(stockList, "name");
    const [showForm, setShowForm] = useState(false);
    const { isSignedIn, isLoaded, getToken } = useAuth();
    const isPrivateView = isSignedIn

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                if(!isLoaded) return;
                const token = await getToken();
                const data = await fetchAllInventoryStock(token); 
                setInventoryStock(data);
            } catch (error) {
                console.error("Error fetching inventory stock data:", error);
            }
        };
        fetchStockData(); 
    }, [isLoaded, getToken]);

    if (!isLoaded) return <div> Loading....</div>;

    // Adding inventory item to bottom of list with last number + 1 for Id
    // will need to be adjusted when database introduced
    const addStockItem = async(
        item: Omit<InventoryStock, "id">
    ): Promise<string | InventoryStock> => {
        try {
            if( !isSignedIn) return "Please Sign in...";

            const token = await getToken();
            if(!token) throw new Error("User is not authenticated.");

            const result = await addInventoryStock(item, token);
            if (typeof result === "string") {
               
                return result; 
            }
            
            setInventoryStock(prev => {
                if (prev.some(i => i.id === result.id)) return prev;
                return [...prev, result]; 
            }); 
            return result;
        } catch (error: unknown) {
            if(error instanceof Error) {
                return error.message;
            }
            return "An unexpected error occurred.";
        }
    };


    return(
        // Inventory section to show a table of inventory items
        <section className="inventory-search">
            <h2>Current Inventory</h2>
            <label className="searchLabel">
                Inventory Search:
                <input
                    type="text"
                    value={search}
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(text.target.value)}
                />    
            </label>
            
            {/* A button to toggle the form or hide it when not needed Only if the user is signed in*/}
            <button
                type="button"
                className="toggleFormButton"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Hide Form" : "Add New Item"}
            </button>
            
            {isSignedIn ? (
                <>
                    {showForm && (
                        <AddInventoryItemForm
                            stockData={stockList} 
                            addInventoryStock={addStockItem} 
                        />
                    )}
                </>
            ): (
                <div className="login-to-add">
                    <p>Please Sign In to Add Inventory</p>
                </div>
            )}

            <table className="inventoryTable">
                <thead>
                    <tr className="header-title">
                        {isPrivateView && <th>Id</th>}
                        <th>Item Name</th>
                        <th>Description</th>
                        {isPrivateView && <th>Location</th>}
                        <th>Manufacturer</th>
                        <th>Category</th>
                        {isPrivateView && <th>Quantity</th>}
                        {isPrivateView && <th>Price</th>}
                    </tr>
                </thead>
                    {/*Data for table will be populated here.*/}
                <tbody className="inventoryTableBody">
                    {filteredText.map((item) => (
                        <tr key={item.id ?? `${item.name}-${item.manufacturer}-${item.category}`}>
                            {isPrivateView && <td>{item.id}</td>}
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            {isPrivateView && <td>{item.location}</td>}
                            <td>{item.manufacturer}</td>
                            <td>{item.category}</td>
                            {isPrivateView && <td>{Number(item.quantity)}</td>}
                            {isPrivateView && <td>{Number(item.price?.toFixed(2))}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default InventorySearch;

