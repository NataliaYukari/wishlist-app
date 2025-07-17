export interface WishlistItem {
    id: string,
    itemName: string;
    brand?: string;
    description?: string;
    price?: number;
    link?: string;
    status: string;
    category: string;
    priority: string;
}