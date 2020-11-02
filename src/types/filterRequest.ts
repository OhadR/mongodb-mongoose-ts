import { Polygon } from "./mongodb/polygon";

export interface FilterRequest {
    fromDate?: Date;
    toDate?: Date;
    region?: Polygon;
    country?: string;
    userId?: string;
    supplierName?: string;
    published?: boolean;
}
