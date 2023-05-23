import { ICoordinate } from "./Coordinates";
import { IAccount } from "./account";

export interface ICustomer{
    CustomerEmail?:string | null;
    CustomerName?:string | null;
    Logo?:string | null;
    Sector?:string | null;
    PhoneNumber?:string | null;
    Headquarters?:ICoordinate | null;
    CountryCode?:string | null;
    Description?:string | null;
    Website?:string | null;
    Accounts?:IAccount[] | null;
}