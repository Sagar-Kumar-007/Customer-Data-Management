export interface IPaginatedResults<T>{
    totalCount:number,
    pageNumber:number,
    recordNumber:number,
    items: T[]
}