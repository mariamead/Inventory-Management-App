import type React from "react";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import "./inventorySearch.css";

import { AddInventoryItemForm } from "../addInventoryItem/addInventoryItem";
import type { InventoryItem } from "../../Inventory/inventoryData";

// Function to filter inventory by text in a search field
function InventorySearch({
    inventory,
    setInventoryList
}: {
    inventory: InventoryItem[];
    setInventoryList: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}) {

    //Setting state to prepare for input to change state used a custom hook called useSearch filter
    const { search, setSearch, filteredText } = useSearchFilter(inventory, "name");

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
            <AddInventoryItemForm 
                inventory={inventory}
                setInventoryList={setInventoryList}
            />

            <table className="inventoryTable">
                <thead>
                    <tr className="header-title">
                        <th>Id</th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                    {/*Data for table will be populated here.*/}
                <tbody className="inventoryTableBody">
                    {filteredText.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default InventorySearch;

