// TypeScript type for Manufacturer resource
export type Manufacturer = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  location: string;
};

// Test data for manufacturers
const testManufacturers: Manufacturer[] = [
  {
    id: '1',
    name: 'ABC Manufacturing Co.',
    contact: 'contact@abc.com',
    phone: '(555) 123-4567',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'XYZ Industries',
    contact: 'info@xyz.com',
    phone: '(555) 987-6543',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    name: 'Global Supply Inc.',
    contact: 'sales@globalsupply.com',
    phone: '(555) 456-7890',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    name: 'Premium Products LLC',
    contact: 'support@premium.com',
    phone: '(555) 321-0987',
    location: 'Houston, TX'
  }
];

// In-memory storage for manufacturers (simulating external data)
let manufacturers: Manufacturer[] = [...testManufacturers];

/**
 * Repository for managing manufacturer data
 * Provides CRUD operations for manufacturer resources
 */
export const manufacturerRepository = {
  /**
   * Get all manufacturers
   * @returns Array of all manufacturers
   */
  getAll(): Manufacturer[] {
    return [...manufacturers];
  },

  /**
   * Get a manufacturer by ID
   * @param id - The manufacturer ID
   * @returns The manufacturer if found, undefined otherwise
   */
  getById(id: string): Manufacturer | undefined {
    return manufacturers.find(manufacturer => manufacturer.id === id);
  },

  /**
   * Create a new manufacturer
   * @param newManufacturer - The manufacturer data (without ID)
   * @returns The created manufacturer with generated ID
   */
  create(newManufacturer: Omit<Manufacturer, 'id'>): Manufacturer {
    const id = (Math.max(...manufacturers.map(m => parseInt(m.id)), 0) + 1).toString();
    const manufacturer: Manufacturer = { id, ...newManufacturer };
    manufacturers.push(manufacturer);
    return manufacturer;
  },

  /**
   * Update an existing manufacturer
   * @param id - The manufacturer ID
   * @param updatedData - The updated manufacturer data
   * @returns True if updated successfully, false otherwise
   */
  update(id: string, updatedData: Partial<Omit<Manufacturer, 'id'>>): boolean {
    const index = manufacturers.findIndex(m => m.id === id);
    if (index !== -1) {
      manufacturers[index] = { ...manufacturers[index], ...updatedData };
      return true;
    }
    return false;
  },

  /**
   * Delete a manufacturer
   * @param id - The manufacturer ID
   * @returns True if deleted successfully, false otherwise
   */
  delete(id: string): boolean {
    const initialLength = manufacturers.length;
    manufacturers = manufacturers.filter(m => m.id !== id);
    return manufacturers.length < initialLength;
  },

  /**
   * Reset manufacturers to test data (useful for testing)
   */
  reset(): void {
    manufacturers = [...testManufacturers];
  }
};
