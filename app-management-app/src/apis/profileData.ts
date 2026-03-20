export type Profile = {
  id?: string;
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
  },
  {
    id: 'user-5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 456-7890',
    address: '654 Maple Drive, Calgary, AB T2P 1J9'
  },
  {
    id: 'user-6',
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    phone: '(555) 567-8901',
    address: '987 Birch Lane, Ottawa, ON K1A 0A9'
  },
  {
    id: 'user-7',
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '(555) 678-9012',
    address: '147 Cedar Court, Halifax, NS B3H 4R2'
  },
  {
    id: 'user-8',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '(555) 789-0123',
    address: '258 Spruce Street, Edmonton, AB T5J 2B6'
  },
  {
    id: 'user-9',
    name: 'James Martinez',
    email: 'james.martinez@example.com',
    phone: '(555) 890-1234',
    address: '369 Willow Way, Victoria, BC V8W 2Y2'
  },
  {
    id: 'user-10',
    name: 'Olivia Taylor',
    email: 'olivia.taylor@example.com',
    phone: '(555) 901-2345',
    address: '741 Ash Boulevard, Saskatoon, SK S7N 0W8'
  }
];
