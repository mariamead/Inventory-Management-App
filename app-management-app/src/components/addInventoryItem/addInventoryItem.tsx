import { useState } from "react";
import type { InventoryItem } from "../../Inventory/inventoryData";
import "./addInventoryItem.css"
import { inventoryService } from "../../services/inventoryService";

export function AddInventoryItemForm({
    inventory,
    setInventoryList
}: {
    inventory: InventoryItem[];
    setInventoryList: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}) {
    const [name, setName] = useState<string>("");
    const [ category, setCategory ] = useState<string>("");
    const [ quantity, setQuantity ] = useState<number>(0);
    const [ price, setPrice ] = useState<number>(0);
    const [ lowStockThreshold, setLowThreshold] = useState<number>(0);
    const [ error, setError ] = useState<string[]>([]);

    const formSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError([]);

        const newItem = { 
            name, 
            category, 
            quantity, 
            price, 
            lowStockThreshold 
        };

        const validation= inventoryService.validateItem(newItem);

        if (validation.isValid) {
            setError(validation.errors);
            return;
        }

        const updatedInventory = inventoryService.addItem(inventory, newItem);

        setInventoryList(updatedInventory);

        setName("");
        setCategory("");
        setQuantity(0);
        setPrice(0);
        setLowThreshold(0);
    };

    return(
        <div className="inventory-form">
            <h3 className="title">Add Inventory Items</h3>
            <form onSubmit={formSubmit}>
                <div className="item-data">
                    <label htmlFor="item-name">Item Name</label>
                    <input
                        id="item-name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div className="item-data">
                    <label htmlFor="item-category">Category</label>
                    <input
                        id="item-category"
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </div>

                <div className="item-data">
                    <label htmlFor="item-quantity">Quantity</label>
                    <input
                        id="item-quantity"
                        type="number"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.valueAsNumber)}
                    />
                </div>

                <div className="item-data">
                    <label htmlFor="item-price">Price</label>
                    <input
                        id="item-price"
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.valueAsNumber)}
                    />
                </div>

                <div className="item-data">
                    <label htmlFor="item-lowThreshold">Low Threshold</label>
                    <input
                        id="item-lowThreshold"
                        type="number"
                        value={lowStockThreshold}
                        onChange={(event) => setLowThreshold(event.target.valueAsNumber)}
                    />
                </div>

                <div>
                    {error && <p>{error}</p>}
                </div>
                <input
                    type="submit"
                    className="submitButton"
                    value="Add"
                    disabled={!name || !category || !quantity || !price || !lowStockThreshold}
                />
            </form>
        </div>
    )
}