import type { InventoryStock } from "../../types/inventoryStock";
import { useFormInput } from "../../hooks/useFormInput";
import "./addInventoryItem.css"
import {validateName, validateDescription, 
        validateLocation, validateManufacturer, 
        validateCategory, validateQuantity, validatePrice} from "../../services/stockService";

export function AddInventoryItemForm({
    addInventoryStock,
}: {
    stockData: InventoryStock[],
    addInventoryStock: (item: Omit<InventoryStock, "id">) => Promise<string | InventoryStock | null>;
}) {
    const name = useFormInput(validateName);
    const description = useFormInput(validateDescription);
    const location = useFormInput(validateLocation);
    const manufacturer = useFormInput(validateManufacturer);
    const category = useFormInput(validateCategory);
    const quantity = useFormInput(validateQuantity);
    const price = useFormInput(validatePrice);

    const formSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const validateName = name.validateForm();
        const validateDescription = description.validateForm();
        const validateLocation = location.validateForm();
        const validateManufacturer = manufacturer.validateForm();
        const validateCategory = category.validateForm();
        const validateQuantity = quantity.validateForm();
        const validatePrice = price.validateForm();
        
        name.setError(validateName.error ?? null);
        description.setError(validateDescription.error ?? null);
        location.setError(validateLocation.error ?? null);
        manufacturer.setError(validateLocation.error ?? null);
        category.setError(validateCategory.error ?? null);
        quantity.setError(validateQuantity.error ?? null);
        price.setError(validatePrice.error ?? null);

        if(!validateName.isValid || !validateDescription.isValid || 
            !validateLocation.isValid || !validateManufacturer.isValid || 
            !validateCategory.isValid || !validateQuantity.isValid || 
            !validatePrice.isValid) {
                return;
        }

        await addInventoryStock({ 
                name: name.inputValue as string, 
                description: description.inputValue as string, 
                location: location.inputValue as string, 
                manufacturer: manufacturer.inputValue as string, 
                category: category.inputValue as string, 
                quantity: Number(quantity.inputValue), 
                price: Number(price.inputValue)
        });


        name.setValue("");
        description.setValue("");
        location.setValue("");
        manufacturer.setValue("");
        category.setValue("");
        quantity.setValue(0);
        price.setValue(0);
    };

    return(
        <div className="inventory-form">
            <h3 className="title">ADD INVENTORY ITEMS</h3>
            <form onSubmit={formSubmit}>
                <div className="item-data">
                    <label htmlFor="item-name">Item Name</label>
                    <input
                        id="item-name"
                        type="text"
                        value={name.inputValue}
                        onChange={name.onChange}
                    />
                    {name.error && <p className="error">{name.error}</p>}
                </div>

                 <div className="item-data">
                    <label htmlFor="item-category">Category</label>
                    <input
                        id="item-category"
                        type="text"
                        value={category.inputValue}
                        onChange={category.onChange}
                    />
                    {category.error && <p className="error">{category.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-manufacturer">Manufacturer</label>
                    <input
                        id="item-manufacturer"
                        type="text"
                        value={manufacturer.inputValue}
                        onChange={manufacturer.onChange}
                    />
                    {manufacturer.error && <p className="error">{manufacturer.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-location">Location</label>
                    <input
                        id="item-location"
                        type="text"
                        value={location.inputValue}
                        onChange={location.onChange}
                    />
                    {location.error && <p className="error">{location.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-quantity">Quantity</label>
                    <input
                        id="item-quantity"
                        type="number"
                        value={quantity.inputValue}
                        onChange={quantity.onChange}
                    />
                    {quantity.error && <p className="error">{quantity.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-price">Price</label>
                    <input
                        id="item-price"
                        type="number"
                        value={price.inputValue}
                        onChange={price.onChange}
                    />
                    {price.error && <p className="error">{price.error}</p>}
                </div>

                    <div className="item-data">
                    <label htmlFor="item-description">Description</label>
                    <textarea
                        id="item-description"
                        value={description.inputValue}
                        onChange={description.onChange}
                    />
                    {description.error && <p className="error">{description.error}</p>}
                </div>

                <div className="button-cell">
                <input
                    type="submit"
                    className="submitButton"
                    value="ADD"
                />
                </div>
            </form>
        </div>
    )
}