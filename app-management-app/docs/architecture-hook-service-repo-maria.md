# Inventory Stock Architecture Documentation

## Overview
This project uses layered architecture using:
- Repository layer (data access)
- Service layer (business logic)
- Custom hook (handling form UI errors and handling state)
- component layer (presentation logic)

addInventoryItem (form component) -> InventorySearch (main Component) -> 
useFormInput (hook) -> InventoryService (service layer) -> InventoryRepo (Repository layer) -> Data

## Repository: InventoryListRepo
- **What it does:** This handles data access to the inventory list component and form.
- **Logic:** This contains CRUD functions like fetch all, fetch by id and create on the inventory data.
- **Usage:** Called by the InventoryService for data retrieval and creation.

## Service: InventoryService
- **What is does:** This applies business logic to the add inventory form to validate inputs.
- **Logic:** addStockInventory creates a new item to be added into the inventory list. The service validates
the inputs for proper data collection.
- **Usage:** To separate UI logic and business logic and is called by the components in the form and then the parent to update state.

## Custom Hook: useFormInput
- **What it does:** This hood handles the UI errors and call a form service method, this way it can be reused in other forms
depending on the service being called the behavior can change. 
- **Logic:** It takes an initialState validate the form by calling the service method used in this component checks if there are error messages
and returns the inputValue, setValue, onchange, error and validateForm.
- **Usage:** The usage of this hook is currently being used in the add inventory item form component but it can be used by any other forms as 
it was make very basic and call a service method so it can be reused in the future.

## Component: InventorySearch and addInventoryItem
- **What it does:** InventorySearch Component is the List of all inventory in a table with a search bar to make looking for items easier.
The addInventoryItem is a form component that allows a user to add an item to the list of inventory.
- **Logic:** This is presentation logic so InventorySearch will only have the HTML and setting state for the search filter and adding the item to the list to update state. The addInventoryItem component will have form submit logic and the HTML for the form.
- **Usage:** This is used to show the user the entire list of data and allow them to add a item to that list as needed.