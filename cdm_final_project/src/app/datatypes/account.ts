import { ICoordinate } from "./Coordinates";

export interface IAccount{
    acc_email?:string | null;
    acc_revenue?:number | null;
    location?:ICoordinate | null;
    address?: string | null;
    aname?:string |null;
    estYear?:string | null;
    description?:string | null;
    customer_email?:string | null;
}