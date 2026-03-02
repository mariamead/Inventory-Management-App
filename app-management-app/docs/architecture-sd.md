# H1 Architecture Documentation

## H2 useLowStock (Custom Hook)

### H3 What does this hook do?

This hook acts as link between UI components and the repository layer.

1. Fetches low stock items when initialized.
2. Provides functions to update an items quantity and delete an item.
3. Refreshes data after updating or deleting an item.
4. Maintains items, loading, and error state.

### H3 How was the logic chosen and how does it separate concerns?

Hooks manage reusable state logic, coordinate effects and synchronization and are part of the presentation layer.

useLowStock checks all the boxes of what a hook should be used for it:

1. Manages state
2. Uses useEffect to fetch items
3. Calls repository functions
4. Handles errors and loading

This hook determines when data should be fetched, when errors should appear, and when the UI should show that it is loading.

### H3 Where is this implemented and how?

useLowStock is implemented within the lowStockAlert component.

When a component initializes the hook:

1. The useEffect fetches items
2. The items that come back are then sent to be displayed
3. The updateQuantity and removeItem methods are triggered by user interaction.

## H2 LowStockRepo

### H3 What does this repository do?

lowStockRepo handles all logic related to accessing low stock items.

1. Stores inventory data internally.
2. Filters low stock items
3. Retrieves items by ID
4. Updates items
5. Deletes items

### H3 How was the logic chosen and how does it separate concern?

Repository logic is supposed to handle how the app sends and receives requests/data.

The lowStockRepo includes:

1. Data filtering
2. Crud operations
3. Error handling when items are not found

Using what is above ensures the repository encapsulates how data is accessed or modified, in case of changing the data's source(Like moving to and api) only
this layer would need to be changed ensuring hooks and components remain the way they are.

### H3 Where is this repo implemented and how?

The repository is accessed from the useLowStock hook which calls:

1. fetchLowStockItems when loading data
2. updateLowStockItem when updating an item
3. deleteLowStockItem when removing items

The presentation layer never directly access the data which keeps responsibilities defined.

## H2 inventoryService

### H3 What does this service do?

inventoryService contains business logic for inventory items it:

1. Validates inventory data
2. Provides reusable low stock filtering
3. Defines rules ensuring names are above 3 characters, quantity is above 0, price is above 0, and the low stock threshold for an item is above 0

### H3 How was the logic chosen, and how does it separate concern?

The service layer is supposed to implement business rules inside the application. This service implements:

1. Validation that may be able to be reused across multiple components.
2. Keeps components focused on presentation.
3. Prevents duplication of validation logic/ has a single source of validation rules.

This separation matters because:

1. Easier to debug when responsibilities are isolated in a single location.
2. UI components aren't cluttered and are more focused on rendering.
3. Business rules stay consistent across the app.

### H3 Where is this service layer implemented and how?

InventoryService is used in inventory form components when adding or editing items.

When a user submits a form:

1. The component collects the input values.
2. Component sends the data to validateItem in the service layer.
3. The service runs against the rules given.
4. The service returns isvalid and errors[].
5. The component checks the result and decides whether to proceed or display the errors.
