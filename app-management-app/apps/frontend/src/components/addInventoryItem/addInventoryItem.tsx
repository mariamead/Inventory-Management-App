import type { FrontendInventoryStock as InventoryStock } from "@shared/types/frontend-InventoryStock";
import { useFormInput } from "../../hooks/useFormInput";
import "./addInventoryItem.css"
import {validateName, validateDescription, 
        validateLocation, validateManufacturer, 
        validateCategory, validateQuantity, validatePrice,
        validateLowStockThreshold} from "../../services/stockService";
import { Category, Manufacturer } from "@shared/types/frontend-InventoryStock";
import { useState } from "react";

export function AddInventoryItemForm({
    addInventoryStock,
}: {
    stockData: InventoryStock[],
    addInventoryStock: (item: Omit<InventoryStock, "id">) => Promise<string | InventoryStock | null>;
}) {
    const [ selectCategory, setSelectedCategory ] = useState("");
    const [ selectManufacturer, setSelectedManufacturer ] = useState("");

    const name = useFormInput(validateName);
    const description = useFormInput(validateDescription);
    const location = useFormInput(validateLocation);
    const manufacturer = useFormInput(validateManufacturer);
    const category = useFormInput(validateCategory);
    const quantity = useFormInput(validateQuantity);
    const price = useFormInput(validatePrice);
    const lowStockThreshold= useFormInput(validateLowStockThreshold);


    const formSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const validateName = name.validateForm();
        const validateDescription = description.validateForm();
        const validateLocation = location.validateForm();
        const validateManufacturer = manufacturer.validateForm();
        const validateCategory = category.validateForm();
        const validateQuantity = quantity.validateForm();
        const validatePrice = price.validateForm();
        const validateLowStockThreshold = lowStockThreshold.validateForm();

        name.setError(validateName.error ?? null);
        description.setError(validateDescription.error ?? null);
        location.setError(validateLocation.error ?? null);
        manufacturer.setError(validateLocation.error ?? null);
        category.setError(validateCategory.error ?? null);
        quantity.setError(validateQuantity.error ?? null);
        price.setError(validatePrice.error ?? null);
        lowStockThreshold.setError(validateLowStockThreshold.error ?? null);

        if(!validateName.isValid || !validateDescription.isValid || 
            !validateLocation.isValid || !validateManufacturer.isValid || 
            !validateCategory.isValid || !validateQuantity.isValid || 
            !validatePrice.isValid || !validateLowStockThreshold.isValid) {

                return;
        }

        await addInventoryStock({ 
                name: name.inputValue as string, 
                description: description.inputValue as string, 
                location: location.inputValue as string, 
                manufacturer: manufacturer.inputValue as Manufacturer, 
                category: category.inputValue as Category, 
                quantity: Number(quantity.inputValue), 
                price: Number(price.inputValue),
                lowStockThreshold: Number(lowStockThreshold.inputValue)
         
        });


        name.setValue("");
        description.setValue("");
        location.setValue("");
        manufacturer.setValue("");
        category.setValue("");
        quantity.setValue(0);
        price.setValue(0);
        lowStockThreshold.setValue(0);
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
                    <select
                        id="item-category"
                        value={selectCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            category.onChange(e);
                        }}
                    >
                        <option value="">--Select a Category--</option>
                        <option value={Category.FOOD}>FOOD</option>
                        <option value={Category.ELECTRONICS}>ELECTRONICS</option>
                        <option value={Category.HEALTH}>HEALTH</option>
                        <option value={Category.BEAUTY}>BEAUTY</option>
                    </select>
                    {category.error && <p className="error">{category.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-manufacturer">Manufacturer</label>
                    <select
                        id="item-manufacturer"
                        value={selectManufacturer}
                        onChange={(e) => {
                            setSelectedManufacturer(e.target.value)
                            manufacturer.onChange(e);
                        }}
                    >
                        <option value="">--Select a Manufacturer--</option>
                        <option value={Manufacturer.LG}>LG</option>
                        <option value={Manufacturer.SAMSUNG}>SAMSUNG</option>
                        <option value={Manufacturer.LOGITEC}>LOGITEC</option>
                        <option value={Manufacturer.HP}>HP</option>
                        <option value={Manufacturer.SONY}>SONY</option>
                        <option value={Manufacturer.PANASONIC}>PANASONIC</option>
                        <option value={Manufacturer.BAYER}>BAYER</option>
                        <option value={Manufacturer.JOHNSON_AND_JOHNSON}>JOHNSON & JOHNSON</option>
                        <option value={Manufacturer.ORGANIKA}>ORGANIKA</option>
                        <option value={Manufacturer.PROCTER_AND_GAMBLE}>PROCTER & GAMBLE</option>
                        <option value={Manufacturer.LOREAL}>L'OREAL</option>
                        <option value={Manufacturer.KRAFT}>KRAFT</option>
                        <option value={Manufacturer.MAPLE_LEAF}>MAPLE LEAF</option>
                        <option value={Manufacturer.MCCAIN}>MCCAIN</option>
                        <option value={Manufacturer.PC}>PC</option>
                        <option value={Manufacturer.DOLE}>DOLE</option>
                        <option value={Manufacturer.DEL_MONTE}>DEL MONTE</option>
                    </select>
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
                        min={0}
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
                        min={0}
                        step={0.01}
                        value={price.inputValue}
                        onChange={price.onChange}
                    />
                    {price.error && <p className="error">{price.error}</p>}
                </div>

                <div className="item-data">
                    <label htmlFor="item-lowStockThreshold">Low Stock Threshold</label>
                    <input
                        id="item-lowStockThreshold"
                        name="lowStockThreshold"
                        type="number"
                        min={0}
                        value={lowStockThreshold.inputValue}
                        onChange={lowStockThreshold.onChange}
                    />
                    {lowStockThreshold.error && <p className="error">{lowStockThreshold.error}</p>}
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