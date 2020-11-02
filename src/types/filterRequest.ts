import { Polygon } from "./mongodb/polygon";

export interface FilterRequest {
    fromDate?: Date;
    toDate?: Date;
    region?: Polygon;
    country?: string;
    supplierName?: string;
    fromAge: number,
    toAge: number,
}

export interface SortFieldRequest {
    [key: string]: Order;
}

export interface SortRequest {
    sorts: SortFieldRequest[];
}

export enum Order {
    ascending,
    descending,
}