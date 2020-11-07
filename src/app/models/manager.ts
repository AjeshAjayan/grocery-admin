import { Pincode } from './pincode';

export interface Manager {
    id?: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    address: string;
    district: string;
    country: string;
    postal: string;
    state: string;
    contctno1: string;
    contctno2: string;
    isDeleted: boolean;
    createdDate: number;
    uid?: string;
    assignedPincodes: Pincode[];
}