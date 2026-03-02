export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export const testProfiles: Profile[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Winnipeg, MB R3C 1A1'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    address: '456 Oak Avenue, Toronto, ON M5H 2N2'
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '(555) 234-5678',
    address: '789 Pine Road, Montreal, QC H2X 3Y4'
  },
  {
    id: 'user-4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    phone: '(555) 345-6789',
    address: '321 Elm Street, Vancouver, BC V6B 1A1'
  }
];
