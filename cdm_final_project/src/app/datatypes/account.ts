import { ICoordinate } from "./Coordinates";

export interface IAccount{
    acc_email?:string | null;
    acc_revenue?:number | null;
    location?:ICoordinate | null;
    aname?:string |null;
    estYear?:string | null;
    PmId?:number | null;
}