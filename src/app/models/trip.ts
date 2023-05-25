export interface Trip{
    id:number | undefined,
    routeId:number,
    busTypeId:number,
    date:Date,    
    hour:string,
    price:number,
    stateId:number,
}