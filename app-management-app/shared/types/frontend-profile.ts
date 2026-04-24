export type FrontendProfile = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    locationId?: number | null;
    locationName?: string | null;
}