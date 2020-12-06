export interface Plan {
    id?: string;
    name: string;
    no_of_images: number;
    no_of_product: number;
    plan_total_duration_in_days: number | null;
    price: number;
    product_expiry_in_days: number;
    reach_radius_in_km: number;
    description: string;
}