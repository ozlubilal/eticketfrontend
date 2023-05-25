import { Byte } from "@angular/compiler/src/util";

export interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:number,
    passwordHash:Byte[],
    passwordSalt:Byte[],
    status:string,
}