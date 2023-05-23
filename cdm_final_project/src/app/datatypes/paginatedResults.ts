export interface IPaginatedResults<T>{
    TotalCount:number,
    PageNumber:number,
    RecordNumber:number,
    Items: T[]
}