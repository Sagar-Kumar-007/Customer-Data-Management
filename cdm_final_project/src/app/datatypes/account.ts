import { ICoordinate } from "./Coordinates";

export interface IAccount{
    AccountEmail?:string | null;
    AccountRevenue?:number | null;
    Location?:ICoordinate | null;
    Address?: string | null;
    AccountName?:string |null;
    EstablishmentYear?:string | null;
}