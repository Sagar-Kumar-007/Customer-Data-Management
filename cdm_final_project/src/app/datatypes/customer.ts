import { IAccount } from "./account";

export interface ICustomer{
    cname?:string |null;
    email?:string |null;
    logo?:string | null;
    sector?:string | null;
    phoneNo?:string | null;
    headquarter?:string | null;
    countryCode?:string | null;
    description?:string | null;
    website?:string | null;
    accounts?:IAccount[] |null;
    id?:string |null;
}