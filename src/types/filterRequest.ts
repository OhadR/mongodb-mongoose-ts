import { Polygon } from "./mongodb/polygon";

export interface GetSessionsRequest {
    paging: PagingRequest;
    filter: FilterRequest;
    sort: SortRequest;
}

//-------------------------------------------------------------------------//

export interface FilterRequest {
    fromDate?: Date;
    toDate?: Date;
    region?: Polygon;
    country?: string;
    supplierName?: string;
    fromAge: number,
    toAge: number,
}

//-------------------------------------------------------------------------//

export interface SortRequest {
    [key: string]: Order;
}

export enum Order {
    ascending,
    descending,
}

//-------------------------------------------------------------------------//

export interface PagingRequest {
    pageNumber: number;
    pageSize: number;
}
