import { IAccount } from "./account";

export interface ICustomer{
    email?:string | null;
    cname?:string | null;
    logo?:string | null;
    sector?:string | null;
    phoneNo?:string | null;
    headquaters?:string | null;
    countryCode?:string | null;
    description?:string | null;
    website?:string | null;
    accounts?:IAccount[] | null;
}