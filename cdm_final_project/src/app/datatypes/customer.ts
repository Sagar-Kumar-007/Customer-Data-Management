import { IAccount } from "./account";

export interface ICustomer{
    cname:string;
    email:string;
    logo:string;
    sector:string;
    phoneNo:string;
    headquarter:string;
    countryCode:string;
    description:string;
    website:string;
    accounts:IAccount[];
}